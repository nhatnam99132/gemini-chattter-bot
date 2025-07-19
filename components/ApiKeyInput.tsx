/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent, ChangeEvent } from 'react';
import './ApiKeyInput.css';

interface ApiKeyInputProps {
  onApiKeySubmit: (apiKey: string) => void;
}

const ApiKeyInput = ({ onApiKeySubmit }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      setError('API Key is required');
      return;
    }

    if (!apiKey.startsWith('AIza')) {
      setError('Invalid API Key format. Should start with "AIza"');
      return;
    }

    setError('');
    onApiKeySubmit(apiKey.trim());
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  return (
    <div className="api-key-container">
      <div className="api-key-card">
        <div className="api-key-header">
          <h1>🤖 Gemini Chatbot</h1>
          <p>Enter your Gemini API Key to get started</p>
        </div>
        
        <form onSubmit={handleSubmit} className="api-key-form">
          <div className="input-group">
            <label htmlFor="apiKey">Gemini API Key</label>
            <input
              type="password"
              id="apiKey"
              value={apiKey}
              onChange={handleInputChange}
              placeholder="AIzaSy..."
              className={`api-input ${error ? 'error' : ''}`}
            />
            {error && <span className="error-message">{error}</span>}
          </div>
          
          <button type="submit" className="submit-btn">
            Start Chatting
          </button>
        </form>
        
        <div className="api-key-info">
          <p>
            Don't have an API key? 
            <a 
              href="https://aistudio.google.com/app/apikey" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Get one from Google AI Studio
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyInput;
