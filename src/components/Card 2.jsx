import React from 'react';

const Card = ({ data, language, onNameClick }) => {
  const name = language === 'eng' ? data.title : data.gtitle;
console.log('data',data)
  return (
    <div className="card">
      <p>Sr: {data.sr}</p>
      <p onClick={onNameClick} style={{ cursor: 'pointer', color: 'blue' }}>Name: {name}</p>
      <p>Phone: {data.phone}</p>
    </div>
  );
};

export default Card;
