"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// Helper component for Icons using inline SVGs
const Icon = ({ name, className }) => {
    const icons = {
        heart: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>,
        globe: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>,
        info: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>,
    };
    return icons[name] || null;
};

const DonationImpactCard = ({ amount, title, description }) => (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
        <p className="text-3xl font-bold text-gray-800">₹{amount.toLocaleString('en-IN')}</p>
        <h3 className="text-xl font-semibold text-gray-800 mt-4">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
    </div>
);

const NriSupportCard = ({ country, icon, description }) => (
    <div className="bg-white/20 backdrop-blur-sm p-8 rounded-2xl text-center text-white border border-white/30">
        <Icon name={icon} className="h-16 w-24 rounded-md mx-auto mb-4 object-cover" />
        <h3 className="text-2xl font-bold">{country}</h3>
        <p className="mt-2">{description}</p>
    </div>
);

// Main Page Component
export default function SupportPage() {
    // Ref for scrolling to the form

    // State for all form fields
    const [selectedAmount, setSelectedAmount] = useState(80000);
    const [customAmount, setCustomAmount] = useState("");
    const [sponsorPlate, setSponsorPlate] = useState(true);
    const [citizenship, setCitizenship] = useState('indian');
    const [donationType, setDonationType] = useState('once');
    const [donor, setDonor] = useState({
        title: 'Mr',
        fullName: '',
        birthdate: '',
        email: '',
        whatsapp: '',
        alternateMobile: ''
    });
    const [wants80G, setWants80G] = useState(false);
    const [captcha, setCaptcha] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [loading, setLoading] = useState(false);

    const currencySymbol = citizenship === 'indian' ? '₹' : '$';
    const currencyCode = citizenship === 'indian' ? 'INR' : 'USD';

    // Effect to dynamically load Razorpay script
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    // Effect to show/hide floating button on scroll
    

    // Reset donation type if citizenship changes to foreign
    useEffect(() => {
        if (citizenship === 'foreign') {
            setDonationType('once');
        }
    }, [citizenship]);

    const handleDonorChange = (e) => {
        setDonor({ ...donor, [e.target.name]: e.target.value });
    };

    const handleDonate = async (e) => {
        e.preventDefault();

        if (!agreedToTerms) {
            alert("Please agree to the Privacy Policy and Terms & Conditions.");
            return;
        }

        setLoading(true);

        let amountToDonate = selectedAmount === 'other' ? parseFloat(customAmount) : selectedAmount;
        if (sponsorPlate) {
            amountToDonate += 125;
        }

        if (!amountToDonate || amountToDonate <= 0) {
            alert("Please enter a valid donation amount.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/razorpay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: amountToDonate,
                    type: donationType,
                    currency: currencyCode, // Send the correct currency
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Failed to create payment order/subscription.");
            }

            const data = await response.json();

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: data.amount,
                currency: data.currency,
                name: "TEJO SURYA Charitable Foundation",
                description: donationType === 'once' ? "One-Time Donation" : "Monthly Donation Setup",
                ...(donationType === 'once' ? { order_id: data.id } : { subscription_id: data.subscription_id }),
                handler: function (response) {
                    alert(`Payment successful! ID: ${response.razorpay_payment_id}`);
                },
                prefill: {
                    name: donor.fullName,
                    email: donor.email,
                    contact: donor.whatsapp,
                },
                theme: {
                    color: "#007BFF",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error("Donation failed:", error);
            alert(`Donation process failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const donationAmounts = [80000, 75000, 70000, 65000, 60000, 55000, 50000, 45000, 40000, 30000, 25000, 20000, 15000, 12000, 7500, 3000];
    const impactLevels = [
        { amount: 500, title: "Provides hygiene kits for 2 girls", description: "Essential supplies for one month" },
        { amount: 1500, title: "Sponsors health education session", description: "Reaches 50+ students in a school" },
        { amount: 5000, title: "Supports a full program", description: "Complete 3-month program for one school" }
    ];
    const nriSupport = [
        { country: "USA", icon: "usa", description: "Supporting 50+ girls monthly" },
        { country: "UK", icon: "uk", description: "Funding education programs" },
        { country: "Australia", icon: "australia", description: "Sponsoring hygiene kits" }
    ];



    return (
        <div className="bg-white font-sans">
            <main>
                {/* Support Our Mission Section */}
                <section className="py-20 text-center bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="inline-block p-4 bg-orange-100 rounded-full mb-6 shadow-sm">
                            <Icon name="heart" className="h-10 w-10 text-orange-500" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Support Our Mission</h1>
                        <p className="mt-4 max-w-3xl mx-auto text-gray-600 text-lg">
                            Your donation helps us reach more girls with essential menstrual health education and hygiene supplies. Every contribution makes a difference.
                        </p>
                    </div>
                </section>

                {/* Your Impact Section */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Your Impact</h2>
                            <p className="mt-4 max-w-2xl mx-auto text-gray-600">
                                See how your donation directly helps girls in need across South India.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {impactLevels.map((level) => (
                                <DonationImpactCard key={level.amount} {...level} />
                            ))}
                        </div>
                    </div>
                    
                </section>

                {/* Make a Donation Section */}
                <section id='donate-form' className="py-20 bg-amber-50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-200">
                            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Transform the lives of children</h2>

                            <form className="space-y-8" onSubmit={handleDonate}>
                                {/* Donation Amount */}
                                <div>
                                    <p className="text-gray-700 mb-4 font-medium">I wish to donate {currencySymbol} to feed child(ren) for one academic year.</p>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        {donationAmounts.map(amount => (
                                            <label key={amount} className="flex items-center space-x-2 text-gray-600 cursor-pointer">
                                                <input type="radio" name="donationAmount" value={amount} checked={selectedAmount === amount} onChange={() => setSelectedAmount(amount)} className="form-radio text-blue-600" />
                                                <span>{currencySymbol}{amount.toLocaleString('en-IN')}</span>
                                            </label>
                                        ))}
                                        <label className="flex items-center space-x-2 text-gray-600 cursor-pointer">
                                            <input type="radio" name="donationAmount" value="other" checked={selectedAmount === 'other'} onChange={() => setSelectedAmount('other')} className="form-radio text-blue-600" />
                                            <span>Other Amount</span>
                                        </label>
                                        <input type="number" placeholder="Amount" value={customAmount} onChange={(e) => setCustomAmount(e.target.value)} onFocus={() => setSelectedAmount('other')} className="w-full col-span-2 sm:col-span-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                </div>

                                {/* Sponsor Plate */}
                                <div className="border-t border-gray-200 pt-6">
                                    <label className="flex items-center text-gray-700">
                                        <input type="checkbox" checked={sponsorPlate} onChange={() => setSponsorPlate(!sponsorPlate)} className="form-checkbox text-blue-600 h-5 w-5" />
                                        <span className="ml-3">I would also like to sponsor a steel meal plate and tumbler worth <span className="font-bold">{currencySymbol}125</span> for <span className="font-bold">1</span> plate(s) and <span className="font-bold">1</span> tumbler(s)</span>
                                    </label>
                                    <p className="text-sm text-gray-500 ml-8">(You can uncheck if you wish.)</p>
                                </div>

                                {/* Citizenship */}
                                <div className="border-t border-gray-200 pt-6">
                                    <h3 className="font-semibold text-gray-800 mb-4">Select your citizenship</h3>
                                    <div className="flex items-center gap-8">
                                        <label className="flex items-center space-x-2 text-gray-600 cursor-pointer">
                                            <input type="radio" name="citizenship" value="indian" checked={citizenship === 'indian'} onChange={() => setCitizenship('indian')} className="form-radio text-blue-600" />
                                            <span>Indian Citizen</span>
                                            <Icon name="info" className="h-4 w-4 text-gray-400" />
                                        </label>
                                        <label className="flex items-center space-x-2 text-gray-600 cursor-pointer">
                                            <input type="radio" name="citizenship" value="foreign" checked={citizenship === 'foreign'} onChange={() => setCitizenship('foreign')} className="form-radio text-blue-600" />
                                            <span>Foreign National</span>
                                            <Icon name="info" className="h-4 w-4 text-gray-400" />
                                        </label>
                                    </div>
                                </div>

                                {/* **FIX**: Conditionally render the Donation Type section */}
                                {citizenship === 'indian' && (
                                    <div className="border-t border-gray-200 pt-6">
                                        <h3 className="font-semibold text-gray-800 mb-4">Select donation type</h3>
                                        <div className="flex items-center gap-8">
                                            <label className="flex items-center space-x-2 text-gray-600 cursor-pointer">
                                                <input type="radio" name="donationType" value="once" checked={donationType === 'once'} onChange={() => setDonationType('once')} className="form-radio text-blue-600" />
                                                <span>Donate Once</span>
                                                <Icon name="info" className="h-4 w-4 text-gray-400" />
                                            </label>
                                            <label className="flex items-center space-x-2 text-gray-600 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="donationType"
                                                    value="monthly"
                                                    checked={donationType === 'monthly'}
                                                    onChange={() => setDonationType('monthly')}
                                                    className="form-radio text-blue-600"
                                                />
                                                <span>Donate Monthly</span>
                                                <Icon name="info" className="h-4 w-4 text-gray-400" />
                                            </label>
                                        </div>
                                    </div>
                                )}

                                {/* Donor Details */}
                                <div className="border-t border-gray-200 pt-6">
                                    <h3 className="font-semibold text-gray-800 mb-4">Donor Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex gap-2">
                                            <select name="title" value={donor.title} onChange={handleDonorChange} className="px-4 py-3 rounded-lg border border-gray-300 bg-gray-50">
                                                <option>Mr</option>
                                                <option>Mrs</option>
                                                <option>Ms</option>
                                            </select>
                                            <input type="text" name="fullName" placeholder="Full Name*" value={donor.fullName} onChange={handleDonorChange} required className="w-full px-4 py-3 rounded-lg border border-gray-300" />
                                        </div>
                                        <input type="email" name="email" placeholder="Email*" value={donor.email} onChange={handleDonorChange} required className="w-full px-4 py-3 rounded-lg border border-gray-300" />
                                        <input type="text" name="birthdate" placeholder="Birthdate dd-mm-yyyy" value={donor.birthdate} onChange={handleDonorChange} className="w-full px-4 py-3 rounded-lg border border-gray-300" />
                                        <div></div>
                                        <input type="tel" name="whatsapp" placeholder="Whatsapp number*" value={donor.whatsapp} onChange={handleDonorChange} required className="w-full px-4 py-3 rounded-lg border border-gray-300" />
                                        <input type="tel" name="alternateMobile" placeholder="Alternate Mobile Number" value={donor.alternateMobile} onChange={handleDonorChange} className="w-full px-4 py-3 rounded-lg border border-gray-300" />
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">Please share your WhatsApp number for donation updates and receipts.</p>
                                </div>

                                {/* 80G Certificate */}
                                {citizenship === 'indian' && (
                                    <div className="border-t border-gray-200 pt-6">
                                        <label className="flex items-center text-gray-700">
                                            <input type="checkbox" checked={wants80G} onChange={() => setWants80G(!wants80G)} className="form-checkbox text-blue-600 h-5 w-5" />
                                            <span className="ml-3">I would like to receive 80(G) Certificate</span>
                                        </label>
                                    </div>
                                )}

                                {/* Captcha */}
                                <div className="border-t border-gray-200 pt-6">
                                    <h3 className="font-semibold text-gray-800 mb-4">Captcha</h3>
                                    <div className="flex items-center gap-4">
                                        <input type="text" readOnly value="1" className="w-16 px-2 py-2 text-center rounded-lg border border-gray-300 bg-gray-100" />
                                        <span>+</span>
                                        <input type="text" readOnly value="5" className="w-16 px-2 py-2 text-center rounded-lg border border-gray-300 bg-gray-100" />
                                        <span>=</span>
                                        <input type="number" value={captcha} onChange={(e) => setCaptcha(e.target.value)} className="w-24 px-4 py-2 rounded-lg border border-gray-300" />
                                    </div>
                                </div>

                                {/* Terms and Conditions */}
                                <div className="border-t border-gray-200 pt-6">
                                    <label className="flex items-center text-gray-700">
                                        <input type="checkbox" checked={agreedToTerms} onChange={() => setAgreedToTerms(!agreedToTerms)} className="form-checkbox text-blue-600 h-5 w-5" />
                                        <span className="ml-3">I have read through the website's <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> & <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a> to make a donation.</span>
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <div className="text-center pt-4">
                                    <button type="submit" disabled={loading} className="bg-blue-600 text-white font-bold px-12 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors w-full sm:w-auto disabled:bg-blue-400">
                                        {loading ? 'Processing...' : 'Donate'}
                                    </button>
                                    {citizenship === 'indian' && (
                                        <p className="text-sm text-gray-500 mt-2">Avail tax exemption under Section 80G</p>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </section>

                {/* Support from NRIs Section */}
                <section className="py-20 bg-gradient-to-r from-orange-600 to-yellow-600">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Support from NRIs <Icon name="globe" className="inline-block h-8 w-8 ml-2" /></h2>
                        <p className="mt-2 max-w-3xl mx-auto text-white/90">
                            Non-Resident Indians around the world are joining our mission to empower girls back home. Your contribution, no matter where you are, makes a real difference!
                        </p>
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                            {nriSupport.map((support) => (
                                <NriSupportCard key={support.country} {...support} />
                            ))}
                        </div>
                    </div>
                </section>
            </main>


        </div>
    );
}
