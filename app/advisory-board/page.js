"use client";
import React, { useState, useEffect, useRef } from 'react';

// --- Reusable Icon Component (with new icons) ---
const Icon = ({ name, className }) => {
  const icons = {
    users: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    target: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
    atom: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}><circle cx="12" cy="12" r="1" /><path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5z" /><path d="m3.8 3.8c-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5 2.04-2.03.02-7.36-4.5-11.9C11.16-.72 5.83-2.74 3.8 3.8z" /></svg>,
    handshake: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="m11 15-1.5 1.5a.5.5 0 0 1-.71 0L3.71 11.41a.5.5 0 0 1 0-.71L8.5 6l1.41 1.41a2 2 0 0 0 2.83 0L15 5l4.29 4.29a.5.5 0 0 1 0 .71l-5.08 5.08a.5.5 0 0 1-.71 0L11 13zm9.29-5.29-4.29-4.29a.5.5 0 0 0-.71 0L13 7.59l2.83 2.83a2 2 0 0 1 0 2.83L11.71 17.4a.5.5 0 0 0 0 .71l4.29 4.29a.5.5 0 0 0 .71 0l5-5a.5.5 0 0 0 0-.71l-5-5z"/></svg>,
    clipboardCheck: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" /><path d="m9 14 2 2 4-4" /></svg>,
    gavel: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="m14 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L11 9" /><path d="m15 11 1 1" /><path d="m12 14 1 1" /><path d="m22 2-3 1-1.5 3.5-1 1-3.5 1.5-1 3 2 2z" /><path d="m2 22 3-1 1.5-3.5 1-1 3.5-1.5 1-3-2-2z" /></svg>,
    badgeCheck: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M3.85 8.62a4 4 0 0 1 4.78-4.78l1.06 1.06a1 1 0 0 0 1.41 0l1.06-1.06a4 4 0 0 1 4.78 4.78l-1.06 1.06a1 1 0 0 0 0 1.41l1.06 1.06a4 4 0 0 1-4.78 4.78l-1.06-1.06a1 1 0 0 0-1.41 0l-1.06 1.06a4 4 0 0 1-4.78-4.78l1.06-1.06a1 1 0 0 0 0-1.41z" /><path d="m9 12 2 2 4-4" /></svg>,
    close: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
    chevronLeft: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="15 18 9 12 15 6"></polyline></svg>,
    chevronRight: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="9 18 15 12 9 6"></polyline></svg>,
  };
  return icons[name] || null;
};

// --- Modal Component to show full member details ---
const MemberModal = ({ member, onClose }) => {
    if (!member) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
                <div className="flex justify-end p-2">
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200">
                        <Icon name="close" className="h-6 w-6 text-gray-600" />
                    </button>
                </div>
                <div className="overflow-y-auto p-6 pt-0 text-center">
                    <img src={member.imgSrc} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white shadow-md" />
                    <h3 className="text-2xl font-bold text-gray-800">{member.name}</h3>
                    <p className="text-blue-600 font-semibold mt-1">{member.title}</p>
                    <p className="text-sm text-gray-500 mt-1">{member.role}</p>
                    <p className="text-gray-600 mt-4 text-sm text-left whitespace-pre-wrap">{member.description}</p>
                </div>
            </div>
        </div>
    );
};

// --- Member Card for use inside the Carousel ---
const AdvisoryBoardMemberCard = ({ member, onReadMore }) => {
    const truncatedDescription = member.description.length > 80
        ? member.description.substring(0, 80) + '...'
        : member.description;

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center h-full flex flex-col">
            <img src={member.imgSrc} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white shadow-md" />
            <h3 className="text-2xl font-bold text-gray-800">{member.name}</h3>
            <p className="text-blue-600 font-semibold mt-1">{member.title}</p>
            <p className="text-sm text-gray-500 mt-1">{member.role}</p>
            <p className="text-gray-600 mt-4 text-sm flex-grow">{truncatedDescription}</p>
            <button onClick={() => onReadMore(member)} className="mt-4 text-red-500 font-semibold hover:text-red-600 self-center">
                Read More
            </button>
        </div>
    );
};

