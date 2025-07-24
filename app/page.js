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
        home: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
        chevronDown: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="6 9 12 15 18 9"></polyline></svg>,
        heart: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>,
        users: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
        school: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m4 6 8-4 8 4" /><path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2" /><path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4" /><path d="M18 5v17" /><path d="M6 5v17" /><circle cx="12" cy="9" r="2" /></svg>,
        clipboard: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>,
        userCheck: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>,
        mapPin: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
        checkCircle: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-1"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>,
        menu: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>,
        x: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>,
        instagram: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>,
        youtube: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 11.75a29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>,
        linkedin: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>,
        target: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>,
        eye: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>,
        rupee: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 3h12" /><path d="M6 8h12" /><path d="M6 13h12" /><path d="M6 18h12" /><path d="M8.67 21a4 4 0 0 0 7.46 0" /><path d="M8 3v18" /></svg>,
        fileText: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
    };
    return icons[name] || null;
};

// Animated Counter Component
const ImpactCounter = ({ end, suffix = '' }) => {
    const [ref, inView] = useInView({ threshold: 0.1 });
    const count = useCountUp(end, 2000, inView);
    return <span ref={ref}>{count}{suffix}+</span>;
};


// Main App Component
export default function App() {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [showOtherInitiatives, setShowOtherInitiatives] = useState(false);

    const heroImages = [
        "https://placehold.co/1920x1080/374151/FFFFFF?text=Empowering+Girls",
        "https://placehold.co/1920x1080/4B5563/FFFFFF?text=Health+Education",
        "https://placehold.co/1920x1080/52525B/FFFFFF?text=Community+Support",
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroImages.length);
        }, 5000); // Change slide every 5 seconds
        return () => clearInterval(timer);
    }, [heroImages.length]);

    const impactStats = [
        { icon: 'users', count: 1000, label: 'Girls Served' },
        { icon: 'school', count: 5, label: 'Schools Adopted' },
        { icon: 'clipboard', count: 12, label: 'Advisory Board' },
        { icon: 'users', count: 10, label: 'Mentors Forum' },
        { icon: 'userCheck', count: 25, label: 'Volunteers' },
        { icon: 'mapPin', count: 3, label: 'Footprint States' },
    ];

    const navLinks = [
        { label: 'Home', href: '#', icon: 'home' },
        {
            label: 'About Us', href: '#', icon: 'users', dropdown: [
                { label: 'Mission', href: '#', icon: 'target' },
                { label: 'Vision', href: '#', icon: 'eye' },
                { label: 'Core Team', href: '#', icon: 'users' },
                { label: 'Advisory Board', href: '#', icon: 'clipboard' },
                { label: 'Mentorship Forums', href: '#', icon: 'users' },
            ]
        },
        {
            label: 'Get Involved', href: '#', icon: 'heart', dropdown: [
                { label: 'Donate', href: '#', icon: 'rupee' },
                { label: 'Volunteer', href: '#', icon: 'userCheck' },
                { label: 'Collaborate', href: '#', icon: 'heart' },
            ]
        },
        {
            label: 'Impact Stories', href: '#', icon: 'heart', dropdown: [
                { label: 'Impact Stories', href: '#', icon: 'heart' },
                { label: 'Annual Reports', href: '#', icon: 'fileText' },
            ]
        },
        { label: 'Gallery', href: '#', icon: 'home' },
    ];

    const otherInitiatives = [
        {
            imgSrc: "https://placehold.co/150x150/E5E7EB/4B5563?text=Elderly",
            title: "Elderly Women Support",
            description: "Providing health check-ups, nutritional support, and companionship to elderly women in underserved communities.",
        },
        {
            imgSrc: "https://placehold.co/150x150/FFE4E6/DC2626?text=Girl",
            title: "Underprivileged Girl Child Education",
            description: "Sponsoring the education of girls from low-income families, ensuring they have the tools to build a brighter future.",
        },
        {
            imgSrc: "https://placehold.co/150x150/DBEAFE/3B82F6?text=COVID",
            title: "COVID-19 Relief",
            description: "Distributing essential food supplies, hygiene kits, and medical aid to communities affected by the pandemic.",
        },
    ];

    return (
        <div className="bg-white font-sans">
            {/* Header */}


            <main>
                {/* Hero Section */}
                <section className="relative py-24 md:py-32 lg:py-40 bg-gray-800 text-white text-center overflow-hidden h-[60vh] md:h-[70vh]">
                    {heroImages.map((src, index) => (
                        <div
                            key={src}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                            style={{ transitionDelay: index === currentSlide ? '0s' : '1s' }}
                        >
                            <img src={src} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50"></div>
                        </div>
                    ))}
                    <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">Breaking the Silence on Menstrual Health</h1>
                        <p className="mt-4 text-lg md:text-xl text-gray-300">Creating Safe Spaces for Open Dialogue</p>
                        <p className="mt-6 max-w-3xl mx-auto text-gray-400">
                            Fostering conversations around menstruation and eliminating the stigma that holds girls back.
                        </p>
                    </div>
                </section>

                {/* Impact in Numbers Section */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Our Impact in Numbers</h2>
                            <p className="mt-4 max-w-2xl mx-auto text-gray-600">
                                Every number here represents a life changed, a barrier broken, and a future made brighter through our menstrual health awareness initiatives.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                            {impactStats.map((stat) => (
                                <div key={stat.label} className="bg-white p-6 rounded-xl shadow-md text-center transition-transform hover:-translate-y-2">
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
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Breaking Barriers Through </h2><span className="text-3xl md:text-4xl font-bold text-rose-800">Health Education</span>
                                <p className="mt-4 text-gray-600">
                                    We empower girls and women across Telangana, Andhra Pradesh and beyond, with comprehensive menstrual health education and ongoing support to ensure dignity and health for all.
                                </p>
                                <ul className="mt-6 space-y-3 text-gray-600">
                                    <li className="flex items-start"><Icon name="checkCircle" className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" /> Awareness sessions</li>
                                    <li className="flex items-start"><Icon name="checkCircle" className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" /> Distribution of hygiene kits and supplies</li>
                                    <li className="flex items-start"><Icon name="checkCircle" className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" /> Training for community health workers</li>
                                </ul>r-80
                                <p className="mt-6 text-gray-500 italic">Here is an Opportunity to join hands and contribute in our mission to bring an impact in the society. As our Indian Culture always taught us "Vasudhaiva Kutumbakam".</p>
                                <div className="mt-6 flex flex-wrap gap-2">
                                    <span className="text-xs font-semibold border-transparent hover:bg-primary/80 bg-slate-200 text-slate-800 px-3 py-1 rounded-full">80G</span>
                                    <span className="text-xs font-semibold border-transparent hover:bg-primary/80 bg-slate-200 text-slate-800 px-3 py-1 rounded-full">12A</span>
                                    <span className="text-xs font-semibold border-transparent hover:bg-primary/80 bg-slate-200 text-slate-800 px-3 py-1 rounded-full">FCRA Registered</span>
                                    <span className="text-xs font-semibold border-transparent hover:bg-primary/80 bg-slate-200 text-slate-800 px-3 py-1 rounded-full">CSR-1 Registered</span>
                                    <span className="text-xs font-semibold border-transparent hover:bg-primary/80 bg-slate-200 text-slate-800 px-3 py-1 rounded-full">ISO Certified</span>
                                </div>
                                <div className="mt-8 flex flex-wrap gap-4">
                                    <Link href={"/mission"}>
                                        <button className="bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors">Learn More</button>
                                    </Link>
                                    <Link href={"/donate"}>
                                        <button className="bg-red-100 text-red-600 font-semibold px-6 py-3 rounded-lg hover:bg-red-200 transition-colors">Support Us</button>
                                    </Link>
                                </div>
                            </div>
                            <div className="relative">
                                <img src="https://placehold.co/600x400/FFE4E6/DC2626?text=Girls+learning" alt="Girls learning about health" className="rounded-xl shadow-lg w-full" />
                                <button className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-md text-red-500 hover:text-red-600 transition-colors">
                                    <Icon name="heart" className="h-6 w-6" />
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
                                <img src="https://placehold.co/600x400/E5E7EB/4B5563?text=Hygiene+Products" alt="Menstrual hygiene products and educational materials" className="rounded-xl shadow-lg w-full" />
                            </div>
                            <div className="text-center md:text-left">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Primary Focus: Menstrual Health & Hygiene</h2>
                                <p className="mt-4 text-gray-600">
                                    Our core mission is to dismantle the barriers of stigma and ignorance surrounding menstruation. We believe every girl has the right to understand her body, manage her period with dignity, and pursue her dreams without interruption. Our awareness programs provide medically accurate information about the menstrual cycle, breaking down complex biological processes into easy-to-understand concepts. We actively debunk common myths, replacing harmful myths and replacing them with facts.
                                </p>
                                <p className="mt-4 text-gray-600">
                                    Beyond education, we address "period-poverty" by distributing essential hygiene kits to girls in need. This immediate and tangible support ensures that girls don't have to miss school or compromise their health due to a lack of resources. Our initiative is a holistic approach, combining education with practical support, promoting health, and empowering a generation of girls to reach their full potential, unhindered by their biological cycle.
                                </p>
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
                                                <img src={initiative.imgSrc} alt={initiative.title} className="h-40 w-full mb-4 md:mb-0 md:mr-6 rounded-lg object-cover flex-shrink-0" />
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
                        <p className="mt-4 max-w-2xl mx-auto">
                            Every girl deserves access to proper menstrual health education and supplies. Together, we can ensure that no girl is left behind because of her period.
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
