"use client";
import React from 'react';

// Helper component for Icons using inline SVGs
const Icon = ({ name, className }) => {
    const icons = {
        userPlus: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="23" y1="11" x2="23" y2="17" /><line x1="20" y1="14" x2="26" y2="14" /></svg>,
        checkCircle: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>,
        bookOpen: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>,
        users: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
        heart: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>,
        award: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 17 17 23 15.79 13.88"></polyline></svg>,
        globe: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>,
    };
    return icons[name] || null;
};

const CertificationCard = ({ icon, title, description }) => (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
        <div className="inline-flex items-center justify-center text-orange-500 rounded-full h-16 w-16 mb-4">
            <Icon name={icon} className="h-12 w-12" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mt-2">{title}</h3>
        <p className="text-gray-600 mt-1">{description}</p>
    </div>
);

// Main Page Component
export default function JoinCommunityPage() {

    const certifications = [
        { icon: 'award', title: "FCRA Certified", description: "Foreign Contribution Regulation Act" },
        { icon: 'checkCircle', title: "ISO Certified", description: "International Standards" },
        { icon: 'globe', title: "NRI Support", description: "Global Community" },
        { icon: 'heart', title: "5000+ Lives", description: "Impacted & Empowered" }
    ];

    return (
        <div className="bg-white font-sans">
            <main>
                {/* Join Our Community Section */}
                <section className="py-20 text-center bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="inline-block p-4 bg-orange-100 rounded-full mb-6 shadow-sm">
                            <Icon name="userPlus" className="h-10 w-10 text-orange-500" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Register Your School</h1>
                        <p className="mt-4 max-w-3xl mx-auto text-gray-600 text-lg">
                            Register to access our comprehensive menstrual health curriculum, resources, and join thousands of educators and advocates making a difference.
                        </p>
                    </div>
                </section>

                {/* Form and Info Section */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-12 items-start">
                            {/* Create Your Account Form */}
                            {/* <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl border border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Your Account</h2>
                        <p className="text-gray-600 mb-8">Get access to exclusive educational resources and curriculum</p>
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                                <input type="text" id="fullName" placeholder="Enter your full name" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address (For login) *</label>
                                <input type="email" id="email" placeholder="You will be asked to log in with Google using this email." className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                            <div>
                                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number *</label>
                                <div className="flex">
                                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-100 text-gray-500">+91</span>
                                    <input type="tel" id="mobile" placeholder="Enter mobile number" className="w-full px-4 py-3 rounded-r-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">Organization/School</label>
                                <input type="text" id="organization" placeholder="Enter your organization or school name" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                <input type="text" id="address" placeholder="Enter your address" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                            <div className="text-center pt-2">
                                <button type="submit" className="w-full bg-orange-500 text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-orange-600 transition-colors">
                                    Join Our Community
                                </button>
                            </div>
                        </form>
                    </div> */}
                            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl border border-gray-200">
                                <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfFjeaxdnOh-8OTLKLV7VTRa9g7ixPxhoWIuuw_H7qsM_77Dw/viewform?embedded=true" width="640" height="700" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
                            </div>

                            {/* Why Join Us? Info */}
                            <div className="bg-gradient-to-br from-amber-400 to-orange-500 text-white p-8 md:p-10 rounded-2xl shadow-2xl">
                                <h2 className="text-3xl font-bold mb-6">Why Join Us?</h2>
                                <p className="mb-8">Become part of a growing community of educators, healthcare professionals, and advocates working to break menstrual health barriers.</p>
                                <ul className="space-y-6">
                                    <li className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <Icon name="bookOpen" className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg">Access to Curriculum</h4>
                                            <p className="text-orange-100">Get exclusive access to our comprehensive menstrual health education materials, training modules, and resources.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <Icon name="users" className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg">Community Support</h4>
                                            <p className="text-orange-100">Connect with like-minded individuals, share experiences, and learn from others working in menstrual health education.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <Icon name="checkCircle" className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg">Regular Updates</h4>
                                            <p className="text-orange-100">Stay informed about our latest programs, research findings, and opportunities to get involved.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Trusted & Certified Section */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Trusted & Certified</h2>
                            <p className="mt-4 max-w-2xl mx-auto text-gray-600">
                                Join a certified organization with global support and recognition.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {certifications.map((cert) => (
                                <CertificationCard key={cert.title} {...cert} />
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