// --- Multi-Item Carousel for Board Members (Updated for Responsiveness) ---
const AdvisoryBoardCarousel = ({ members, onReadMore }) => {
    const [itemsPerView, setItemsPerView] = useState(3);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [isPaused, setIsPaused] = useState(false);
    const timeoutRef = useRef(null);

    // Effect to handle responsive number of items
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) { // Tailwind's `md` breakpoint
                setItemsPerView(1);
            } else {
                setItemsPerView(3);
            }
        };

        handleResize(); // Set initial value on mount
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Reset index when the view changes to prevent visual bugs
    useEffect(() => {
        setCurrentIndex(itemsPerView);
    }, [itemsPerView]);

    const resetTimeout = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    const canLoop = members && members.length > itemsPerView;

    const loopedMembers = canLoop ? [
        ...members.slice(members.length - itemsPerView),
        ...members,
        ...members.slice(0, itemsPerView)
    ] : members;

    // Effect for auto-scrolling
    useEffect(() => {
        resetTimeout();
        if (!isPaused && canLoop) {
            timeoutRef.current = setTimeout(() => goToNext(), 5000);
        }
        return () => resetTimeout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex, isPaused, canLoop]);

    const handleTransitionEnd = () => {
        if (currentIndex === 0) {
            setIsTransitioning(false);
            setCurrentIndex(members.length);
        } else if (currentIndex === members.length + itemsPerView) {
            setIsTransitioning(false);
            setCurrentIndex(itemsPerView);
        }
    };

    useEffect(() => {
        if (!isTransitioning) {
            setTimeout(() => setIsTransitioning(true), 50);
        }
    }, [isTransitioning]);

    const goToPrevious = () => {
        if (!isTransitioning || !canLoop) return;
        setCurrentIndex(prevIndex => prevIndex - 1);
    };

    const goToNext = () => {
        if (!isTransitioning || !canLoop) return;
        setCurrentIndex(prevIndex => prevIndex + 1);
    };

    if (!members || members.length === 0) {
        return <div className="text-center text-gray-500 p-8">Advisory board members will be announced soon.</div>;
    }
    
    // If there aren't enough members to loop, display a static grid
    if (!canLoop) {
        return (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {members.map((member) => (
                    <AdvisoryBoardMemberCard key={member.id} member={member} onReadMore={onReadMore} />
                ))}
            </div>
        )
    }

    return (
        <div 
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="overflow-hidden">
                <div
                    className="flex"
                    style={{
                        width: `${(100 / itemsPerView) * loopedMembers.length}%`,
                        transform: `translateX(-${currentIndex * (100 / loopedMembers.length)}%)`,
                        transition: isTransitioning ? 'transform 500ms ease-in-out' : 'none',
                    }}
                    onTransitionEnd={handleTransitionEnd}
                >
                    {loopedMembers.map((member, index) => (
                        <div key={index} className="w-full px-4" style={{ flexBasis: `${100 / loopedMembers.length}%` }}>
                           <AdvisoryBoardMemberCard member={member} onReadMore={onReadMore} />
                        </div>
                    ))}
                </div>
            </div>
            
            <button onClick={goToPrevious} className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10 transition-opacity opacity-50 hover:opacity-100">
                <Icon name="chevronLeft" className="h-6 w-6 text-gray-700" />
            </button>
            <button onClick={goToNext} className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10 transition-opacity opacity-50 hover:opacity-100">
                <Icon name="chevronRight" className="h-6 w-6 text-gray-700" />
            </button>
        </div>
    );
};


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

// --- Main Page Component ---
export default function AdvisoryBoardPage() {
    const [boardMembers, setBoardMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedMember, setSelectedMember] = useState(null);

    useEffect(() => {
        const fetchBoardMembers = async () => {
            try {
                const res = await fetch('/api/advisory-board');
                const data = await res.json();
                setBoardMembers(data);
            } catch (error) {
                console.error("Failed to fetch advisory board members:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBoardMembers();
    }, []);

  const helpTopics = [
    { icon: 'target', title: 'Strategic Guidance', color: 'red', description: 'Provide strategic direction and long-term vision for our programs and initiatives.' },
    { icon: 'atom', title: 'Expert Knowledge', color: 'blue', description: 'Share specialized knowledge in healthcare, education, and social development.' },
    { icon: 'handshake', title: 'Network & Partnerships', color: 'yellow', description: 'Leverage their networks to create new partnerships and funding opportunities.' },
    { icon: 'clipboardCheck', title: 'Program Review', color: 'blue', description: 'Review and evaluate our programs to ensure effectiveness and impact.' },
    { icon: 'gavel', title: 'Policy Advocacy', color: 'red', description: 'Advocate for policy changes that support menstrual health awareness.' },
    { icon: 'badgeCheck', title: 'Quality Assurance', color: 'green', description: 'Ensure our programs meet the highest standards of quality and ethics.' }
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
                    Our distinguished Advisory Board consists of experts, professionals, and thought leaders who provide strategic guidance and support to advance our mission.
                </p>
            </div>
        </section>

        {/* Board Members Carousel Section */}
        <section className="pb-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {isLoading ? <div className="text-center">Loading members...</div> : (
                   <AdvisoryBoardCarousel members={boardMembers} onReadMore={setSelectedMember} />
                )}
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

      <MemberModal member={selectedMember} onClose={() => setSelectedMember(null)} />
    </div>
  );
}

