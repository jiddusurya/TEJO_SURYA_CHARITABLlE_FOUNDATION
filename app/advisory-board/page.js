"use client";
import React from 'react';

// Helper component for Icons using inline SVGs
const Icon = ({ name, className }) => {
  const icons = {
    users: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    target: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
    atom: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}><circle cx="12" cy="12" r="1" /><path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5z" /><path d="m3.8 3.8c-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5 2.04-2.03.02-7.36-4.5-11.9C11.16-.72 5.83-2.74 3.8 3.8z" /></svg>,
    handshake: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="m11 15-1.5 1.5a.5.5 0 0 1-.71 0L3.71 11.41a.5.5 0 0 1 0-.71L8.5 6l1.41 1.41a2 2 0 0 0 2.83 0L15 5l4.29 4.29a.5.5 0 0 1 0 .71l-5.08 5.08a.5.5 0 0 1-.71 0L11 13zm9.29-5.29-4.29-4.29a.5.5 0 0 0-.71 0L13 7.59l2.83 2.83a2 2 0 0 1 0 2.83L11.71 17.4a.5.5 0 0 0 0 .71l4.29 4.29a.5.5 0 0 0 .71 0l5-5a.5.5 0 0 0 0-.71l-5-5z"/></svg>,
    clipboardCheck: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" /><path d="m9 14 2 2 4-4" /></svg>,
    gavel: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="m14 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L11 9" /><path d="m15 11 1 1" /><path d="m12 14 1 1" /><path d="m22 2-3 1-1.5 3.5-1 1-3.5 1.5-1 3 2 2z" /><path d="m2 22 3-1 1.5-3.5 1-1 3.5-1.5 1-3-2-2z" /></svg>,
    badgeCheck: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M3.85 8.62a4 4 0 0 1 4.78-4.78l1.06 1.06a1 1 0 0 0 1.41 0l1.06-1.06a4 4 0 0 1 4.78 4.78l-1.06 1.06a1 1 0 0 0 0 1.41l1.06 1.06a4 4 0 0 1-4.78 4.78l-1.06-1.06a1 1 0 0 0-1.41 0l-1.06 1.06a4 4 0 0 1-4.78-4.78l1.06-1.06a1 1 0 0 0 0-1.41z" /><path d="m9 12 2 2 4-4" /></svg>,
  };
  return icons[name] || null;
};

const AdvisoryBoardMemberCard = ({ imgSrc, name, title, role, description }) => (
  <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
    <img src={imgSrc} alt={name} className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white shadow-md" />
    <h3 className="text-2xl font-bold text-gray-800">{name}</h3>
    <p className="text-blue-600 font-semibold mt-1">{title}</p>
    <p className="text-sm text-gray-500 mt-1">{role}</p>
    <p className="text-gray-600 mt-4 text-sm">{description}</p>
  </div>
);

const HelpTopicCard = ({ icon, title, children, color }) => {
  const colorClasses = {
    red: 'bg-red-100 text-red-500',
    blue: 'bg-blue-100 text-blue-500',
    yellow: 'bg-yellow-100 text-yellow-500',
    green: 'bg-green-100 text-green-500',
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      <div className={`inline-block p-3 rounded-xl mb-3 ${colorClasses[color]}`}>
        <Icon name={icon} className="h-7 w-7" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-1">{title}</h3>
      <p className="text-gray-600 text-sm">{children}</p>
    </div>
  );
};

// Main Page Component
export default function AdvisoryBoardPage() {

  const boardMembers = [
    {
      imgSrc: "https://placehold.co/128x128/E0E7FF/4338CA?text=PS",
      name: "Dr. Priya Sharma",
      title: "Senior Advisor - Medical Affairs",
      role: "Gynecologist, MD, DGO",
      description: "Leading gynecologist with 15+ years of experience in clinical practice and reproductive medicine. Advocates for menstrual health awareness in rural communities."
    },
    {
      imgSrc: "https://placehold.co/128x128/DBEAFE/1E40AF?text=RK",
      name: "Prof. Rajesh Kumar",
      title: "Education Policy Advisor",
      role: "PhD Education",
      description: "Former education secretary with expertise in implementing large-scale health programs in schools across South India."
    },
    {
      imgSrc: "https://placehold.co/128x128/E0F2FE/0891B2?text=LD",
      name: "Ms. Lakshmi Devi",
      title: "Women's Rights Advocate",
      role: "MA Social Work",
      description: "Renowned activist and author working for women's empowerment and menstrual equity across India."
    }
  ];

  const helpTopics = [
    {
      icon: 'target',
      title: 'Strategic Guidance',
      color: 'red',
      description: 'Provide strategic direction and long-term vision for our programs and initiatives.'
    },
    {
      icon: 'atom',
      title: 'Expert Knowledge',
      color: 'blue',
      description: 'Share specialized knowledge in healthcare, education, and social development.'
    },
    {
      icon: 'handshake',
      title: 'Network & Partnerships',
      color: 'yellow',
      description: 'Leverage their networks to create new partnerships and funding opportunities.'
    },
    {
      icon: 'clipboardCheck',
      title: 'Program Review',
      color: 'blue',
      description: 'Review and evaluate our programs to ensure effectiveness and impact.'
    },
    {
      icon: 'gavel',
      title: 'Policy Advocacy',
      color: 'red',
      description: 'Advocate for policy changes that support menstrual health awareness.'
    },
    {
      icon: 'badgeCheck',
      title: 'Quality Assurance',
      color: 'green',
      description: 'Ensure our programs meet the highest standards of quality and ethics.'
    }
  ];

  return (
    <div className="bg-white font-sans">
      <main>
        {/* Advisory Board Title Section */}
        <section className="py-20 text-center bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="inline-block p-4 bg-blue-100 rounded-full mb-6 shadow-sm">
                    <Icon name="users" className="h-10 w-10 text-blue-600" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Advisory Board</h1>
                <p className="mt-4 max-w-3xl mx-auto text-gray-600 text-lg">
                    Our distinguished Advisory Board consists of experts, professionals, and thought leaders who provide strategic guidance and support to advance our mission of menstrual health awareness.
                </p>
            </div>
        </section>

        {/* Board Members Section */}
        <section className="pb-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {boardMembers.map((member) => (
                        <AdvisoryBoardMemberCard key={member.name} {...member} />
                    ))}
                </div>
            </div>
        </section>

        {/* How Our Advisory Board Helps Section */}
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">How Our Advisory Board Helps</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-gray-600">
                        Our advisory board provides strategic direction, expertise, and credibility to our programs.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {helpTopics.map((topic) => (
                        <HelpTopicCard key={topic.title} icon={topic.icon} title={topic.title} color={topic.color}>
                            {topic.description}
                        </HelpTopicCard>
                    ))}
                </div>
            </div>
        </section>
      </main>
    </div>
  );
}
