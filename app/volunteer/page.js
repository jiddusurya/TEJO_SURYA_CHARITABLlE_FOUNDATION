"use client";
import React, { useState, useRef } from 'react';
import Link from 'next/link';

// Helper component for Icons using inline SVGs
const Icon = ({ name, className }) => {
  const icons = {
    users: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    volunteer: <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">  <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />  <path d="M14 10C14 11.1046 13.1046 12 12 12C10.8954 12 10 11.1046 10 10C10 8.89543 10.8954 8 12 8C13.1046 8 14 8.89543 14 10Z" fill="currentColor" />  <path d="M12 14V16M12 16L14 14M12 16L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    clock: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
    fileText: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0-2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
    target: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>,
    messageCircle: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>,
  };
  return icons[name] || null;
};

const HelpCard = ({ icon, title, description, color }) => {
  const colorClasses = {
    red: 'bg-red-100 text-red-500',
    orange: 'bg-orange-100 text-orange-500',
    purple: 'bg-purple-100 text-purple-500',
    blue: 'bg-blue-100 text-blue-500',
    green: 'bg-green-100 text-green-500',
  };

  return (
    <div className="flex items-center justify-center bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
      <div className={`inline-flex items-center justify-center rounded-full h-16 w-16 mb-4 p-3 ${colorClasses[color]}`}>
        <Icon name={icon} className="h-8 w-8" />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mt-4">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  );
};

// Main Page Component
export default function VolunteerPage() {
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(null);

  const handleJoinClick = () => {
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100); // Wait for render
  };

  const helpOptions = [
    {
      icon: 'volunteer',
      title: "Field Volunteer",
      description: "Directly engage with communities, conduct awareness sessions, and distribute hygiene kits.",
      color: 'red'
    },
    {
      icon: 'clock',
      title: "Collaboration Support & Engagement",
      description: "Driving effective communication, partnerships, and impactful events, workshops to strengthen stakeholder connections.",
      color: 'orange'
    },
    {
      icon: 'fileText',
      title: "Planning & Program Development Support",
      description: "Combining strategic planning, project execution, & impactful content creation to drive the overall impact.",
      color: 'purple'
    },
  ];

  return (
    <div className="bg-white font-sans">
      <main>
        {/* Volunteer With Us Section */}
        <section className="py-20 text-center bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className='flex items-center justify-center'>
              <div className="inline-block p-4 bg-orange-100 rounded-full mx-3 shadow-sm">
                <Icon name="users" className="h-10 w-10 text-orange-500" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Volunteer With Us</h1>
            </div>
            <p className="mt-4 max-w-3xl mx-auto text-gray-600 text-lg">
              Join our team of passionate volunteers and help us empower girls and women through menstrual health education and awareness programs.
            </p>
          </div>
        </section>

        {/* How You Can Help Section */}
        <section className="py-20 bg-amber-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">How You Can Help</h2>
              <p className="mt-4 max-w-2xl mx-auto text-gray-600">
                There are many ways to contribute your skills and time to our mission.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {helpOptions.map((option) => (
                <HelpCard key={option.title} {...option} />
              ))}
            </div>
            <div className="sticky bottom-4 z-50 flex justify-center mt-8">
              <button
                onClick={handleJoinClick}
                className="bg-orange-500 text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-orange-600 transition-colors"
              >
                Join Us Now
              </button>
            </div>
          </div>
        </section>

        {/* Become a Volunteer Section */}
        {showForm && (
          <section className="py-20 bg-white" ref={formRef}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
              <div className="bg-amber-50 p-8 md:p-12 rounded-2xl shadow-xl border border-gray-200">
                <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSczOv1WieExICi8Pdh-zfcPStDyXmNmOvf7pRqOxj3VNRaOOg/viewform?embedded=true" className='w-full' height="800" frameBorder="0" marginHeight="0" marginWidth="0">Loading…</iframe>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}