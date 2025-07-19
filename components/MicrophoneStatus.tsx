/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import './MicrophoneStatus.css';

const MicrophoneStatus = () => {
  const [microphoneAvailable, setMicrophoneAvailable] = useState<boolean | null>(null);
  const [isHttps, setIsHttps] = useState(false);

  useEffect(() => {
    // Check if we're on HTTPS
    setIsHttps(window.location.protocol === 'https:');
    
    // Check microphone availability
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          stream.getTracks().forEach(track => track.stop());
          setMicrophoneAvailable(true);
        })
        .catch(() => {
          setMicrophoneAvailable(false);
        });
    } else {
      setMicrophoneAvailable(false);
    }
  }, []);

  if (microphoneAvailable === null) {
    return null; // Still checking
  }

  if (microphoneAvailable && isHttps) {
    return null; // Everything is working
  }

  return (
    <div className="microphone-status">
      {!isHttps && (
        <div className="warning-message">
          <span className="warning-icon">⚠️</span>
          <div className="warning-content">
            <strong>HTTPS Required</strong>
            <p>Voice chat requires HTTPS. Please use a secure connection to enable microphone access.</p>
          </div>
        </div>
      )}
      
      {!microphoneAvailable && isHttps && (
        <div className="warning-message">
          <span className="warning-icon">🎤</span>
          <div className="warning-content">
            <strong>Microphone Access Required</strong>
            <p>Please allow microphone access in your browser to use voice chat.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MicrophoneStatus;
