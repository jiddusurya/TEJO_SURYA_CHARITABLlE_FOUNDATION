"use client";
import React, { useState, useEffect } from 'react';

// Reusable Icon Component
const Icon = ({ name, className }) => {
  const icons = {
    users: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    heart: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>,
    sparkle: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0" className={className}><path d="M9.5 14.5 8 21l-4-4 6.5-1.5L12 3l1.5 6.5 6.5 1.5-4 4 .5 7-5-3.5-5 3.5Z"/><path d="M22 2 20 4"/><path d="m7 2 3 3"/><path d="m21 15-2-2"/><path d="m3 9 2 2"/><path d="m21 9-2-2"/></svg>,
    handshake: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="m11 15-1.5 1.5a.5.5 0 0 1-.71 0L3.71 11.41a.5.5 0 0 1 0-.71L8.5 6l1.41 1.41a2 2 0 0 0 2.83 0L15 5l4.29 4.29a.5.5 0 0 1 0 .71l-5.08 5.08a.5.5 0 0 1-.71 0L11 13zm9.29-5.29-4.29-4.29a.5.5 0 0 0-.71 0L13 7.59l2.83 2.83a2 2 0 0 1 0 2.83L11.71 17.4a.5.5 0 0 0 0 .71l4.29 4.29a.5.5 0 0 0 .71 0l5-5a.5.5 0 0 0 0-.71l-5-5z"/></svg>,
    bookOpen: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>,
    leaf: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M11 20A7 7 0 0 1 4 13V7a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 0 2 0V7a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 0 2 0V7a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v6a7 7 0 0 1-7 7z"></path><path d="M12 4a2 2 0 1 0-4 0 2 2 0 1 0 4 0z"></path></svg>,
    lightbulb: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M15.09 16.09a2.5 2.5 0 0 1-3.54-3.54l1.41-1.41a5.5 5.5 0 1 0-7.78-7.78l-1.41 1.41a2.5 2.5 0 1 1-3.54-3.54l1.41-1.41A5.5 5.5 0 1 0 9.46.54a2.5 2.5 0 0 1 3.54 3.54L11.59 5.5a5.5 5.5 0 1 0 7.78 7.78l1.41-1.41a2.5 2.5 0 1 1 3.54 3.54L16.54 17a5.5 5.5 0 1 0-7.78-7.78l-1.41 1.41a2.5 2.5 0 1 1-3.54 3.54l7.07 7.07a.5.5 0 0 0 .71 0l7.07-7.07a2.5 2.5 0 0 1 0-3.54zM12 19.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/></svg>,
  };
  return icons[name] || null;
};

const CoreTeamMemberCard = ({ imgSrc, name, title }) => (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <img src={imgSrc} alt={name} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white shadow-md" />
        <h3 className="text-xl font-bold text-gray-800">{name}</h3>
        <p className="text-orange-600 font-semibold mt-1 text-sm">{title}</p>
    </div>
);

const ValueCard = ({ icon, title, children, color }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-500',
    orange: 'bg-orange-100 text-orange-500',
    yellow: 'bg-yellow-100 text-yellow-500',
    red: 'bg-red-100 text-red-500',
    green: 'bg-green-100 text-green-500',
    amber: 'bg-amber-100 text-amber-500',
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
      <div className={`inline-block p-4 rounded-xl mb-4 ${colorClasses[color]}`}>
        <Icon name={icon} className="h-8 w-8" />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{children}</p>
    </div>
  );
};

// Main Page Component
export default function CoreTeamPage() {
    const [teamMembers, setTeamMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTeamMembers = async () => {
            try {
                const res = await fetch('/api/core-team');
                const data = await res.json();
                setTeamMembers(data);
            } catch (error) {
                console.error("Failed to fetch core team members:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTeamMembers();
    }, []);

  const values = [
    { icon: 'heart', title: 'Compassion', color: 'blue', description: 'We approach every girl and woman with empathy, understanding their unique challenges and needs.' },
    { icon: 'sparkle', title: 'Empowerment', color: 'orange', description: 'We believe in giving girls and women the knowledge and tools to make informed decisions about their health.' },
    { icon: 'handshake', title: 'Inclusivity', color: 'yellow', description: 'Our programs are designed to reach every girl, regardless of her background or circumstances.' },
    { icon: 'bookOpen', title: 'Education', color: 'red', description: 'Knowledge is power. We provide comprehensive and age-appropriate health education.' },
    { icon: 'leaf', title: 'Sustainability', color: 'green', description: 'We build programs that create lasting change and can be maintained by communities themselves.' },
    { icon: 'lightbulb', title: 'Innovation', color: 'amber', description: 'We continuously improve our approaches based on the latest research and community feedback.' }
  ];

  return (
    <div className="bg-gray-50 font-sans">
      <main>
        {/* Our Core Team Section */}
        <section className="py-20 text-center bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="inline-block p-4 bg-orange-100 rounded-full mb-6 shadow-sm">
                    <Icon name="users" className="h-10 w-10 text-orange-500" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Our Core Team</h1>
                <p className="mt-4 max-w-3xl mx-auto text-gray-600 text-lg">
                    Meet the passionate individuals driving our mission to empower girls and women through comprehensive menstrual health education and support.
                </p>
            </div>
        </section>

        {/* Team Members Section */}
        <section className="pb-20 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {isLoading ? <div className="text-center">Loading team members...</div> : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member) => (
                            <CoreTeamMemberCard key={member.id} {...member} />
                        ))}
                    </div>
                )}
            </div>
        </section>

        {/* Our Values Section */}
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Our Values</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-gray-600">
                        The principles that guide our team and drive our mission forward.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {values.map((value) => (
                        <ValueCard key={value.title} icon={value.icon} title={value.title} color={value.color}>
                            {value.description}
                        </ValueCard>
                    ))}
                </div>
            </div>
        </section>
      </main>
    </div>
  );
}


