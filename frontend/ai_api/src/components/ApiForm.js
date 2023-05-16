import React, { useState } from 'react';
import './ApiForm.css';

const ApiForm = ({ onCreateApi }) => {
  const [apiName, setApiName] = useState('');
  const [apiDescription, setApiDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateApi(apiName, apiDescription);
  };

  return (
    <div className="api-form-container">
      <h2>Create API</h2>
      <form className="api-form" onSubmit={handleSubmit}>
        <label htmlFor="api-name">API Name:</label>
        <input
          type="text"
          id="api-name"
          value={apiName}
          onChange={(e) => setApiName(e.target.value)}
          required
        />
        <label htmlFor="api-description">API Description:</label>
        <textarea
          id="api-description"
          value={apiDescription}
          onChange={(e) => setApiDescription(e.target.value)}
          required
        />
        <button type="submit" className="create-api-button">
          Create API
        </button>
      </form>
    </div>
  );
};

export default ApiForm;
