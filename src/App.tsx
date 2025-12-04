import React from 'react';
import { Sidebar } from './components/Sidebar';
import { MainWorkspace } from './components/MainWorkspace';
import { RightPanel } from './components/RightPanel';

function App() {
  return (
    <div className="flex min-h-screen bg-white font-sans overflow-hidden">
      <Sidebar />
      <MainWorkspace />
      <RightPanel />
    </div>
  );
}

export default App;
