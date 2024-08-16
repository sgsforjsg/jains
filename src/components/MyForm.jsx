import React, { useState, useEffect } from 'react';
import { databases } from '../appwriteConfig';

const MyForm = ({ documentId, initialData, onClose }) => {
    const [formData, setFormData] = useState({
        sr: 0,
        baddress: '',
        gbaddress: '',
        bwhatsapp: '',
        bphone: '',
        title: '',
        genre: '',
        bowner: '',
        bdetails: '',
        gtitle: '',
        gbowner: '',
        ggenre: '',
        gbdetails: '',
        gproducts: ''
    });

    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        if (initialData) {
            setFormData({
                sr: initialData.sr || 0,
                bwhatsapp: initialData.bwhatsapp || '',
                bphone: initialData.bphone || '',

                title: initialData.title || '',
                baddress: initialData.baddress || '',
                genre: initialData.genre || '',
                bowner: initialData.bowner || '',
                bdetails: initialData.bdetails || '',

                gbaddress: initialData.gbaddress || '',
                gtitle: initialData.gtitle || '',
                gbowner: initialData.gbowner || '',
                ggenre: initialData.ggenre || '',
                gbdetails: initialData.gbdetails || '',
                gproducts: initialData.gproducts || ''
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: name === 'sr' ? parseInt(value, 10) : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedFormData = {
                ...formData,
                sr: parseInt(formData.sr, 10)
            };

            if (documentId) {
                // Update existing document
                await databases.updateDocument(
                    '66376eba000eb9cc6797',
                    '663773e1002a4fe7be40',
                    documentId,
                    updatedFormData
                );
                alert('Document updated successfully!');
            } else {
                // Create a new document
                await databases.createDocument(
                    '66376eba000eb9cc6797',
                    '663773e1002a4fe7be40',
                    'unique()', // Generates a unique ID
                    updatedFormData
                );
                alert('Document created successfully!');
            }

            onClose();
        } catch (error) {
            console.error('Failed to save document:', error);
        }
    };

    const renderTabContent = () => {
        const getPlaceholderClass = (fieldName) => {
            return formData[fieldName] === '' ? 'text-red-500' : 'text-gray-400';
        };

        const placeholderText = {
            sr: 'Serial',
            baddress: 'Business Address',
            gbaddress: 'Business Address',
            bwhatsapp: 'WhatsApp',
            bphone: 'Phone',
            title: 'Firm Name',
            genre: 'Category',
            bowner: 'Owner',
            bdetails: 'Business Details',
            gtitle: 'Firm Name',
            gbowner: 'Owner',
            ggenre: 'Category',
            gbdetails: 'Business Details',
            gproducts: 'Products'
        };

        const renderInput = (name, type = "text") => (
            <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholderText[name]}
                className={`border p-2 rounded w-full ${getPlaceholderClass(name)}`}
            />
        );

        switch (activeTab) {
            case 0:
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 text-black gap-4">
                        {renderInput('sr', 'number')}

                        {renderInput('bphone')}
                        {renderInput('bwhatsapp')}
                    </div>
                );
            case 1:
                return (
                    <div className="grid grid-cols-1  gap-4">
                        {renderInput('title')}
                        {renderInput('genre')}
                        {renderInput('bowner')}
                        {renderInput('baddress')}
                        {renderInput('bdetails')}
                    </div>
                );
            case 2:
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {renderInput('gtitle')}
                        {renderInput('ggenre')}
                        {renderInput('gbowner')}
                        {renderInput('gbaddress')}
                        {renderInput('gbdetails')}
                        {renderInput('gproducts')}
                    </div>
                );
            case 3:
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="p-4 w-full">
            <div className="flex justify-between border-b mb-4">
                {['Phone', 'Details in English', 'Details in Gujrati', 'Others'].map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        className={`py-2 px-4 w-full ${activeTab === index ? 'border-b-2 border-blue-500' : ''}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="text-xs  space-y-4">
                {renderTabContent()}
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 w-full">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default MyForm;
