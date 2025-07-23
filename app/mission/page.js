"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

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
                const currentCount = Math.round(end * progress);
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
        heart: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>,
        users: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
        checkCircle: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>,
        target: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>,
    };
    return icons[name] || null;
};

// Animated Counter Component
const ImpactCounter = ({ end, suffix = '+' }) => {
    const [ref, inView] = useInView({ threshold: 0.1 });
    const count = useCountUp(end, 2000, inView);
    return <span ref={ref}>{count}{suffix}</span>;
};


// Main App Component
export default function App() {
    return (
        <div className="bg-white font-sans">
            <main>
                {/* Our Mission Title */}
                <section className="py-20 text-center bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="inline-block p-3 bg-red-100 rounded-full mb-4">
                            <Icon name="target" className="h-8 w-8 text-red-500" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Our Mission</h1>
                        <p className="mt-4 max-w-3xl mx-auto text-gray-600">
                            To empower girls and women with comprehensive menstrual health education, breaking down barriers and creating a future where every girl can thrive with dignity.
                        </p>
                    </div>
                </section>

                {/* Main Content Section */}
                <section className="pb-20 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-8 items-stretch">
                            {/* Left Column */}
                            <div className="p-8 ">
                                <div className='bg-gradient-to-r from-orange-600 to-yellow-600 p-6 rounded-2xl sm:p-8 text-white m-3'>

                                    <h2 className="text-2xl font-bold mb-4">Empowering Through Education</h2>
                                    <p className=" mb-6">
                                        We believe that knowledge is power. Through our comprehensive educational programs, we provide girls and women with the information they need to make informed decisions about their health and well-being.
                                    </p>
                                </div>
                                <ul className="space-y-6">
                                    <li className="flex items-start">
                                        <div className="flex-shrink-0 mr-4 mt-1">
                                            <Icon name="checkCircle" className="h-6 w-6 text-red-500" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-800">Breaking Stigma and Myths</h3>
                                            <p className="text-gray-600">We address cultural taboos and misconceptions around menstruation, creating safe spaces for open dialogue and learning.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="flex-shrink-0 mr-4 mt-1">
                                            <Icon name="checkCircle" className="h-6 w-6 text-red-500" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-800">Ensuring Access to Resources</h3>
                                            <p className="text-gray-600">We provide hygiene kits, sanitary supplies, and educational materials to ensure no girl is left behind due to lack of resources.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="flex-shrink-0 mr-4 mt-1">
                                            <Icon name="checkCircle" className="h-6 w-6 text-red-500" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-800">Building Sustainable Communities</h3>
                                            <p className="text-gray-600">We train local leaders, teachers, and healthcare workers to carry our mission within their communities long after our programs end.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* Right Column */}
                            <div className="relative bg-amber-50 rounded-2xl overflow-hidden min-h-[400px] flex items-center justify-center p-8 shadow-2xl ">
                                <img src="https://placehold.co/600x450/FFF7ED/333?text=Community+Health+Education" alt="Community health education background" className="absolute inset-0 w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-amber-50/30"></div>
                                <div className="absolute top-0 right-0 z-10 flex flex-col space-y-8 w-full max-w-xs shadow-2xl">
                                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-lg text-center">
                                        <p className="text-4xl font-bold text-red-500"><ImpactCounter end={5000} /></p>
                                        <p className="text-gray-600 font-semibold">Lives Impacted</p>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 z-10 flex flex-col space-y-8 w-full max-w-xs shadow-2xl">
                                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-lg text-center">
                                        <p className="text-4xl font-bold text-red-500"><ImpactCounter end={150} /></p>
                                        <p className="text-gray-600 font-semibold">Schools Visited</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Focus Areas Section */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Our Focus Areas</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-gray-600">
                            We work across multiple domains to ensure comprehensive support for menstrual health and hygiene.
                        </p>
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                            <div className="bg-white p-8 rounded-xl shadow-md transition-transform hover:-translate-y-2">
                                <div className="inline-block p-3 bg-red-100 rounded-lg mb-4">
                                    <Icon name="heart" className="h-7 w-7 text-red-500" />
                                </div>
                                <h3 className="text-xl font-bold">Health Education</h3>
                                <p className="mt-2 text-gray-600">Comprehensive programs covering menstrual hygiene, puberty, and reproductive health awareness.</p>
                            </div>
                            <div className="bg-white p-8 rounded-xl shadow-md transition-transform hover:-translate-y-2">
                                <div className="inline-block p-3 bg-yellow-100 rounded-lg mb-4">
                                    <Icon name="users" className="h-7 w-7 text-yellow-500" />
                                </div>
                                <h3 className="text-xl font-bold">Community Engagement</h3>
                                <p className="mt-2 text-gray-600">Working with families, schools, and communities to create supportive environments for girls.</p>
                            </div>
                            <div className="bg-white p-8 rounded-xl shadow-md transition-transform hover:-translate-y-2">
                                <div className="inline-block p-3 bg-orange-100 rounded-lg mb-4">
                                    <Icon name="target" className="h-7 w-7 text-orange-500" />
                                </div>
                                <h3 className="text-xl font-bold">Sustainable Impact</h3>
                                <p className="mt-2 text-gray-600">Building long-term solutions through advocacy, research, and ongoing support systems.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Be Part of the Solution Section */}
                <section className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold">Be Part of the Solution</h2>
                        <p className="mt-4 max-w-2xl mx-auto">
                            Join us in our mission to create a world where every girl has access to proper menstrual health education and resources.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                            <Link href={"/core-team"}>
                                <button className="bg-white text-orange-600 font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition-colors flex items-center w-full sm:w-auto justify-center">
                                    <Icon name="users" className="h-5 w-5 mr-2" />
                                    Meet Our Team
                                </button>
                            </Link>
                            <Link href={"/donate"}>
                                <button className="bg-white text-orange-600 font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition-colors flex items-center w-full sm:w-auto justify-center">
                                    Support Our Mission
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
