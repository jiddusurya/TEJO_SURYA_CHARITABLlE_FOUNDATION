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
    whatsapp: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M16.75 13.96c.25.13.42.3.52.5.1.2.11.44.08.73-.01.2-.04.38-.08.53-.04.15-.1.28-.18.4-.08.12-.18.23-.28.33-.1.1-.22.18-.34.24-.12.06-.24.1-.37.12-.13.02-.26.03-.4.03h-.2c-.3 0-.58-.04-.86-.12-.28-.08-.54-.2-.8-.34-.26-.14-.52-.3-.76-.48-.24-.18-.48-.38-.68-.6-.2-.22-.4-.45-.58-.7-.18-.25-.34-.5-.48-.77-.14-.27-.26-.54-.36-.82-.1-.28-.18-.56-.24-.85-.06-.29-.1-.57-.1-.85v-.2c0-.14.01-.28.04-.42.03-.14.07-.27.12-.4.05-.13.12-.25.2-.36.08-.1.18-.2.3-.28.12-.08.24-.15.38-.2.14-.05.28-.08.42-.1h.2c.18 0 .35.03.5.08.15.05.3.12.43.2.13.08.25.18.37.28.12.1.22.22.32.34.1.12.18.24.24.38.06.14.1.28.12.42l.02.26c-.02.22-.06.42-.12.6-.06.18-.15.35-.26.5-.11.15-.24.28-.4.4-.16.12-.32.2-.48.24-.12.04-.24.06-.36.06h-.24c-.05 0-.1-.01-.14-.02-.04-.01-.08-.02-.12-.04-.04-.02-.08-.04-.1-.06-.02-.02-.05-.04-.06-.06-.05-.04-.1-.1-.14-.15-.04-.05-.08-.1-.12-.16-.04-.06-.07-.12-.1-.18-.03-.06-.05-.12-.06-.18-.01-.06-.02-.12-.02-.18v-.14c.02-.1.05-.2.1-.3.05-.1.1-.18.18-.25.08-.07.16-.14.25-.2.09-.06.18-.12.28-.16.1-.04.2-.08.3-.1.1-.02.2-.04.3-.04h.2c.28 0 .54.06.78.18.24.12.46.28.64.48.18.2.34.42.46.64.12.22.22.46.28.72.06.26.1.52.1.8v.2c0 .24-.04.48-.12.7-.08.22-.2.43-.34.62-.14.19-.3.37-.48.54z" /></svg>,
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
              <a href='https://chat.whatsapp.com/your-community-link-here' target='_blank'>
                <button className="bg-green-500 text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center mx-auto">
                  <Icon name="chat" className="h-6 w-6 mr-3" />
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
              <button className="bg-white text-green-800 font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition-colors">
                <span>
                <Icon name="chat" className="h-6 w-6 mr-3" />
                </span>
                Request Mentorship
              </button>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
