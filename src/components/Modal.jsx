import React from 'react';

const Modal = ({ detail, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <p>{detail}</p>
      </div>
    </div>
  );
};

export default Modal;
