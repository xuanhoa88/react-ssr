import React from 'react';
import { FrontloadProvider } from 'react-frontload';

export default function App({ children, frontloadState }) {
  return (
    <React.StrictMode>
      <FrontloadProvider initialState={frontloadState}>
        {children}
      </FrontloadProvider>
    </React.StrictMode>
  );
}
