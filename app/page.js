"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// Reusable Icon Component
const Icon = ({ name, className }) => {
    const icons = {
    handshake: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16"><path fill="currentColor" d="M13 3a5.393 5.393 0 0 1-1.902 1.178c-.748.132-2.818-.828-3.838.152c-.17.17-.38.34-.6.51c-.48-.21-1.22-.53-1.76-.84S3 3 3 3L0 6.5s.74 1 1.2 1.66c.3.44.67 1.11.91 1.56l-.34.4a.876.876 0 0 0 .15 1a.833.833 0 0 0 1.002-.002a.62.62 0 0 0 .077.881a.994.994 0 0 0 1.006-.002a.806.806 0 0 0-.003 1.005a1.012 1.012 0 0 0 .892-.114a.822.822 0 0 0 .187.912a1.093 1.093 0 0 0 1.054-.092l.516-.467c.472.47 1.123.761 1.842.761l.061-.001a1.311 1.311 0 0 0 1.094-.791c.146.056.312.094.488.094c.236 0 .455-.068.64-.185c.585-.387.445-.687.445-.687a1.07 1.07 0 0 0 1.229-.279a.996.996 0 0 0 .138-1.215a.036.036 0 0 0 .021.005c.421 0 .787-.232.978-.574a1.564 1.564 0 0 0-.191-1.48l.003.005c.82-.16.79-.57 1.19-1.17a4.725 4.725 0 0 1 1.387-1.208zm-.05 7.06c-.44.44-.78.25-1.53-.32S9.18 8.1 9.18 8.1c.061.305.202.57.401.781c.319.359 1.269 1.179 1.719 1.599c.28.26 1 .78.58 1.18s-.75 0-1.44-.56s-2.23-1.94-2.23-1.94a.937.937 0 0 0 .27.72c.17.2 1.12 1.12 1.52 1.54s.75.67.41 1s-1.03-.19-1.41-.58c-.59-.57-1.76-1.63-1.76-1.63l-.001.053c0 .284.098.544.263.75c.288.378.848.868 1.188 1.248s.54.7 0 1s-1.34-.44-1.69-.8v-.002a.411.411 0 0 0-.1-.269a.896.896 0 0 0-.906-.188A.609.609 0 0 0 6 11.1a.754.754 0 0 0-.912.001a.61.61 0 0 0-.085-.95a1 1 0 0 0-1.174.08a.66.66 0 0 0-.068-.911a.996.996 0 0 0-1.186-.128L1.91 8.069c-.46-.73-1-1.49-1-1.49l2.28-2.77s.81.5 1.48.88c.33.19.9.44 1.33.64c-.68.51-1.25 1-1.08 1.34a1.834 1.834 0 0 0 2.087.036a2.41 2.41 0 0 1 1.343-.403c.347 0 .677.072.976.203c.554.374 1.574 1.294 2.504 1.874c1.17.85 1.4 1.4 1.12 1.68z"/></svg>,
        users: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
        school: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m4 6 8-4 8 4" /><path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2" /><path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4" /><path d="M18 5v17" /><path d="M6 5v17" /><circle cx="12" cy="9" r="2" /></svg>,
        clipboard: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>,
        userCheck: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>,
        mapPin: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
        checkCircle: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>,
    };
    return icons[name] || null;
};

// Custom hook for Intersection Observer
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
        if (ref.current) observer.observe(ref.current);
        return () => {
            if (ref.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(ref.current);
            }
        };
    }, [ref, options]);
    return [ref, isInView];
};

// Custom hook for counting animation
const useCountUp = (end, duration = 2000, startInView) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (startInView) {
            let frame = 0;
            const frameRate = 1000 / 60;
            const totalFrames = Math.round(duration / frameRate);
            const counter = setInterval(() => {
                frame++;
                const progress = frame / totalFrames;
                setCount(Math.round(end * progress));
                if (frame === totalFrames) {
                    clearInterval(counter);
                    setCount(end);
                }
            }, frameRate);
            return () => clearInterval(counter);
        }
    }, [end, duration, startInView]);
    return count;
};

// Animated Counter Component
const ImpactCounter = ({ end, suffix = '+' }) => {
    const [ref, inView] = useInView({ threshold: 0.1 });
    const count = useCountUp(end, 2000, inView);
    return <span ref={ref}>{count}{suffix}</span>;
};

