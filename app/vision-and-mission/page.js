"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// --- Custom Hooks (for animations) ---

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

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(currentRef);
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
                const easedProgress = progress * (2 - progress);
                const currentCount = Math.floor(end * easedProgress);
                setCount(currentCount);

                if (frame === totalFrames) {
                    clearInterval(counter);
                    setCount(end);
                }
            }, frameRate);
            return () => clearInterval(counter);
        }
    }, [end, duration, startInView, totalFrames, frameRate]);

    return count;
};


// --- UI Components ---

// Helper component for all Icons using inline SVGs
const Icon = ({ name, className }) => {
    const icons = {
        heart: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>,
        users: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
        checkCircle: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>,
        target: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>,
        telescope: <svg xmlns="http://www.w3.org/2000/svg" width="46px" height="46px" viewBox="0 0 512 512"><path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M39.93,327.56l-4.71-8.13A24,24,0,0,1,44,286.64l86.87-50.07a16,16,0,0,1,21.89,5.86l12.71,22a16,16,0,0,1-5.86,21.85L72.76,336.35A24.06,24.06,0,0,1,39.93,327.56Z" /><path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M170.68,273.72,147.12,233a24,24,0,0,1,8.8-32.78l124.46-71.75a16,16,0,0,1,21.89,5.86l31.57,54.59A16,16,0,0,1,328,210.76L203.51,282.5A24,24,0,0,1,170.68,273.72Z" /><path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M341.85,202.21l-46.51-80.43A24,24,0,0,1,304.14,89l93.29-53.78A24.07,24.07,0,0,1,430.27,44l46.51,80.43a24,24,0,0,1-8.8,32.79L374.69,211A24.06,24.06,0,0,1,341.85,202.21Z" /><line fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" x1="127.59" y1="480" x2="223.73" y2="272.01" /><line fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" x1="271.8" y1="256.02" x2="368.55" y2="448" /></svg>,
        star: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>,
        sparkle: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 3v2.5m5.2 1.3-1.8 1.8M21 12h-2.5m-1.3 5.2 1.8 1.8M12 21v-2.5m-5.2-1.3 1.8-1.8M3 12h2.5m1.3-5.2-1.8-1.8" /></svg>,
        bookOpen: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>,
    };
    return icons[name] || null;
};

// Animated Counter Component
const AnimatedCounter = ({ end, label, suffix = '', prefix = '', formatAsLakh = false }) => {
    const [ref, inView] = useInView({ threshold: 0.1 });
    const count = useCountUp(end, 2000, inView);

    const formatNumber = (num) => {
        if (formatAsLakh) {
            return num < 100000 ? num : (num / 100000).toFixed(0);
        }
        return num.toLocaleString('en-IN');
    };

    return (
        <div ref={ref} className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200 text-center transition-transform hover:scale-105">
            <p className="text-3xl md:text-4xl font-bold text-red-500">
                {prefix}{formatNumber(count)}{suffix}{formatAsLakh && ' Lakh'}
            </p>
            <p className="text-gray-600 mt-2 font-semibold">{label}</p>
        </div>
    );
};


