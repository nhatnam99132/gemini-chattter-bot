/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useState } from 'react';
import AgentEdit from './components/AgentEdit';
import ApiKeyInput from './components/ApiKeyInput';
import ControlTray from './components/console/control-tray/ControlTray';
import ErrorScreen from './components/demo/ErrorSreen';
import KeynoteCompanion from './components/demo/keynote-companion/KeynoteCompanion';
import Header from './components/Header';
import UserSettings from './components/UserSettings';
import { LiveAPIProvider } from './contexts/LiveAPIContext';
import { MicrophoneProvider } from './contexts/MicrophoneContext';
import { useUI } from './lib/state';

/**
 * Main application component that provides a streaming interface for Live API.
 * Manages video streaming state and provides controls for webcam/screen capture.
 */
function App() {
  const { showUserConfig, showAgentEdit } = useUI();
  const [apiKey, setApiKey] = useState<string>('');
  
  const currentApiKey = apiKey;

  const handleApiKeySubmit = (key: string) => {
    setApiKey(key);
  };

  return (
    <MicrophoneProvider>
      {/* Show API key input ONLY if no environment variable is set */}
      {!currentApiKey ? (
        <ApiKeyInput onApiKeySubmit={handleApiKeySubmit} />
      ) : (
        <div className="App">
          <LiveAPIProvider apiKey={currentApiKey}>
            <ErrorScreen />
            <Header />

            {showUserConfig && <UserSettings />}
            {showAgentEdit && <AgentEdit />}
            <div className="streaming-console">
              <main>
                <div className="main-app-area">
                  <KeynoteCompanion />
                </div>

                <ControlTray></ControlTray>
              </main>
            </div>
          </LiveAPIProvider>
        </div>
      )}
    </MicrophoneProvider>
  );
}

export default App;
