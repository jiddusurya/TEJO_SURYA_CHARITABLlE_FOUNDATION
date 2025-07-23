"use client";
import React from 'react';
import Link from 'next/link';
// Helper component for Icons using inline SVGs
const Icon = ({ name, className }) => {
  const icons = {
    handshake: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>,
    fileText: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
    users: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    school: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m4 6 8-4 8 4" /><path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2" /><path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4" /><path d="M18 5v17" /><path d="M6 5v17" /><circle cx="12" cy="9" r="2" /></svg>,
    heart: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>,
    globe: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>,
  };
  return icons[name] || null;
};

const PartnershipCard = ({ icon, title, description, color }) => {
  const colorClasses = {
    orange: 'bg-orange-100 text-orange-500',
    yellow: 'bg-yellow-100 text-yellow-500',
    red: 'bg-red-100 text-red-500',
    green: 'bg-green-100 text-green-500',
    blue: 'bg-blue-100 text-blue-500',
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
export default function CollaboratePage() {

  const partnershipOptions = [
    {
      icon: 'fileText',
      title: "Corporate Partnership",
      description: "Support our initiatives, funding, and employee volunteer programs.",
      color: 'orange'
    },
    {
      icon: 'users',
      title: "NGO Collaboration",
      description: "Join forces with us to maximize our collective impact and reach.",
      color: 'yellow'
    },
    {
      icon: 'school',
      title: "Educational Institutions",
      description: "Partner with schools and universities to implement health education programs.",
      color: 'red'
    },
    {
      icon: 'heart',
      title: "Healthcare Partners",
      description: "Work with healthcare providers to ensure comprehensive support for women's health.",
      color: 'green'
    },
    {
      icon: 'handshake',
      title: "Government Bodies",
      description: "Partner with government agencies to scale our programs and create policy impact.",
      color: 'blue'
    },
    {
      icon: 'globe',
      title: "International Organizations",
      description: "Collaborate with global organizations to bring best practices and funding opportunities.",
      color: 'purple'
    }
  ];

  return (
    <div className="bg-white font-sans">
      <main>
        {/* Collaborate With Us Section */}
        <section className="py-15 text-center bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-block p-4 bg-orange-100 rounded-full mb-6 shadow-sm">
              <Icon name="handshake" className="h-10 w-10 text-orange-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Collaborate With Us</h1>
            <p className="mt-4 max-w-3xl mx-auto text-gray-600 text-lg">
              Partner with Tejo Surya Foundation to create meaningful impact in menstrual health education and women's empowerment across South India.
            </p>
          </div>
        </section>

        {/* Partnership Opportunities Section */}
        <section className="py-15 bg-amber-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Partnership Opportunities</h2>
              <p className="mt-4 max-w-2xl mx-auto text-gray-600">
                We welcome partnerships with organizations that share our vision of empowering women and girls.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {partnershipOptions.map((option) => (
                <PartnershipCard key={option.title} {...option} />
              ))}
            </div>
            
          </div>
        </section>
          <Link href="#proposal-form" className="bg-orange-500 text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-orange-600 transition-colors sticky bottom-2 left-[45vw]">
            Join Us Now
          </Link>

        {/* Partnership Proposal Section */}
        <section className="py-20 bg-white" id='proposal-form'>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="bg-amber-50 p-8 md:p-12 rounded-2xl shadow-xl border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">Partnership Proposal</h2>
              <p className="text-center text-gray-600 mb-8">Tell us about your organization and how we can work together</p>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="orgName" className="block text-sm font-medium text-gray-700 mb-1">Organization Name *</label>
                  <input type="text" id="orgName" placeholder="Enter organization name" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500" />
                </div>
                <div>
                  <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                  <input type="text" id="contactPerson" placeholder="Enter contact person's name" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input type="email" id="email" placeholder="Enter email address" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500" />
                </div>
                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number *</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-100 text-gray-500">+91</span>
                    <input type="tel" id="mobile" placeholder="Enter mobile number" className="w-full px-4 py-3 rounded-r-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500" />
                  </div>
                </div>
                <div>
                  <label htmlFor="orgType" className="block text-sm font-medium text-gray-700 mb-1">Organization Type *</label>
                  <select id="orgType" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500">
                    <option>Select organization type</option>
                    <option>Corporate</option>
                    <option>NGO</option>
                    <option>Educational Institution</option>
                    <option>Healthcare</option>
                    <option>Government</option>
                    <option>International</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="collabType" className="block text-sm font-medium text-gray-700 mb-1">Collaboration Type</label>
                  <select id="collabType" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500">
                    <option>What can you offer?</option>
                    <option>Funding</option>
                    <option>Volunteering</option>
                    <option>In-kind Donation</option>
                    <option>Pro-bono Services</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input type="text" id="location" placeholder="Your organization's location" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500" />
                </div>
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                  <input type="url" id="website" placeholder="Organization's website" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500" />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Collaboration Description *</label>
                  <textarea id="description" rows="4" placeholder="Describe your organization and the proposed collaboration in detail..." className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500"></textarea>
                </div>
                <div className="md:col-span-2 text-center">
                  <button type="submit" className="bg-orange-500 text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-orange-600 transition-colors">
                    Submit Proposal
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
