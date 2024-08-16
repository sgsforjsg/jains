import React, { useState } from 'react';
import { FaWhatsapp, FaSquarePhone } from "react-icons/fa6";
import ImgView from './ImgView';
import MyForm from './MyForm'; // Import the form component

const Card = ({ data, language }) => {
    const name = language === 'eng' ? data.title.toUpperCase() : data.gtitle;
    const owner = language === 'eng' ? data.bowner.toUpperCase() : data.gbowner;
    const genre = language === 'eng' ? data.genre.toUpperCase() : data.ggenre;

    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setIsEditing(false);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    return (
        <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <div className="bg-blue-500 text-white p-0">
                <div className="flex items-center justify-between rounded-lg">
                    <div className="flex justify-center items-center">
                        <a href={`https://api.whatsapp.com/send?phone=91${data.bphone}&text=Can%20I%20know%20more%20about%20your%20service..`} target='_blank' rel="noopener noreferrer">
                            <FaWhatsapp size={30} color='white' />
                        </a>
                    </div>
                    <div className="flex-1 text-center text-sm">
                        <button className="text-white" type="button" onClick={openModal}>
                            {name}
                        </button>
                    </div>
                    <div className="flex justify-center items-center">
                        <a href={`tel:${data.bphone}`}>
                            <FaSquarePhone size={30} color='white' />
                        </a>
                    </div>
                </div>

                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-blue-500">
                        <div className="relative w-auto mx-auto max-w-3xl">
                            <div className="bg-blue-950 rounded-lg shadow-lg flex flex-col w-full p-4">
                                <button
                                    className="text-white font-bold uppercase text-sm self-end"
                                    type="button"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                                {!isEditing ? (
                                    <>
                                        <ImgView data1={{ featuredImage: data.featuredImage }} />
                                        <div className="p-2">
                                            <div className="font-extrabold rounded-lg text-gray-400">{data.title.toUpperCase()}</div>
                                            <div className="rounded-lg mt-0 text-white">{data.bowner.toUpperCase()}</div>
                                            <div className="font-medium">{data.bdetails.toUpperCase()}</div>
                                            <div className="italic text-white">{data.baddress.toUpperCase()}</div>
                                        </div>
                                        <button
                                            className="bg-yellow-500 text-white px-2 py-1 mt-4 rounded-md self-start"
                                            type="button"
                                            onClick={handleEditClick}
                                        >
                                            Edit
                                        </button>
                                    </>
                                ) : (
                                    <MyForm documentId={data.$id} initialData={data} onClose={closeModal} />
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex flex-wrap text-xs italic mt-2">
                    <div className="text-left w-1/2 px-2">{owner}</div>
                    <div className="w-1/2 px-2">{genre}</div>
                </div>
            </div>
        </div>
    );
}

export default Card;
