"use client";
import React, { useState, useEffect } from 'react';

// Main Loading Page Component
export default function LoadingPage() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 200);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-amber-50 font-sans">
      <div className="text-center">
        <div className="relative inline-block mb-8">
          <img 
            src="/logo.png" 
            alt="Tejo Surya Foundation Logo" 
            className="h-24 w-24 rounded-full animate-pulse" 
            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/96x96/F87171/FFFFFF?text=TS'; }}
          />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Empowering Through Health Awareness</h1>
        <p className="text-gray-600 mb-8">Please wait while we prepare the content for you.</p>
        
        <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-gradient-to-r from-orange-400 to-red-500 h-2.5 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-orange-600 font-semibold mt-4">{Math.round(progress)}%</p>
      </div>
    </div>
  );
}
