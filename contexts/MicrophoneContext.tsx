/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createContext, useContext, useState, ReactNode } from 'react';

interface MicrophoneContextType {
  microphoneStream: MediaStream | null;
  setMicrophoneStream: (stream: MediaStream | null) => void;
  microphoneGranted: boolean;
  setMicrophoneGranted: (granted: boolean) => void;
}

const MicrophoneContext = createContext<MicrophoneContextType | undefined>(undefined);

export const MicrophoneProvider = ({ children }: { children: ReactNode }) => {
  const [microphoneStream, setMicrophoneStream] = useState<MediaStream | null>(null);
  const [microphoneGranted, setMicrophoneGranted] = useState(false);

  return (
    <MicrophoneContext.Provider value={{
      microphoneStream,
      setMicrophoneStream,
      microphoneGranted,
      setMicrophoneGranted
    }}>
      {children}
    </MicrophoneContext.Provider>
  );
};

export const useMicrophone = () => {
  const context = useContext(MicrophoneContext);
  if (!context) {
    throw new Error('useMicrophone must be used within MicrophoneProvider');
  }
  return context;
};
