"use client";
import React, { useState } from 'react';
import Script from 'next/script'; // Import next/script

// Helper component for Icons using inline SVGs
const Icon = ({ name, className }) => {
    // ... (your existing Icon component code)
  const icons = {
    heart: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>,
    globe: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>,
    usa: <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 7410 3900"><path fill="#b22234" d="M0 0h7410v3900H0z"/><path d="M0 0h7410v300H0zm0 600h7410v300H0zm0 600h7410v300H0zm0 600h7410v300H0zm0 600h7410v300H0zm0 600h7410v300H0zm0 600h7410v300H0z" fill="#fff"/><path fill="#3c3b6e" d="M0 0h2964v2100H0z"/></svg>,
    uk: <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 60 30"><clipPath id="a"><path d="M0 0v30h60V0z"/></clipPath><clipPath id="b"><path d="M30 15h30v15zv-15h30zH30z"/></clipPath><g clip-path="url(#a)"><path d="M0 0v30h60V0z" fill="#012169"/><path d="M0 0L60 30m0-30L0 30" stroke="#fff" strokeWidth="6"/><path d="M0 0L60 30m0-30L0 30" clipPath="url(#b)" stroke="#C8102E" strokeWidth="4"/><path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10"/><path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6"/></g></svg>,
    australia: <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 12 6"><path fill="#002b7f" d="M0 0h12v6H0z"/><path d="M0 0L6 3m0-3L0 3" stroke="#fff" strokeWidth="1.2"/><path d="M3 0v3H0v-.6L6 3l-.6-3h.6V0H3zm0 3v-3h3v3H3z" fill="#e4002b"/><path d="M2.4 1.5L0 3l.6 1.5L3 3 2.4 1.5zM0 0l2.4 1.5L0 3V0zm3 .6L.6 3 3 1.5V.6z" stroke="#fff" strokeWidth=".6"/></svg>,
    info: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>,
  };
  return icons[name] || null;
};

const DonationImpactCard = ({ amount, title, description }) => (
  // ... (your existing DonationImpactCard component code)
  <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
    <p className="text-3xl font-bold text-gray-800">₹{amount.toLocaleString('en-IN')}</p>
    <h3 className="text-xl font-semibold text-gray-800 mt-4">{title}</h3>
    <p className="text-gray-600 mt-2">{description}</p>
  </div>
);

const NriSupportCard = ({ country, icon, description }) => (
  // ... (your existing NriSupportCard component code)
  <div className="bg-white/20 backdrop-blur-sm p-8 rounded-2xl text-center text-white border border-white/30">
    <Icon name={icon} className="h-16 w-24 rounded-md mx-auto mb-4 object-cover" />
    <h3 className="text-2xl font-bold">{country}</h3>
    <p className="mt-2">{description}</p>
  </div>
);

// Main Page Component
export default function SupportPage() {
    // State for managing form inputs
    const [selectedAmount, setSelectedAmount] = useState(80000);
    const [customAmount, setCustomAmount] = useState("");
    const [donor, setDonor] = useState({
        name: '',
        email: '',
        whatsapp: '',
    });

    // Handle input changes for donor details
    const handleDonorChange = (e) => {
        setDonor({ ...donor, [e.target.name]: e.target.value });
    };

    // Main function to handle the donation process
    const handleDonate = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const amountToDonate = selectedAmount === 'other' ? parseFloat(customAmount) : selectedAmount;

        if (!amountToDonate || amountToDonate <= 0) {
            alert("Please enter a valid donation amount.");
            return;
        }

        try {
            // 1. Call your backend to create a Razorpay order
            const orderResponse = await fetch('/api/razorpay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: amountToDonate }),
            });

            if (!orderResponse.ok) {
                throw new Error("Failed to create order");
            }

            const order = await orderResponse.json();

            // 2. Configure Razorpay options
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "TEJO SURYA Charitable Foundation",
                description: "Donation for a good cause",
                order_id: order.id,
                handler: function (response) {
                    // This function is called on a successful payment
                    alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                    // Here you would typically verify the payment on your backend
                },
                prefill: {
                    name: donor.name,
                    email: donor.email,
                    contact: donor.whatsapp,
                },
                notes: {
                    address: "Your Organization Address",
                },
                theme: {
                    color: "#f97316", // Orange color to match your theme
                },
            };

            // 3. Initialize and open Razorpay checkout
            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error("Donation failed:", error);
            alert("Donation process failed. Please try again.");
        }
    };


    const impactLevels = [
        // ... (your existing impactLevels data)
    { amount: 500, title: "Provides hygiene kits for 2 girls", description: "Essential supplies for one month" },
    { amount: 1500, title: "Sponsors health education session", description: "Reaches 50+ students in a school" },
    { amount: 5000, title: "Supports a full program", description: "Complete 3-month program for one school" }
    ];

    const nriSupport = [
        // ... (your existing nriSupport data)
    { country: "USA", icon: "usa", description: "Supporting 50+ girls monthly" },
    { country: "UK", icon: "uk", description: "Funding education programs" },
    { country: "Australia", icon: "australia", description: "Sponsoring hygiene kits" }
    ];

    const donationAmounts = [80000, 75000, 70000, 65000, 60000, 55000, 50000, 45000, 40000, 30000, 25000, 20000, 15000, 12000, 7500, 3000];

    return (
        <div className="bg-white font-sans">
            {/* Add the Razorpay script to the page */}
            <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
            />
            
            <main>
                {/* Support Our Mission Section */}
                <section className="py-20 text-center bg-white">
                    {/* ... (your existing section JSX) */}
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
                    {/* ... (your existing section JSX) */}
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
                <section className="py-20 bg-amber-50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl border border-gray-200">
                            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Transform the lives of children</h2>
                            
                            {/* Use the handleDonate function on form submission */}
                            <form className="space-y-8" onSubmit={handleDonate}>
                                <div>
                                    <p className="text-gray-700 mb-4">I wish to donate <span className="font-bold">₹</span> to feed child(ren) for one academic year.</p>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {donationAmounts.map(amount => (
                                            <label key={amount} className="flex items-center space-x-2 text-gray-600">
                                                <input
                                                    type="radio"
                                                    name="donationAmount"
                                                    value={amount}
                                                    checked={selectedAmount === amount}
                                                    onChange={() => setSelectedAmount(amount)}
                                                    className="form-radio text-orange-500"
                                                />
                                                <span>₹ {amount.toLocaleString('en-IN')}</span>
                                            </label>
                                        ))}
                                        <label className="flex items-center space-x-2 text-gray-600">
                                            <input
                                                type="radio"
                                                name="donationAmount"
                                                value="other"
                                                checked={selectedAmount === 'other'}
                                                onChange={() => setSelectedAmount('other')}
                                                className="form-radio text-orange-500"
                                            />
                                            <span>Other Amount</span>
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="Amount"
                                            value={customAmount}
                                            onChange={(e) => setCustomAmount(e.target.value)}
                                            onFocus={() => setSelectedAmount('other')}
                                            className="w-full col-span-1 md:col-span-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                                        />
                                    </div>
                                </div>
                                
                                {/* ... (The rest of your form fields like citizenship, donation type, etc.) */}

                                <div className="border-t border-gray-200 pt-6">
                                    <h3 className="font-semibold text-gray-800 mb-4">Donor Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Full Name*"
                                            value={donor.name}
                                            onChange={handleDonorChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300"
                                        />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email*"
                                            value={donor.email}
                                            onChange={handleDonorChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300"
                                        />
                                        <input
                                            type="tel"
                                            name="whatsapp"
                                            placeholder="Whatsapp number*"
                                            value={donor.whatsapp}
                                            onChange={handleDonorChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300"
                                        />
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">Please share your WhatsApp number for donation updates and receipts.</p>
                                </div>

                                {/* ... (Remaining form fields like Captcha, Terms, etc.) */}
                                
                                <div className="text-center pt-4">
                                    {/* Change button type to submit to trigger the form's onSubmit */}
                                    <button type="submit" className="bg-orange-500 text-white font-bold px-12 py-3 rounded-lg shadow-lg hover:bg-orange-600 transition-colors">
                                        Donate Now
                                    </button>
                                    <p className="text-sm text-gray-500 mt-2">Avail tax exemption under Section 80G</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
                
                {/* Support from NRIs Section */}
                <section className="py-20 bg-gradient-to-r from-orange-600 to-yellow-600">
                    {/* ... (your existing section JSX) */}
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