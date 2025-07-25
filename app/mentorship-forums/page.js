"use client";
import React from 'react';

// Helper component for Icons using inline SVGs
const Icon = ({ name, className }) => {
  const icons = {
    chat: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>,
    stethoscope: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4.8 2.3A.3.3 0 1 0 5.4 2a.3.3 0 1 0-.6.3" /><path d="M8.6 2.3a.3.3 0 1 0 .6 0a.3.3 0 1 0-.6 0" /><path d="M12.5 2.3a.3.3 0 1 0 .6 0a.3.3 0 1 0-.6 0" /><path d="M16.4 2.3a.3.3 0 1 0 .6 0a.3.3 0 1 0-.6 0" /><path d="M20.2 2.3a.3.3 0 1 0 .6 0a.3.3 0 1 0-.6 0" /><path d="M4.9 5.3a4 4 0 0 0-2.5 3.5v1.2c0 1.2.8 2.2 2 2.5" /><path d="M21.1 5.3a4 4 0 0 1 2.5 3.5v1.2c0 1.2-.8 2.2-2 2.5" /><path d="M12 12.8a2.3 2.3 0 0 0-2.3 2.3v6.4a2.3 2.3 0 0 0 4.6 0v-6.4A2.3 2.3 0 0 0 12 12.8z" /><path d="M9.7 15.1a2.3 2.3 0 1 1 4.6 0" /></svg>,
    users: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    shield: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>,
    calendar: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
    whatsapp: <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48"><path fill="#fff" d="M4.9,43.3l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5c5.1,0,9.8,2,13.4,5.6	C41,14.2,43,18.9,43,24c0,10.5-8.5,19-19,19c0,0,0,0,0,0h0c-3.2,0-6.3-0.8-9.1-2.3L4.9,43.3z"></path><path fill="#fff" d="M4.9,43.8c-0.1,0-0.3-0.1-0.4-0.1c-0.1-0.1-0.2-0.3-0.1-0.5L7,33.5c-1.6-2.9-2.5-6.2-2.5-9.6	C4.5,13.2,13.3,4.5,24,4.5c5.2,0,10.1,2,13.8,5.7c3.7,3.7,5.7,8.6,5.7,13.8c0,10.7-8.7,19.5-19.5,19.5c-3.2,0-6.3-0.8-9.1-2.3	L5,43.8C5,43.8,4.9,43.8,4.9,43.8z"></path><path fill="#cfd8dc" d="M24,5c5.1,0,9.8,2,13.4,5.6C41,14.2,43,18.9,43,24c0,10.5-8.5,19-19,19h0c-3.2,0-6.3-0.8-9.1-2.3	L4.9,43.3l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5 M24,43L24,43L24,43 M24,43L24,43L24,43 M24,4L24,4C13,4,4,13,4,24	c0,3.4,0.8,6.7,2.5,9.6L3.9,43c-0.1,0.3,0,0.7,0.3,1c0.2,0.2,0.4,0.3,0.7,0.3c0.1,0,0.2,0,0.3,0l9.7-2.5c2.8,1.5,6,2.2,9.2,2.2	c11,0,20-9,20-20c0-5.3-2.1-10.4-5.8-14.1C34.4,6.1,29.4,4,24,4L24,4z"></path><path fill="#40c351" d="M35.2,12.8c-3-3-6.9-4.6-11.2-4.6C15.3,8.2,8.2,15.3,8.2,24c0,3,0.8,5.9,2.4,8.4L11,33l-1.6,5.8	l6-1.6l0.6,0.3c2.4,1.4,5.2,2.2,8,2.2h0c8.7,0,15.8-7.1,15.8-15.8C39.8,19.8,38.2,15.8,35.2,12.8z"></path><path fill="#fff" fillRule="evenodd" d="M19.3,16c-0.4-0.8-0.7-0.8-1.1-0.8c-0.3,0-0.6,0-0.9,0	s-0.8,0.1-1.3,0.6c-0.4,0.5-1.7,1.6-1.7,4s1.7,4.6,1.9,4.9s3.3,5.3,8.1,7.2c4,1.6,4.8,1.3,5.7,1.2c0.9-0.1,2.8-1.1,3.2-2.3	c0.4-1.1,0.4-2.1,0.3-2.3c-0.1-0.2-0.4-0.3-0.9-0.6s-2.8-1.4-3.2-1.5c-0.4-0.2-0.8-0.2-1.1,0.2c-0.3,0.5-1.2,1.5-1.5,1.9	c-0.3,0.3-0.6,0.4-1,0.1c-0.5-0.2-2-0.7-3.8-2.4c-1.4-1.3-2.4-2.8-2.6-3.3c-0.3-0.5,0-0.7,0.2-1c0.2-0.2,0.5-0.6,0.7-0.8	c0.2-0.3,0.3-0.5,0.5-0.8c0.2-0.3,0.1-0.6,0-0.8C20.6,19.3,19.7,17,19.3,16z" clipRule="evenodd"></path></svg>,
    heart: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>,
  };
  return icons[name] || null;
};

