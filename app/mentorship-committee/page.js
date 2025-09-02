"use client";
import React, { useState, useEffect } from 'react';

// Reusable Icon Component
const Icon = ({ name, className }) => {
  const icons = {
    chat: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>,
    stethoscope: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4.8 2.3A.3.3 0 1 0 5.4 2a.3.3 0 1 0-.6.3" /><path d="M8.6 2.3a.3.3 0 1 0 .6 0a.3.3 0 1 0-.6 0" /><path d="M12.5 2.3a.3.3 0 1 0 .6 0a.3.3 0 1 0-.6 0" /><path d="M16.4 2.3a.3.3 0 1 0 .6 0a.3.3 0 1 0-.6 0" /><path d="M20.2 2.3a.3.3 0 1 0 .6 0a.3.3 0 1 0-.6 0" /><path d="M4.9 5.3a4 4 0 0 0-2.5 3.5v1.2c0 1.2.8 2.2 2 2.5" /><path d="M21.1 5.3a4 4 0 0 1 2.5 3.5v1.2c0 1.2-.8 2.2-2 2.5" /><path d="M12 12.8a2.3 2.3 0 0 0-2.3 2.3v6.4a2.3 2.3 0 0 0 4.6 0v-6.4A2.3 2.3 0 0 0 12 12.8z" /><path d="M9.7 15.1a2.3 2.3 0 1 1 4.6 0" /></svg>,
    users: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    shield: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>,
    calendar: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
    whatsapp: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.487 5.235 3.487 8.413 0 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.613-1.474l-6.168 1.688a.5.5 0 0 1-.61-.611zM7.477 18.382c1.625.918 3.482 1.401 5.423 1.401 5.454 0 9.903-4.448 9.903-9.902 0-5.454-4.449-9.902-9.903-9.902-5.454 0-9.902 4.448-9.902 9.902 0 2.021.608 3.965 1.735 5.613l-1.143 4.155 4.26-1.161zM12.072 6.689c.302 0 .59.038.868.114l-.343 1.22c-.16-.042-.324-.064-.49-.064-1.998 0-3.622 1.624-3.622 3.622 0 .843.293 1.622.798 2.238l-.813.813c-.633-.76-.99-1.736-.99-2.795 0-2.538 2.06-4.598 4.598-4.598zm5.353 2.91c.302 0 .59.038.868.114l-.343 1.22c-.16-.042-.324-.064-.49-.064-1.998 0-3.622 1.624-3.622 3.622 0 .843.293 1.622.798 2.238l-.813.813c-.633-.76-.99-1.736-.99-2.795 0-2.538 2.06-4.598 4.598-4.598z" /></svg>,
  };
  return icons[name] || null;
};

const FeatureCard = ({ icon, title, description, bgColor }) => (
  <div className={`${bgColor} p-6 rounded-2xl text-center flex items-center justify-center`}>
    <div className="text-gray-700 mb-3"><Icon name={icon} className="h-8 w-8" /></div>
    <div className='px-2'>
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </div>
  </div>
);

const MentorCard = ({ imgSrc, name, title, tags }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
    <img src={imgSrc} alt={name} className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-white shadow-md" />
    <h3 className="text-xl font-bold text-gray-800">{name}</h3>
    <p className="text-gray-500 font-semibold mt-1 text-sm">{title}</p>
    <div className="mt-4 flex flex-wrap justify-center gap-2">
      {tags.map(tag => (
        <span key={tag} className="text-xs font-semibold bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full">{tag}</span>
      ))}
    </div>
  </div>
);

// Main Page Component
export default function MentorshipCommitteePage() {
  const [mentors, setMentors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await fetch('/api/mentors');
        const data = await res.json();
        setMentors(data);
      } catch (error) {
        console.error("Failed to fetch mentors:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMentors();
  }, []);

  const featureCards = [
    { icon: 'stethoscope', title: 'Medical Experts', description: 'From certified healthcare professionals.', bgColor: 'bg-green-100' },
    { icon: 'users', title: 'For Both Genders', description: "Children's feelings are valid.", bgColor: 'bg-blue-100' },
    { icon: 'shield', title: 'Safe Space', description: 'For confidential and non-judgmental environment.', bgColor: 'bg-purple-100' },
    { icon: 'calendar', title: 'Regular Sessions', description: 'Weekly mentorship sessions.', bgColor: 'bg-yellow-100' }
  ];

  const howItWorksSteps = [
    { number: 1, title: "Safe Registration", description: "Connect with us confidentially for mentorship sessions through our secure platform." },
    { number: 2, title: "Expert Matching", description: "We match our clients with appropriate mentors based on their specific needs and concerns." },
    { number: 3, title: "Regular Sessions", description: "One-on-one or group sessions provide ongoing support and education." },
    { number: 4, title: "Continuous Support", description: "Ongoing check-ins and anonymous Committee ensure long-term care and community building." }
  ];

  return (
    <div className="bg-white font-sans">
      <main>
        {/* Mentorship Committee Title Section */}
        <section className="py-20 text-center bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className='flex items-center justify-center'>
              <div className="inline-block p-4 bg-green-100 rounded-full mx-3 shadow-sm">
                <Icon name="chat" className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Mentorship Committee</h1>
            </div>
            <p className="mt-4 max-w-3xl mx-auto text-gray-600 text-lg">
              Our Mentorship Committee provides expert guidance, support from healthcare professionals, corporate leaders in creating safe space for learning with confidence.             </p>
          </div>
        </section>

        {/* Mentors Section */}
        <section className="pb-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? <div className="text-center">Loading mentors...</div> : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {mentors.map((mentor) => (<MentorCard key={mentor.id} {...mentor} />))}
              </div>
            )}
          </div>
        </section>

        {/* Feature Cards Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featureCards.map((card) => (<FeatureCard key={card.title} {...card} />))}
          </div>
        </section>


        {/* How Our Mentorship Works Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">How Our Mentorship Works</h2>
                <div className="space-y-6">
                  {howItWorksSteps.map((step) => (
                    <div key={step.number} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-green-500 text-white font-bold rounded-full">
                        {step.number}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <img src="https://res.cloudinary.com/dqwcr4y98/image/upload/v1756445531/Students_session_2_gfw7bk.jpg" alt="Mentorship Session" className="rounded-2xl shadow-xl w-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Need Guidance Section */}
        <section className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Need Guidance? We're Here to Help</h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-300">
              Don't let questions about menstrual health go unanswered. Our expert mentors are here to provide safe, confidential, and professional guidance.
            </p>
            <div className="mt-10">
              <a href='https://api.whatsapp.com/send/?phone=919573709185&text&type=phone_number&app_absent=0' target='_blank' rel="noopener noreferrer">
                <button className="bg-white text-green-800 font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition-colors flex items-center justify-center mx-auto">
                  <Icon name="whatsapp" className="h-6 w-6 mr-3" />
                  Request Mentorship
                </button>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

