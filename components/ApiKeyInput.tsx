/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent, ChangeEvent } from 'react';
import { useMicrophone } from '../contexts/MicrophoneContext';
import './ApiKeyInput.css';

interface ApiKeyInputProps {
  onApiKeySubmit: (apiKey: string) => void;
}

const ApiKeyInput = ({ onApiKeySubmit }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');
  const [isRequesting, setIsRequesting] = useState(false);
  const { setMicrophoneStream, setMicrophoneGranted } = useMicrophone();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      setError('API Key is required');
      return;
    }

    if (!apiKey.startsWith('AIza')) {
      setError('Invalid API Key format. Should start with "AIza"');
      return;
    }

    setIsRequesting(true);
    setError('');

    try {
      // Request microphone permission immediately during user gesture
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setMicrophoneStream(stream);
        setMicrophoneGranted(true);
        console.log('Microphone permission granted and stream stored');
      } else {
        console.warn('Microphone API not available');
        setMicrophoneGranted(false);
      }
      
      // Proceed with API key submission
      onApiKeySubmit(apiKey.trim());
      
    } catch (err) {
      console.error('Microphone permission error:', err);
      setError('Microphone permission was denied. You can still use the app but voice chat will not work.');
      setMicrophoneGranted(false);
      
      // Still proceed with API key submission even if mic fails
      setTimeout(() => {
        onApiKeySubmit(apiKey.trim());
      }, 2000);
    } finally {
      setIsRequesting(false);
    }
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
          <p className="mic-notice">📢 Voice chat requires microphone access (will be requested)</p>
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
          
          <button type="submit" className="submit-btn" disabled={isRequesting}>
            {isRequesting ? 'Setting up...' : 'Start Chatting (& Enable Mic)'}
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