const FeatureCard = ({ icon, title, description, bgColor }) => (
  <div className={`${bgColor} p-6 rounded-2xl text-center flex flex-col items-center justify-center`}>
    <div className="text-white mb-3">
      <Icon name={icon} className="h-8 w-8" />
    </div>
    <h3 className="text-lg font-bold text-gray-800">{title}</h3>
    <p className="text-sm text-gray-600 mt-1">{description}</p>
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
export default function MentorshipForumPage() {

  const featureCards = [
    {
      icon: 'stethoscope',
      title: 'Medical Experts',
      description: 'From certified healthcare professionals.',
      bgColor: 'bg-green-100'
    },
    {
      icon: 'users',
      title: 'For Both Genders',
      description: "Children's feelings are valid.",
      bgColor: 'bg-blue-100'
    },
    {
      icon: 'shield',
      title: 'Safe Space',
      description: 'For confidential and non-judgmental environment.',
      bgColor: 'bg-purple-100'
    },
    {
      icon: 'calendar',
      title: 'Regular Sessions',
      description: 'Weekly mentorship sessions.',
      bgColor: 'bg-yellow-100'
    }
  ];

  const mentors = [
    {
      imgSrc: "https://placehold.co/128x128/E0F2FE/0891B2?text=AR",
      name: "Dr. Anjali Reddy",
      title: "Pediatric & Adolescent Health Mentor",
      tags: ["Medical Expert", "Gynecologist"]
    },
    {
      imgSrc: "https://placehold.co/128x128/E0E7FF/4338CA?text=KP",
      name: "Dr. Kiran Patel",
      title: "Public Health Mentor",
      tags: ["Community Health", "Research"]
    },
    {
      imgSrc: "https://placehold.co/128x128/FEF3C7/B45309?text=MN",
      name: "Ms. Meera Nair",
      title: "Peer Education Specialist",
      tags: ["Counseling", "Youth Programs"]
    },
    {
      imgSrc: "https://placehold.co/128x128/F3E8FF/7E22CE?text=SB",
      name: "Dr. Suresh Babu",
      title: "Mental Health & Wellness Mentor",
      tags: ["MD Community Medicine", "Therapist"]
    }
  ];

  const howItWorksSteps = [
    {
      number: 1,
      title: "Safe Registration",
      description: "Connect with us confidentially for mentorship sessions through our secure platform."
    },
    {
      number: 2,
      title: "Expert Matching",
      description: "We match our clients with appropriate mentors based on their specific needs and concerns."
    },
    {
      number: 3,
      title: "Regular Sessions",
      description: "One-on-one or group sessions provide ongoing support and education."
    },
    {
      number: 4,
      title: "Continuous Support",
      description: "Ongoing check-ins and anonymous forums ensure long-term care and community building."
    }
  ];

  return (
    <div className="bg-white font-sans">
      <main>
        {/* Mentorship Forums Title Section */}
        <section className="py-20 text-center bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-block p-4 bg-green-100 rounded-full mb-6 shadow-sm">
              <Icon name="chat" className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Mentorship Forums</h1>
            <p className="mt-4 max-w-3xl mx-auto text-gray-600 text-lg">
              Our Mentorship Forums provide expert guidance and support from healthcare professionals, educators, and peers. We create a safe space for everyone to understand menstrual health and navigate their questions with confidence.
            </p>
          </div>
        </section>

        {/* Feature Cards Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featureCards.map((card) => (
              <FeatureCard key={card.title} {...card} />
            ))}
          </div>
        </section>

        {/* Mentors Section */}
        <section className="pb-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {mentors.map((mentor) => (
                <MentorCard key={mentor.name} {...mentor} />
              ))}
            </div>
          </div>
        </section>

        {/* Ready to Talk Section */}
        <section className="pb-20 text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-800">Ready to Talk?</h2>
            <p className="mt-2 text-gray-600 max-w-xl mx-auto">
              Connect with our mentorship community for confidential, direct support, session updates, and to ask your questions in a safe space.
            </p>
            <div className="mt-8">
              <a href='https://api.whatsapp.com/send/?phone=919573709185&text&type=phone_number&app_absent=0' target='_blank'>
                <button className="bg-green-500 text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center mx-auto">
                  <Icon name="whatsapp" className="h-6 w-6 mr-3" />
                  Connect on WhatsApp
                </button>
              </a>
            </div>
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
                <img src="https://placehold.co/600x450/E5E7EB/4B5563?text=Mentorship+Session" alt="Mentorship Session" className="rounded-2xl shadow-xl w-full" />
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
              <a href='https://api.whatsapp.com/send/?phone=919573709185&text&type=phone_number&app_absent=0' target='_blank'>
                <button className="bg-white text-green-800 font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition-colors flex items-center justify-center mx-auto">
                  <span>
                    <Icon name="whatsapp" className="h-6 w-6 mr-3" />
                  </span>
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
