import React, { useState } from 'react';

function DebugApp() {
  const [test, setTest] = useState('Debug Working!');

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold text-purple-400 mb-4">
          Wizziverse Debug Mode
        </h1>
        <p className="text-cyan-300 mb-6">{test}</p>
        
        {/* Test Tailwind Classes */}
        <div className="bg-gradient-to-r from-purple-600 to-cyan-600 p-4 rounded-lg mb-4">
          Gradient Test
        </div>
        
        <div className="bg-black/40 backdrop-blur-lg border border-purple-500/30 p-4 rounded-lg mb-4">
          Backdrop Blur Test
        </div>
        
        {/* Test React State */}
        <button 
          onClick={() => setTest('State Update Working!')}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition-colors"
        >
          Test State Update
        </button>
        
        <div className="mt-6 text-sm text-gray-400">
          <p>✅ React imports working</p>
          <p>✅ TypeScript compiling</p>
          <p>✅ Tailwind CSS loading</p>
          <p>✅ State management working</p>
        </div>
      </div>
    </div>
  );
}

export default DebugApp; 