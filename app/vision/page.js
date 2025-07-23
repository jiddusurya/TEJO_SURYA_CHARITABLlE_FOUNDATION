"use client";
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';

// Custom hook for checking if an element is in the viewport
const useInView = (options) => {
    const ref = useRef(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                observer.disconnect();
            }
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(ref.current);
            }
        };
    }, [ref, options]);

    return [ref, isInView];
};


// Custom hook to animate counting up
const useCountUp = (end, duration = 2000, startInView) => {
    const [count, setCount] = useState(0);
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);

    useEffect(() => {
        if (startInView) {
            let frame = 0;
            const counter = setInterval(() => {
                frame++;
                const progress = frame / totalFrames;
                let currentCount = Math.floor(end * progress);
                setCount(currentCount);

                if (frame === totalFrames) {
                    clearInterval(counter);
                    setCount(end); // Ensure it ends on the exact number
                }
            }, frameRate);
            return () => clearInterval(counter);
        }
    }, [end, duration, startInView, totalFrames, frameRate]);

    return count;
};


// Helper component for Icons using inline SVGs
const Icon = ({ name, className }) => {
    const icons = {
        eye: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>,
        star: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>,
        sparkle: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 3v2.5m5.2 1.3-1.8 1.8M21 12h-2.5m-1.3 5.2 1.8 1.8M12 21v-2.5m-5.2-1.3 1.8-1.8M3 12h2.5m1.3-5.2-1.8-1.8" /></svg>,
        globe: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>,
        bookOpen: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>,
        users: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
    };
    return icons[name] || null;
};

// Animated Counter Component
const GoalCounter = ({ end, label, formatAsLakh = false }) => {
    const [ref, inView] = useInView({ threshold: 0.1 });
    const count = useCountUp(end, 2000, inView);

    const formatNumber = (num) => {
        if (formatAsLakh) {
            return (num / 100000).toFixed(0);
        }
        return num.toLocaleString('en-IN');
    };

    return (
        <div ref={ref} className="text-center">
            <p className="text-5xl md:text-6xl font-bold text-red-500">
                {formatNumber(count)}
                {formatAsLakh && ' Lakh'}
            </p>
            <p className="text-gray-600 mt-2">{label}</p>
        </div>
    );
};


// Main Page Component
export default function VisionPage() {

    return (
        <div className="bg-white font-sans">
            <main>
                {/* Our Vision Section */}
                <section className="py-20 text-center bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="inline-block p-4 bg-gray-100 rounded-full mb-6 shadow-sm">
                            <Icon name="eye" className="h-10 w-10 text-gray-700" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Our Vision</h1>
                        <p className="mt-4 max-w-3xl mx-auto text-gray-600 text-lg">
                            A world where every girl and woman has the knowledge, resources, and support to manage her menstrual health with dignity and confidence.
                        </p>
                    </div>
                </section>

                {/* Quote Section */}
                <section className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-rose-800 text-white text-center py-6 px-8 rounded-2xl shadow-lg">
                        <h2 className="text-2xl md:text-3xl font-semibold">"Healthy Periods. Happy Girl Children. Stronger Nation."</h2>
                    </div>
                </section>

                {/* Main Content Section */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            {/* Left Column */}
                            <div className="relative h-full min-h-[450px]">
                                <img src="https://placehold.co/600x600/E5E7EB/333?text=Empowered+Women" alt="Empowered women" className="rounded-2xl shadow-xl w-full h-full object-cover" />
                                <div className="absolute top-6 right-6 bg-red-500 text-white p-4 rounded-full shadow-lg">
                                    <Icon name="star" className="h-8 w-8" />
                                </div>
                                <div className="absolute bottom-6 left-6 bg-white text-gray-700 p-4 rounded-full shadow-lg">
                                    <Icon name="sparkle" className="h-8 w-8" />
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="p-8 md:p-12  h-full flex flex-col justify-center">
                                <div className="space-y-8">
                                    <div className='bg-gray-800 text-white p-8 rounded-2xl'>
                                        <h3 className="text-4xl font-bold mb-2">Creating a Brighter Future</h3>
                                        <p className="text-gray-400 text-xl">
                                            We envision a society where menstruation is no longer a barrier to education, employment, or participation in daily life. We are driven to create lasting change in communities across South India.
                                        </p>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <Icon name="bookOpen" className="h-6 w-6 text-red-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-2xl">Universal Access to Education</h4>
                                            <p className="text-gray-400 text-lg">Every girl should have access to comprehensive menstrual health education in order to make informed decisions about her body and health.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <Icon name="star" className="h-6 w-6 text-red-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-2xl">Dignified and Confident Lives</h4>
                                            <p className="text-gray-400 text-lg">We want to ensure that girls and women can manage their periods with dignity, confidence, and without shame or fear.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Ambitious Goals Section */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">Our Ambitious Goals</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200">
                                <GoalCounter end={75000} label="High Schools Aimed" />
                            </div>
                            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200">
                                <GoalCounter end={8800000} label="Girls in Need of Support" formatAsLakh={true} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Help Us Realize Our Vision Section */}
                <section className="bg-slate-800 text-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold">Help Us Realize Our Vision</h2>
                        <p className="mt-4 max-w-2xl mx-auto">
                            Together, we can create a world where menstrual health is no longer a barrier to education, opportunity, and dignity.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                            <Link href={"/impact-stories"}>
                                <button className="bg-white text-gray-800 font-bold px-8 py-3 rounded-lg shadow-md border border-gray-300 hover:bg-gray-100 transition-colors flex items-center w-full sm:w-auto justify-center">
                                    <Icon name="eye" className="h-5 w-5 mr-2" />
                                    See Our Impact
                                </button>
                            </Link>
                            <Link href={"/donate"}>
                                <button className="bg-white text-gray-800 font-bold px-8 py-3 rounded-lg shadow-md border border-gray-300 hover:bg-gray-100 transition-colors flex items-center w-full sm:w-auto justify-center">
                                    <Icon name="eye" className="h-5 w-5 mr-2" />
                                    Join Our Mission
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
