"use client";
import Link from 'next/link';
import React from 'react';

// Helper component for Icons using inline SVGs
const Icon = ({ name, className }) => {
    const icons = {
        heart: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>,
        instagram: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>,
        youtube: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 11.75a29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>,
        linkedin: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>,
    };
    return icons[name] || null;
};

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* About */}
                    <div className="md:col-span-2 lg:col-span-1">
                        <Link href="#" className="flex items-center space-x-2 mb-4">
                            <img src="/logo.png" alt="Tejo Surya Foundation Logo" className="h-10 w-10 rounded-full" />
                            <span className="text-sm font-bold text-white"><span className='text-xl font-bold'>TEJO SURYA</span><br /><span className='text-xs font-medium'>Charitable Foundation</span></span>
                        </Link>
                        <p className="text-gray-400 text-sm">Dedicated to promoting menstrual health and hygiene awareness across communities, empowering girls and women to lead a healthier future through education and support.</p>
                        <div className="flex space-x-4 mt-6">
                            <a href="https://www.instagram.com/tejosuryafoundation/" target='_blank' className="text-gray-400 hover:text-white"><Icon name="instagram" className="h-6 w-6" /></a>
                            <a href="https://www.youtube.com/@TejoSuryaFoundation?themeRefresh=1" target='_blank' className="text-gray-400 hover:text-white"><Icon name="youtube" className="h-6 w-6" /></a>
                            <a href="https://www.linkedin.com/company/tejo-surya-charitable-foundation/" target="_blank" className="text-gray-400 hover:text-white"><Icon name="linkedin" className="h-6 w-6" /></a>
                        </div>
                    </div>
                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/mission-and-vision" className="text-gray-400 hover:text-white">Mission And Vision</Link></li>
                            <li><Link href="/our-team" className="text-gray-400 hover:text-white">Our Team</Link></li>
                            <li><Link href="/impact-stories" className="text-gray-400 hover:text-white">Impact Stories</Link></li>
                            <li><Link href="/annual-reports" className="text-gray-400 hover:text-white">Annual Reports</Link></li>
                            <li><Link href="/gallery" className="text-gray-400 hover:text-white">Gallery</Link></li>
                            <li><Link href="/register" className="text-gray-400 hover:text-white">Register Your School</Link></li>
                        </ul>
                    </div>
                    {/* Get Involved */}
                    <div>
                        <h3 className="font-bold text-white mb-4">Get Involved</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/volunteer" className="text-gray-400 hover:text-white">Volunteer</Link></li>
                            <li><Link href="/donate" className="text-gray-400 hover:text-white">Donate</Link></li>
                            <li><Link href="/collaborate" className="text-gray-400 hover:text-white">Collaborate</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-700 pt-8 text-center text-sm text-gray-500">
                    <p>&copy; 2021–2025 Tejo Surya Charitable Foundation. All rights reserved.</p>
                    <button className="bg-orange-600 text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-orange-700 transition-colors m-4">
                        Support Our Mission
                    </button>
                </div>
            </div>

        </footer>
    );
}
