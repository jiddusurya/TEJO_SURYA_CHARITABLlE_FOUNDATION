"use client";
import React, { useState, useEffect, useRef } from 'react';

// Reusable Icon Component
const Icon = ({ name, className }) => {
    const icons = {
        users: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
        close: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
    };
    return icons[name] || null;
};

// Story Modal Component
const StoryModal = ({ story, onClose }) => {
    if (!story) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-xl font-bold text-gray-800">{story.title}</h3>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200">
                        <Icon name="close" className="h-6 w-6 text-gray-600" />
                    </button>
                </div>
                <div className="flex-grow overflow-y-auto p-6">
                    <img src={story.imageUrl} alt={story.title} className="w-full h-64 object-cover rounded-lg mb-4" />
                    <p className="text-gray-600 whitespace-pre-wrap">{story.content}</p>
                </div>
            </div>
        </div>
    );
};

// New Carousel Component for Stories
const StoriesCarousel = ({ stories, onReadMore }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const timeoutRef = useRef(null);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    useEffect(() => {
        resetTimeout();
        if (!isPaused) {
            timeoutRef.current = setTimeout(
                () => setCurrentIndex((prevIndex) => (prevIndex + 1) % stories.length),
                3000 // Change slide every 5 seconds
            );
        }
        return () => {
            resetTimeout();
        };
    }, [currentIndex, isPaused, stories.length]);

    if (!stories || stories.length === 0) {
        return <div className="text-center text-gray-400">Impact stories coming soon...</div>;
    }

    const currentStory = stories[currentIndex];
    const truncatedContent = currentStory.content.length > 150
        ? currentStory.content.substring(0, 150) + '...'
        : currentStory.content;

    return (
        <div 
            className="relative max-w-4xl mx-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col md:flex-row items-center gap-8 p-8 transition-all duration-500 ease-in-out">
                <img src={currentStory.imageUrl} alt={currentStory.title} className="w-48 h-48 rounded-full object-cover flex-shrink-0 border-4 border-white shadow-md" />
                <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold text-gray-800">{currentStory.title}</h2>
                    <p className="mt-2 text-gray-600 text-sm whitespace-pre-wrap">{truncatedContent}</p>
                    <button onClick={() => onReadMore(currentStory)} className="mt-4 text-red-500 font-semibold hover:text-red-600">
                        Read More
                    </button>
                </div>
            </div>
            
            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {stories.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${currentIndex === index ? 'bg-red-500' : 'bg-gray-300 hover:bg-gray-400'}`}
                    />
                ))}
            </div>
        </div>
    );
};

// Main Page Component
export default function ImpactStoriesPage() {
    const [stories, setStories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedStory, setSelectedStory] = useState(null);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const res = await fetch('/api/impact-stories');
                if (!res.ok) throw new Error("Failed to fetch stories");
                setStories(await res.json());
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStories();
    }, []);

    return (
        <div className="bg-white font-sans">
            <main>
                <section className="py-20 text-center bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="inline-block p-4 bg-orange-100 rounded-full mb-6 shadow-sm">
                            <Icon name="users" className="h-10 w-10 text-orange-500" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Impact Stories</h1>
                        <p className="mt-4 max-w-3xl mx-auto text-gray-600 text-lg">
                            Real stories from the communities we serve. These are the faces and voices behind our mission.
                        </p>
                    </div>
                </section>

                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        {isLoading ? (
                            <div className="text-center text-gray-500">Loading stories...</div>
                        ) : (
                            <StoriesCarousel stories={stories} onReadMore={setSelectedStory} />
                        )}
                    </div>
                </section>
            </main>
            <StoryModal story={selectedStory} onClose={() => setSelectedStory(null)} />
        </div>
    );
}