// Main Homepage Component
export default function HomePage() {
    const [heroSlides, setHeroSlides] = useState([]);
    const [impactStats, setImpactStats] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loading, setLoading] = useState(true);
    const [showOtherInitiatives, setShowOtherInitiatives] = useState(false);

    // Fetch data from API routes
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [slidesRes, statsRes] = await Promise.all([
                    fetch('/api/hero-slides'),
                    fetch('/api/impact-stats')
                ]);
                const slidesData = await slidesRes.json() || [];
                const statsData = await statsRes.json() || [];
                setHeroSlides(slidesData);
                setImpactStats(statsData);
            } catch (error) {
                console.error("Failed to fetch homepage data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Hero slider interval
    useEffect(() => {
        if (heroSlides.length > 1) {
            const slideInterval = setInterval(() => {
                setCurrentSlide(prev => (prev + 1) % heroSlides.length);
            }, 5000);
            return () => clearInterval(slideInterval);
        }
    }, [heroSlides.length]);

    const otherInitiatives = [
        {
            imgSrc: "https://res.cloudinary.com/dqwcr4y98/image/upload/v1756446248/Mask-group-4_joicm0.png",
            title: "Elderly Women Support",
            description: "Providing health check-ups, nutritional support, and companionship to elderly women in underserved communities.",
        },
        {
            imgSrc: "https://res.cloudinary.com/dqwcr4y98/image/upload/v1756444114/Girl_education_hcbxzb.jpg",
            title: "Underprivileged Girl Child Education",
            description: "Sponsoring the education of girls from low-income families, ensuring they have the tools to build a brighter future.",
        },
        {
            imgSrc: "https://res.cloudinary.com/dqwcr4y98/image/upload/v1756444794/41c3f014-83e6-411f-a816-8d7f925db2d1_yc1osc.jpg",
            title: "COVID-19 Relief",
            description: "Distributing essential food supplies, hygiene kits, and medical aid to communities affected by the pandemic.",
        },
    ];

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="bg-white font-sans">
            <main>
                {/* Hero Section */}
                <section className="relative py-24 md:py-32 lg:py-40 bg-gray-800 text-white text-center overflow-hidden h-[60vh] md:h-[70vh] flex items-center justify-center">
                    {heroSlides.map((slide, index) => (
                        <div key={slide.id || index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                            <img src={slide.imgSrc} alt={slide.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50"></div>
                        </div>
                    ))}
                    <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                        {heroSlides.map((slide, index) => (
                            <div key={slide.id || index} className={`transition-opacity duration-1000 ease-in-out absolute inset-0 flex flex-col items-center justify-center ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">{slide.title}</h1>
                                <p className="mt-4 text-lg md:text-xl text-gray-300">{slide.subtitle}</p>
                                <p className="mt-6 max-w-3xl mx-auto text-gray-400">{slide.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Impact in Numbers Section */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Our Impact in Numbers</h2>
                            <p className="mt-4 max-w-2xl mx-auto text-gray-600">
                                Every number represents a life changed, a barrier broken, and a future made brighter.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                            {impactStats.map((stat) => (
                                <div key={stat.id} className="bg-white p-6 rounded-xl shadow-md text-center transition-transform hover:-translate-y-2">
                                    <div className="text-red-500 mb-3 mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-red-50">
                                        <Icon name={stat.icon} className="h-7 w-7" />
                                    </div>
                                    <p className="text-3xl font-bold text-gray-800"><ImpactCounter end={stat.count} /></p>
                                    <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                
                {/* Mission Section */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <p className="text-red-500 font-semibold mb-2">Our Mission</p>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Addressing the “Silent Problem” - Menstrual Awareness</h2>
                                <p className="mt-4 text-gray-600">
                                   We empower girls and women across India with comprehensive menstrual health & hygiene awareness as well as facilities and continuous ongoing support to ensure dignity and health for all. Our awareness sessions Also include myth breaker sessions for the male students as well as for the parents from underserved communities and Training through the health workers. Here is an opportunity to join hands and contribute in our mission to bring an impact in the society. As our Indian Culture always taught us “Nareenaam maatru roopatvam, devatvam maanu-she-shu cha”</p>
                                <ul className="mt-6 space-y-3 text-gray-600">
                                    <li className="flex items-start"><Icon name="checkCircle" className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" /> Awareness sessions</li>
                                    <li className="flex items-start"><Icon name="checkCircle" className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" /> Distribution of hygiene kits and supplies</li>
                                    <li className="flex items-start"><Icon name="checkCircle" className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" /> Training for community health workers</li>
                                </ul>
                                <p className="mt-6 text-gray-500 italic">Here is an Opportunity to join hands and contribute in our mission to bring an impact in the society. As our Indian Culture always taught us "Vasudhaiva Kutumbakam".</p>
                                <div className="mt-6 flex flex-wrap gap-2">
                                    <span className="text-xs font-semibold border-transparent hover:bg-primary/80 bg-slate-200 text-slate-800 px-3 py-1 rounded-full">80G</span>
                                    <span className="text-xs font-semibold border-transparent hover:bg-primary/80 bg-slate-200 text-slate-800 px-3 py-1 rounded-full">12A</span>
                                    <span className="text-xs font-semibold border-transparent hover:bg-primary/80 bg-slate-200 text-slate-800 px-3 py-1 rounded-full">FCRA Registered</span>
                                    <span className="text-xs font-semibold border-transparent hover:bg-primary/80 bg-slate-200 text-slate-800 px-3 py-1 rounded-full">CSR-1 Registered</span>
                                    <span className="text-xs font-semibold border-transparent hover:bg-primary/80 bg-slate-200 text-slate-800 px-3 py-1 rounded-full">ISO Certified</span>
                                </div>
                                <div className="mt-8 flex flex-wrap gap-4">
                                    <Link href={"/vision-and-mission"}>
                                        <button className="bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors">Learn More</button>
                                    </Link>
                                    <Link href={"/donate"}>
                                        <button className="bg-red-100 text-red-600 font-semibold px-6 py-3 rounded-lg hover:bg-red-200 transition-colors">Support Us</button>
                                    </Link>
                                </div>
                            </div>
                            <div className="relative">
                                <img src="https://res.cloudinary.com/dqwcr4y98/image/upload/v1756443818/Girls_Learning_Final_ko2b3k.jpg" alt="Girls learning about health" className="rounded-xl shadow-lg w-full" />
                                <button className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-md text-red-500 hover:text-red-600 transition-colors">
                                    <Icon name="handshake" className="h-6 w-6" />
                                </button>
                                <div className="absolute bottom-4 left-4 bg-white p-3 rounded-full shadow-md text-gray-600">
                                    <Icon name="users" className="h-6 w-6" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Primary Focus Section */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <img src="https://res.cloudinary.com/dqwcr4y98/image/upload/v1756444724/c172ca99-ea4c-484e-b553-68242c6d836e_gufiof.jpg" alt="Menstrual hygiene products and educational materials" className="rounded-xl shadow-lg w-full" />
                            </div>
                            <div className="text-center md:text-left">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Menstrual Health & Hygiene</h2>
                                <p className="mt-4 text-gray-600"> Our core mission is to dismantle the barriers of stigma and ignorance surrounding menstruation. We believe every girl has the right to understand her body, manage her period with dignity, and pursue her dreams without interruption. We dismantle myths with facts. We are empowered with pads, privacy, incinerators, and compassion—so no girl misses her dreams because of her biology                                </p>
                                <div className="mt-8 flex justify-center md:justify-start">
                                    <button
                                        onClick={() => setShowOtherInitiatives(!showOtherInitiatives)}
                                        className="bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors"
                                    >
                                        {showOtherInitiatives ? 'Hide Other Programs' : 'Explore Other Programs'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${showOtherInitiatives ? 'max-h-screen mt-20 opacity-100' : 'max-h-0 mt-0 opacity-0'}`}>
                            <div className="text-center">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Our Other Initiatives</h2>
                                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {otherInitiatives.map((initiative) => (
                                        <div key={initiative.title} className="bg-white p-6 rounded-xl shadow-md transition-transform hover:-translate-y-2 flex flex-col items-center text-center md:flex-row md:text-left md:items-start">
                                            <div className='text-center'>
                                                <h3 className="text-xl font-bold text-gray-800">{initiative.title}</h3>
                                                <img src={initiative.imgSrc} alt={initiative.title} className="min-h-70 w-full mb-4 md:mb-0 md:mr-6 rounded-lg object-cover flex-shrink-0" />
                                                <p className="mt-2 text-gray-600 text-md">{initiative.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Join Our Movement Section */}
                <section className="bg-slate-800 text-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold">Join Our Movement</h2>
                        <p className="mt-4 max-w-2xl mx-auto"> Join us—volunteer, donate, collaborate—to build a future where period poverty is a thing of the past.
                        </p>
                        <div className="mt-8">
                            <Link href={"/register"}>
                                <button className="bg-white text-red-500 font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition-colors m-5">
                                    Access Resources
                                </button>
                            </Link>
                            <Link href={"/donate"}>
                                <button className="bg-white text-red-500 font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition-colors m-5">
                                    Make a Donation
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}