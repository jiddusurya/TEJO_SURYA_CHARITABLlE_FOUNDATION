"use client";
import Link from 'next/link';
import React from 'react';

// Helper component for Icons using inline SVGs
const Icon = ({ name, className }) => {
  const icons = {
    home: <svg xmlns="http://www.w.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
    alertTriangle: <svg xmlns="http://www.w.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>,
  };
  return icons[name] || null;
};

// Main Not Found Page Component
export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-amber-50 font-sans text-center">
      <div>
        <div className="inline-block p-4 bg-red-100 rounded-full mb-6 shadow-sm">
            <Icon name="alertTriangle" className="h-16 w-16 text-red-500" />
        </div>
        <h1 className="text-8xl font-bold text-red-500">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 mt-4">Page Not Found</h2>
        <p className="text-gray-600 mt-4 max-w-md mx-auto">
          Oops! The page you are looking for does not exist. It might have been moved or deleted.
        </p>
        <div className="mt-10">
          <Link
            href="/"
            className="bg-orange-500 text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-orange-600 transition-colors flex items-center justify-center mx-auto w-fit"
          >
            <Icon name="home" className="h-5 w-5 mr-2" />
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