// Main Merged Page Component
export default function MissionAndVisionPage() {
    const [goalStats, setGoalStats] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/goal-stats');
                const data = await res.json();
                setGoalStats(data);
            } catch (error) {
                console.error("Failed to fetch homepage data:", error);
            }
        };
        fetchData();
    }, []);


    return (
        <div className="bg-white font-sans">
            <main>


                {/* Our Vision Section */}
                <section className="py-10 text-center bg-gray-50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className='flex justify-center items-center'>

                            <div className="inline-block p-4 bg-gray-200 rounded-full shadow-sm">
                                <Icon name="telescope" className="h-10 w-10 text-gray-700" />
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Our Vision</h1>
                        </div>
                        <p className="mt-4 max-w-3xl mx-auto text-gray-600 text-lg"> Born from a school teacher’s wisdom and fueled by a pledge,<br /> Tejo Surya Foundation envisions a taboo-free, myth-free & an India without Period Poverty !</p>
                        <div className="mt-8">
                            <div className="bg-gradient-to-r from-rose-800 to-red-600 text-white text-center py-6 px-8 rounded-2xl shadow-lg max-w-4xl mx-auto">
                                <h2 className="text-2xl md:text-3xl font-semibold italic">"Healthy Periods. Happy Girl Children. Stronger Nation."</h2>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Vision Content Section - ADDED BACK */}
                <section className="py-10 bg-gray-50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            {/* Left Column: Vision Image */}
                            <div className="relative h-full min-h-[450px]">
                                <img src="https://res.cloudinary.com/dqwcr4y98/image/upload/v1756445374/Empowered_2_zash9y.jpg" alt="Empowered women" className="rounded-2xl shadow-xl w-full h-full object-cover" />
                                <div className="absolute top-6 right-6 bg-red-500 text-white p-4 rounded-full shadow-lg">
                                    <Icon name="star" className="h-8 w-8" />
                                </div>
                                <div className="absolute bottom-6 left-6 bg-white text-gray-700 p-4 rounded-full shadow-lg">
                                    <Icon name="sparkle" className="h-8 w-8" />
                                </div>
                            </div>
                            {/* Right Column: Vision Content */}
                            <div className="p-4">
                                <div className='bg-gray-800 text-white p-8 rounded-2xl mb-8'>
                                    <h3 className="text-3xl font-bold mb-2">Creating a Brighter Future</h3>
                                    <p className="text-gray-300">
                                        We envision a society where menstruation is no longer a barrier to education, employment, or participation in daily life.
                                    </p>
                                </div>
                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 mt-1 p-3 bg-red-100 rounded-full">
                                            <Icon name="bookOpen" className="h-6 w-6 text-red-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-xl text-gray-800">Universal Access to Education</h4>
                                            <p className="text-gray-600 mt-1">Every girl should have access to comprehensive menstrual health education to make informed decisions.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 mt-1 p-3 bg-red-100 rounded-full">
                                            <Icon name="star" className="h-6 w-6 text-red-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-xl text-gray-800">Dignified and Confident Lives</h4>
                                            <p className="text-gray-600 mt-1">We want to ensure that girls and women can manage their periods with dignity and without shame or fear.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Our Mission Section */}
                <section className="py-10 text-center bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className='flex justify-center items-center'>
                            <div className="inline-block p-4 bg-red-100 rounded-full shadow-sm">
                                <Icon name="target" className="h-10 w-10 text-red-500" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Our Mission</h1>
                        </div>
                        <p className="mt-4 max-w-3xl mx-auto text-gray-600 text-lg"> To help & support every girl from underserved communities and Govt schools, where they can manage their period with dignity and confidence. One School at a Time !                         </p>
                    </div>
                </section>

                {/* Main Content Section for Mission */}
                <section className="pb-20 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            {/* Left Column: Mission Content */}
                            <div className="p-4">
                                <div className='bg-gradient-to-r from-rose-800 to-red-600 p-6 rounded-2xl sm:p-8 text-white mb-8'>
                                    <h2 className="text-2xl font-bold mb-4">Empowering Through Education</h2>
                                    <p className=" mb-6">
                                        We believe that knowledge is power. Through our comprehensive educational programs, we provide girls and women with the information they need to make informed decisions about their health and well-being.
                                    </p>
                                </div>
                                <ul className="space-y-6">
                                    <li className="flex items-start">
                                        <div className="flex-shrink-0 p-3 bg-red-100 rounded-full mr-4 mt-1">
                                            <Icon name="checkCircle" className="h-6 w-6 text-red-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800">Breaking Stigma and Myths</h3>
                                            <p className="text-gray-600 mt-1">We address cultural taboos and misconceptions, creating safe spaces for open dialogue.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="flex-shrink-0 p-3 bg-red-100 rounded-full mr-4 mt-1">
                                            <Icon name="checkCircle" className="h-6 w-6 text-red-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800">Ensuring Access to Resources</h3>
                                            <p className="text-gray-600 mt-1">We provide hygiene kits and educational materials to ensure no girl is left behind.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="flex-shrink-0 p-3 bg-red-100 rounded-full mr-4 mt-1">
                                            <Icon name="checkCircle" className="h-6 w-6 text-red-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800">Building Sustainable Communities</h3>
                                            <p className="text-gray-600 mt-1">We train local leaders to carry our mission forward within their own communities.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            {/* Right Column: Mission Image */}
                            <div className="relative rounded-2xl overflow-hidden min-h-[450px] flex items-center justify-center shadow-2xl">
                                <img src="https://res.cloudinary.com/dqwcr4y98/image/upload/v1756445431/Community_education_2_zplf4l.jpg" alt="Community health education" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                                <div className="absolute bottom-8 left-8 text-white">
                                    <h2 className="text-3xl font-bold">Our Impact in Action</h2>
                                    <p className="mt-2 max-w-sm">See how our mission translates into real-world change for communities.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Impact & Ambitious Goals Section */}
                <section className="py-10 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">Our Ambitious Goals</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {goalStats.map(goal => (
                                <AnimatedCounter
                                    key={goal.id}
                                    end={goal.count}
                                    label={goal.label}
                                    suffix={goal.suffix || ''}
                                    prefix={goal.prefix || ''}
                                    formatAsLakh={goal.formatAsLakh}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Focus Areas Section */}
                <section className="py-10 bg-gray-50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Our Focus Areas</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-gray-600">
                            We work across multiple domains to ensure comprehensive support for menstrual health and hygiene.
                        </p>
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                            <div className="flex items-center bg-white p-8 rounded-xl shadow-md transition-transform hover:-translate-y-2 border border-gray-100">
                                <div className="inline-block p-3 bg-red-100 rounded-lg mb-4">
                                    <Icon name="heart" className="h-7 w-7 text-red-500" />
                                </div>
                                <div className='px-3'>
                                    <h3 className="text-xl font-bold">Health Education</h3>
                                    <p className="mt-2 text-gray-600">Comprehensive programs covering menstrual hygiene, puberty, and reproductive health.</p>
                                </div>
                            </div>
                            <div className="flex items-center bg-white p-8 rounded-xl shadow-md transition-transform hover:-translate-y-2 border border-gray-100">
                                <div className="inline-block p-3 bg-yellow-100 rounded-lg mb-4">
                                    <Icon name="users" className="h-7 w-7 text-yellow-500" />
                                </div>
                                <div className='px-3'>
                                    <h3 className="text-xl font-bold">Community Engagement</h3>
                                    <p className="mt-2 text-gray-600">Working with families and schools to create supportive environments for girls.</p>
                                </div>
                            </div>
                            <div className="flex items-center bg-white p-8 rounded-xl shadow-md transition-transform hover:-translate-y-2 border border-gray-100">
                                <div className="inline-block p-3 bg-orange-100 rounded-lg mb-4">
                                    <Icon name="bookOpen" className="h-7 w-7 text-orange-500" />
                                </div>
                                <div className='px-3'>
                                    <h3 className="text-xl font-bold">Sustainable Impact</h3>
                                    <p className="mt-2 text-gray-600">Building long-term solutions through advocacy, research, and ongoing support systems.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Be Part of the Solution Section */}
                <section className="bg-gradient-to-r from-rose-800 to-red-600 text-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold">Be Part of the Solution</h2>
                        <p className="mt-4 max-w-2xl mx-auto">
                            Join us in our mission to create a world where every girl has access to proper menstrual health education and resources. Together, we can realize our vision.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                            <a href="#" className="bg-white text-rose-700 font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center w-full sm:w-auto justify-center">
                                <Icon name="heart" className="h-5 w-5 mr-2" />
                                Support Our Mission
                            </a>
                            <a href="#" className="bg-transparent border-2 border-white text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-white hover:text-rose-700 transition-colors flex items-center w-full sm:w-auto justify-center">
                                <Icon name="users" className="h-5 w-5 mr-2" />
                                Meet Our Team
                            </a>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
