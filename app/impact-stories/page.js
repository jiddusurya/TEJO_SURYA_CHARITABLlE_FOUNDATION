"use client";
import React from 'react';

// Helper component for Icons using inline SVGs
const Icon = ({ name, className }) => {
  const icons = {
    users: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  };
  return icons[name] || null;
};

// Main Page Component
export default function ImpactStoriesPage() {

  return (
    <div className="bg-white font-sans">
      <main>
        {/* Impact Stories Section */}
        <section className="py-20 text-center bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="inline-block p-4 bg-orange-100 rounded-full mb-6 shadow-sm">
                    <Icon name="users" className="h-10 w-10 text-orange-500" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Impact Stories</h1>
                <p className="mt-4 max-w-3xl mx-auto text-gray-600 text-lg">
                    Real stories from the communities we serve. These are the faces and voices behind our mission to empower girls and women through menstrual health education.
                </p>
            </div>
        </section>

        {/* Stories Placeholder Section */}
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="min-h-[50vh] flex items-center justify-center">
                    {/* Content for impact stories will go here */}
                    <p className="text-gray-400">Impact stories coming soon...</p>
                </div>
            </div>
        </section>
      </main>
    </div>
  );
}
