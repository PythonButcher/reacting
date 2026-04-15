import React, { useRef } from 'react';
import './FileIngestion.css';

const FileIngestion = ({ dataset, fileSize, fileType, onFileSelect, onFileClear }) => {
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileSelect({
        name: file.name,
        size: (file.size / 1024).toFixed(2) + ' KB',
        type: file.type || 'RAW_DATA'
      });
    }
  };

  return (
    <div className="file-ingestion-container">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        className="hidden-file-input" 
      />

      {dataset ? (
        <div className="file-status-panel animate-in">
          <div className="file-main-info">
            <div className="file-icon">💾</div>
            <div className="file-details">
              <span className="file-name-label">{dataset}</span>
              <span className="file-meta-info">SIZE: {fileSize} // TYPE: {fileType}</span>
            </div>
            <button className="disconnect-btn" onClick={onFileClear} title="Disconnect Source">
              ✕
            </button>
          </div>
        </div>
      ) : (
        <button 
          className="upload-button-mechanical"
          onClick={() => fileInputRef.current.click()}
        >
          <span className="button-icon">↑</span>
          <span className="button-text">BROWSE_LOCAL_DATA_SOURCE</span>
        </button>
      )}
    </div>
  );
};

export default FileIngestion;
