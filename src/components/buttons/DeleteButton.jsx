import React from 'react';
import './DeleteButton.css';

const DeleteButton = ({ onClick, label = 'Delete' }) => {
  return (
    <button className="delete-button" onClick={onClick} aria-label={label}>
      {label}
    </button>
  );
};

export default DeleteButton;