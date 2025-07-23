"use client";
import React from 'react';

// Helper component for Icons using inline SVGs
const Icon = ({ name, className }) => {
  const icons = {
    users: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    heart: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>,
    clock: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
    fileText: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
  };
  return icons[name] || null;
};

const HelpCard = ({ icon, title, description, color }) => {
  const colorClasses = {
    red: 'bg-red-100 text-red-500',
    orange: 'bg-orange-100 text-orange-500',
    purple: 'bg-purple-100 text-purple-500',
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
      <div className={`inline-flex items-center justify-center rounded-full h-16 w-16 mb-4 ${colorClasses[color]}`}>
        <Icon name={icon} className="h-8 w-8" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mt-4">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
  );
};

// Main Page Component
export default function VolunteerPage() {

  const helpOptions = [
    {
      icon: 'heart',
      title: "Field Volunteer",
      description: "Directly engage with communities, conduct awareness sessions, and distribute hygiene kits.",
      color: 'red'
    },
    {
      icon: 'clock',
      title: "Event Support",
      description: "Help organize and manage events, workshops, and training programs.",
      color: 'orange'
    },
    {
      icon: 'fileText',
      title: "Content Creation",
      description: "Create educational material, social media content, and awareness campaigns.",
      color: 'purple'
    }
  ];

  return (
    <div className="bg-white font-sans">
      <main>
        {/* Volunteer With Us Section */}
        <section className="py-20 text-center bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="inline-block p-4 bg-orange-100 rounded-full mb-6 shadow-sm">
                    <Icon name="users" className="h-10 w-10 text-orange-500" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Volunteer With Us</h1>
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
            </div>
        </section>

        {/* Become a Volunteer Section */}
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <div className="bg-amber-50 p-8 md:p-12 rounded-2xl shadow-xl border border-gray-200">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">Become a Volunteer</h2>
                    <p className="text-center text-gray-600 mb-8">Fill out the form below and we'll get in touch with volunteer opportunities</p>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                            <input type="text" id="fullName" placeholder="Enter your full name" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                            <input type="email" id="email" placeholder="Enter your email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500" />
                        </div>
                        <div>
                            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number *</label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-100 text-gray-500">+91</span>
                                <input type="tel" id="mobile" placeholder="Enter mobile number" className="w-full px-4 py-3 rounded-r-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                        </div>
                         <div>
                            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                            <input type="number" id="age" placeholder="Enter your age" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500" />
                        </div>
                        <div>
                            <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                            <input type="text" id="occupation" placeholder="Your current occupation" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500" />
                        </div>
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <input type="text" id="location" placeholder="Your city/location" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500" />
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                            <select id="availability" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500">
                                <option>When are you available?</option>
                                <option>Weekdays</option>
                                <option>Weekends</option>
                                <option>Flexible</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">Skills & Expertise *</label>
                            <input type="text" id="skills" placeholder="What skills can you contribute? (e.g., teaching, healthcare, design, social media, etc.)" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500" />
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-1">Why do you want to volunteer with us?</label>
                            <textarea id="motivation" rows="4" placeholder="Tell us about your motivation to volunteer..." className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500"></textarea>
                        </div>
                        <div className="md:col-span-2 text-center">
                            <button type="submit" className="bg-orange-500 text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-orange-600 transition-colors">
                                Submit Application
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
      </main>
    </div>
  );
}
