import React, { useState, useEffect, useRef } from 'react';
import { storage, databases } from '../appwriteConfig';
import imageCompression from 'browser-image-compression';

const ImgView = ({ data1, documentId }) => {
  const [imgUrls, setImgUrls] = useState([null, null, null]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fileName, setFileName] = useState(''); // State for storing file name

  const fileInputRefs = [useRef(null), useRef(null), useRef(null)];
  const imageFields = ['i1', 'i2', 'i3'];

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const newImgUrls = await Promise.all(
          imageFields.map(async (field) => {
            const imageId = data1[field];
            if (!imageId) return null;

            const urlObject = await storage.getFileView('66389165001ab8078701', imageId);
            return urlObject.href;
          })
        );
        setImgUrls(newImgUrls);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [data1]);

  const handleImageUpload = async (event, index) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);

    try {
      const options = {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 800,
      };
      const compressedFile = await imageCompression(file, options);

      // Ask the user for a custom file name
      const customFileName = prompt('Please enter a file name', file.name);
      if (!customFileName) {
        setError('File name is required.');
        setIsLoading(false);
        return;
      }

      const compressedFileAsFile = new File([compressedFile], customFileName, {
        type: file.type,
      });

      const response = await storage.createFile('66389165001ab8078701', compressedFileAsFile.name, compressedFileAsFile);
      const newImageId = response.$id;

      const urlObject = await storage.getFileView('66389165001ab8078701', newImageId);

      setImgUrls((prev) => {
        const newUrls = [...prev];
        newUrls[index] = urlObject.href;
        return newUrls;
      });

      const updatedData = {
        ...data1,
        [imageFields[index]]: newImageId,
      };
      await databases.updateDocument('66376eba000eb9cc6797', '663773e1002a4fe7be40', documentId, updatedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const triggerFileInput = (index) => {
    fileInputRefs[index].current.click();
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imgUrls.length);
  };

  const previousImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + imgUrls.length) % imgUrls.length);
  };

  if (isLoading) return <p className="text-center">Loading Images...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="text-center">
      <div className="relative w-full max-w-md mx-auto">
        <div className="image-viewer">
          {imgUrls[currentIndex] ? (
            <img
              src={imgUrls[currentIndex]}
              alt={`Image ${currentIndex + 1}`}
              className="w-full h-[30vh] object-cover rounded-md shadow-md"
            />
          ) : (
            <p className="text-gray-500">No Image Available</p>
          )}

          <button
            onClick={() => triggerFileInput(currentIndex)}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-200"
          >
            {imgUrls[currentIndex] ? `Replace Image ${currentIndex + 1}` : `Add Image ${currentIndex + 1}`}
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRefs[currentIndex]}
            onChange={(event) => handleImageUpload(event, currentIndex)}
            className="hidden"
          />
        </div>

        {imgUrls.length > 1 && (
          <div className="flex justify-between mt-4">
            <button
              onClick={previousImage}
              className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-l transition duration-200"
            >
              Previous
            </button>
            <button
              onClick={nextImage}
              className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-r transition duration-200"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImgView;
