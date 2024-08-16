import React, { useState, useEffect } from 'react';
import { storage } from '../appwriteConfig';
import { openDB } from 'idb';

const ImgView = ({ data1 }) => {
  const [imgUrl, setImgUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFromCache, setIsFromCache] = useState(false);

  useEffect(() => {
    const fetchImg = async () => {
      setIsLoading(true);
      setError(null);
      setIsFromCache(false);

      try {
        // Open (or create) the database
        const db = await openDB('image-store', 1, {
          upgrade(db) {
            db.createObjectStore('images');
          },
        });

        // Check if the image is already in IndexedDB
        const cachedImage = await db.get('images', data1.featuredImage);

        if (cachedImage) {
          // If the image is cached, use it
          setImgUrl(cachedImage);
          setIsFromCache(true); // Indicate that the image is from cache
          console.log('Image fetched from IndexedDB cache:', cachedImage);
        } else {
          // If the image is not cached, fetch it from Appwrite
          console.log('Fetching image from Appwrite');
          const urlObject = await storage.getFileView('66389165001ab8078701', data1.featuredImage);

          // Extract the href property from the URL object
          const url = urlObject.href;
          
          // Fetch the image data from the URL
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          
          // Convert the response to a blob
          const blob = await response.blob();
          const blobUrl = URL.createObjectURL(blob);

          // Cache the fetched image blob URL
          await db.put('images', blobUrl, data1.featuredImage);

          setImgUrl(blobUrl);
          console.log('Image fetched from Appwrite and cached in IndexedDB:', blobUrl);
        }
      } catch (err) {
        console.error('Error fetching image:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (data1.featuredImage) {
      fetchImg();
    }
  }, [data1.featuredImage]);

  if (isLoading) {
    return <p>Loading Image</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  if (!imgUrl) {
    return <p>Image Not Found</p>;
  }

  return (
    <div>
      <img src={imgUrl} alt='Appwrite Image' />
      {isFromCache && <p>(Loaded from cache)</p>}
    </div>
  );
};

export default ImgView;
