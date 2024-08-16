import React from 'react';
import { FaHome, FaInfoCircle, FaPhone, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-blue-500 p-4 text-white fixed bottom-0 w-full">
      <div className="container mx-auto flex justify-around">
        <Link to="/" className="flex flex-col items-center">
          <FaHome className="h-6 w-6" />
          <span className="mt-1">Home</span>
        </Link>
        <Link to="/about" className="flex flex-col items-center">
          <FaInfoCircle className="h-6 w-6" />
          <span className="mt-1">About Us</span>
        </Link>
        <a href="tel:+1234567890" className="flex flex-col items-center">
          <FaPhone className="h-6 w-6" />
          <span className="mt-1">Call Us</span>
        </a>
        <a href="https://wa.me/1234567890" className="flex flex-col items-center">
          <FaWhatsapp className="h-6 w-6" />
          <span className="mt-1">WhatsApp</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
