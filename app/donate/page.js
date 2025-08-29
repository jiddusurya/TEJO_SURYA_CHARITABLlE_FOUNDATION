"use client";
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';

// --- Reusable Icon Component ---
const Icon = ({ name, className }) => {
  const icons = {
    handshake: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16"><path fill="currentColor" d="M13 3a5.393 5.393 0 0 1-1.902 1.178c-.748.132-2.818-.828-3.838.152c-.17.17-.38.34-.6.51c-.48-.21-1.22-.53-1.76-.84S3 3 3 3L0 6.5s.74 1 1.2 1.66c.3.44.67 1.11.91 1.56l-.34.4a.876.876 0 0 0 .15 1a.833.833 0 0 0 1.002-.002a.62.62 0 0 0 .077.881a.994.994 0 0 0 1.006-.002a.806.806 0 0 0-.003 1.005a1.012 1.012 0 0 0 .892-.114a.822.822 0 0 0 .187.912a1.093 1.093 0 0 0 1.054-.092l.516-.467c.472.47 1.123.761 1.842.761l.061-.001a1.311 1.311 0 0 0 1.094-.791c.146.056.312.094.488.094c.236 0 .455-.068.64-.185c.585-.387.445-.687.445-.687a1.07 1.07 0 0 0 1.229-.279a.996.996 0 0 0 .138-1.215a.036.036 0 0 0 .021.005c.421 0 .787-.232.978-.574a1.564 1.564 0 0 0-.191-1.48l.003.005c.82-.16.79-.57 1.19-1.17a4.725 4.725 0 0 1 1.387-1.208zm-.05 7.06c-.44.44-.78.25-1.53-.32S9.18 8.1 9.18 8.1c.061.305.202.57.401.781c.319.359 1.269 1.179 1.719 1.599c.28.26 1 .78.58 1.18s-.75 0-1.44-.56s-2.23-1.94-2.23-1.94a.937.937 0 0 0 .27.72c.17.2 1.12 1.12 1.52 1.54s.75.67.41 1s-1.03-.19-1.41-.58c-.59-.57-1.76-1.63-1.76-1.63l-.001.053c0 .284.098.544.263.75c.288.378.848.868 1.188 1.248s.54.7 0 1s-1.34-.44-1.69-.8v-.002a.411.411 0 0 0-.1-.269a.896.896 0 0 0-.906-.188A.609.609 0 0 0 6 11.1a.754.754 0 0 0-.912.001a.61.61 0 0 0-.085-.95a1 1 0 0 0-1.174.08a.66.66 0 0 0-.068-.911a.996.996 0 0 0-1.186-.128L1.91 8.069c-.46-.73-1-1.49-1-1.49l2.28-2.77s.81.5 1.48.88c.33.19.9.44 1.33.64c-.68.51-1.25 1-1.08 1.34a1.834 1.834 0 0 0 2.087.036a2.41 2.41 0 0 1 1.343-.403c.347 0 .677.072.976.203c.554.374 1.574 1.294 2.504 1.874c1.17.85 1.4 1.4 1.12 1.68z"/></svg>,
    globe: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>,
    info: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>,
    close: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
    usa: <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 7410 3900"><path fill="#b22234" d="M0 0h7410v3900H0z"/><path d="M0 0h7410v300H0zm0 600h7410v300H0zm0 600h7410v300H0zm0 600h7410v300H0zm0 600h7410v300H0zm0 600h7410v300H0zm0 600h7410v300H0z" fill="#fff"/><path fill="#3c3b6e" d="M0 0h2964v2100H0z"/></svg>,
    uk: <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 60 30"><clipPath id="a"><path d="M0 0v30h60V0z"/></clipPath><clipPath id="b"><path d="M30 15h30v15zv-15h30zH30z"/></clipPath><g clipPath="url(#a)"><path d="M0 0v30h60V0z" fill="#012169"/><path d="M0 0L60 30m0-30L0 30" stroke="#fff" strokeWidth="6"/><path d="M0 0L60 30m0-30L0 30" clipPath="url(#b)" stroke="#C8102E" strokeWidth="4"/><path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10"/><path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6"/></g></svg>,
    australia: <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 12 6"><path fill="#002b7f" d="M0 0h12v6H0z"/><path d="M0 0L6 3m0-3L0 3" stroke="#fff" strokeWidth="1.2"/><path d="M3 0v3H0v-.6L6 3l-.6-3h.6V0H3zm0 3v-3h3v3H3z" fill="#e4002b"/><path d="M2.4 1.5L0 3l.6 1.5L3 3 2.4 1.5zM0 0l2.4 1.5L0 3V0zm3 .6L.6 3 3 1.5V.6z" stroke="#fff" strokeWidth=".6"/></svg>,
  };
  return icons[name] || null;
};

// --- Donation Modal Component ---
const DonationModal = ({ isOpen, onClose, handleDonate, loading }) => {
    const [step, setStep] = useState(1);
    
    // Form state is managed here
    const [citizenship, setCitizenship] = useState('indian');
    const [donationType, setDonationType] = useState('once');
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [customAmount, setCustomAmount] = useState("");
    const [donor, setDonor] = useState({
        title: 'Mr', fullName: '', birthdate: '', email: '', whatsapp: '', alternateMobile: ''
    });
    const [wants80G, setWants80G] = useState(false);
    const [captcha, setCaptcha] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (citizenship === 'foreign') {
            setDonationType('once');
        }
    }, [citizenship]);
    
    const currencySymbol = citizenship === 'indian' ? '₹' : '$';
    const currencyCode = citizenship === 'indian' ? 'INR' : 'USD';

    // Define donation amounts based on user selection
    const nriAmounts = [7500, 5000, 3000, 1500, 1000, 500];
    const indianMonthlyAmounts = [5000, 3000, 2000, 1000, 500, 300];
    const indianOnceAmounts = [80000, 75000, 70000, 65000, 60000, 55000, 50000, 45000, 40000, 30000, 25000, 20000, 15000, 12000, 7500, 3000];
    
    let currentDonationAmounts = indianOnceAmounts;
    if (citizenship === 'foreign') {
        currentDonationAmounts = nriAmounts;
    } else if (donationType === 'monthly') {
        currentDonationAmounts = indianMonthlyAmounts;
    }

    const handleNext = () => {
        if (step === 2) {
            // Validate amount before moving to step 3
            let amountError = null;
            if (!selectedAmount) {
                amountError = "Please select a donation amount";
            }
            if (selectedAmount === 'other' && (!customAmount || isNaN(customAmount) || Number(customAmount) <= 0)) {
                amountError = "Please enter a valid custom amount";
            }
            if (amountError) {
                setErrors(prev => ({ ...prev, amount: amountError }));
                return; // Prevent going to next step
            } else {
                setErrors(prev => ({ ...prev, amount: undefined }));
            }
        }
        setStep(step + 1);
    };
    const handleBack = () => setStep(step - 1);

    const validateForm = () => {
        const newErrors = {};
        if (!donor.fullName.trim()) newErrors.fullName = "Full Name is required";
        if (!donor.email.trim()) newErrors.email = "Email is required";
        if (!donor.whatsapp.trim()) newErrors.whatsapp = "Whatsapp number is required";
        if (!agreedToTerms) newErrors.terms = "You must agree to the Terms and Conditions";
        return newErrors;
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        const formData = {
            amount: selectedAmount === 'other' ? parseFloat(customAmount) : selectedAmount,
            citizenship,
            donationType,
            donor,
            wants80G,
            agreedToTerms,
            currencyCode,
        };
        handleDonate(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold text-gray-800">Transforming Lives of Future Mothers</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200">
                        <Icon name="close" className="h-6 w-6 text-gray-600" />
                    </button>
                </div>

                <div className="p-8 overflow-y-auto">
                    <form onSubmit={onFormSubmit}>
                        {/* Step 1: Citizenship and Type */}
                        {step === 1 && (
                            <div className="space-y-8">
                                <div className="text-center mb-4">
                                    <p className="font-semibold text-gray-700">Step 1 of 3: Donation Details</p>
                                </div>
                                {/* Citizenship */}
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-4">Select your citizenship</h3>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
                                        <label className="flex items-center space-x-2 text-gray-600 cursor-pointer">
                                            <input type="radio" name="citizenship" value="indian" checked={citizenship === 'indian'} onChange={(e) => setCitizenship(e.target.value)} className="form-radio text-blue-600" />
                                            <span>Indian Citizen</span>
                                        </label>
                                        <label className="flex items-center space-x-2 text-gray-600 cursor-pointer">
                                            <input type="radio" name="citizenship" value="foreign" checked={citizenship === 'foreign'} onChange={(e) => setCitizenship(e.target.value)} className="form-radio text-blue-600" />
                                            <span>Foreign National</span>
                                        </label>
                                    </div>
                                </div>
                                {/* Donation Type */}
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-4">Select donation type</h3>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
                                        <label className="flex items-center space-x-2 text-gray-600 cursor-pointer">
                                            <input type="radio" name="donationType" value="once" checked={donationType === 'once'} onChange={(e) => setDonationType(e.target.value)} className="form-radio text-blue-600" />
                                            <span>Donate Once</span>
                                        </label>
                                        <label className={`flex items-center space-x-2 text-gray-600 ${citizenship === 'foreign' ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
                                            <input type="radio" name="donationType" value="monthly" checked={donationType === 'monthly'} onChange={(e) => setDonationType(e.target.value)} className="form-radio text-blue-600" disabled={citizenship === 'foreign'} />
                                            <span>Donate Monthly</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Amount */}
                        {step === 2 && (
                             <div className="space-y-8">
                                <div className="text-center mb-4">
                                    <p className="font-semibold text-gray-700">Step 2 of 3: Choose Amount</p>
                                </div>
                                <div>
                                    <p className="text-gray-700 mb-4 font-medium"> I wish to donate ₹ to support girl child(ren) for one academic year.</p>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        {currentDonationAmounts.map(amount => (
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
                                    {errors.amount && (
                                        <p className="text-red-500 text-sm mt-2">{errors.amount}</p>
                                    )}
                                </div>
                             </div>
                        )}

                        {/* Step 3: Details */}
                        {step === 3 && (
                            <div className="space-y-8">
                                <div className="text-center mb-4">
                                    <p className="font-semibold text-gray-700">Step 3 of 3: Your Details</p>
                                </div>
                                {/* Sponsor Plate */}
                                
                                {/* Donor Details */}
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-4">Donor Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex gap-2">
                                            <select name="title" value={donor.title} onChange={(e) => setDonor({...donor, title: e.target.value})} className="px-4 py-3 rounded-lg border border-gray-300 bg-gray-50">
                                                <option>Mr</option><option>Mrs</option><option>Ms</option>
                                            </select>
                                            <input type="text" name="fullName" placeholder="Full Name*" value={donor.fullName} onChange={(e) => setDonor({...donor, fullName: e.target.value})} required className="w-full px-4 py-3 rounded-lg border border-gray-300" />
                                        </div>
                                        {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
                                        <input type="email" name="email" placeholder="Email*" value={donor.email} onChange={(e) => setDonor({...donor, email: e.target.value})} required className="w-full px-4 py-3 rounded-lg border border-gray-300" />
                                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                                        <input type="tel" name="whatsapp" placeholder="Whatsapp number*" value={donor.whatsapp} onChange={(e) => setDonor({...donor, whatsapp: e.target.value})} required className="w-full px-4 py-3 rounded-lg border border-gray-300" />
                                        {errors.whatsapp && <p className="text-red-500 text-sm">{errors.whatsapp}</p>}
                                    </div>
                                </div>
                                {/* Terms & Conditions */}
                                <div>
                                     <label className="flex items-center text-gray-700">
                                        <input type="checkbox" checked={agreedToTerms} onChange={() => setAgreedToTerms(!agreedToTerms)} className="form-checkbox text-blue-600 h-5 w-5" />
                                        <span className="ml-3">I agree to the <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a>.</span>
                                    </label>
                                    {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between items-center pt-6 border-t mt-8">
                            {step > 1 && (
                                <button type="button" onClick={handleBack} className="bg-gray-200 text-gray-700 font-bold px-6 py-2 rounded-lg hover:bg-gray-300">
                                    Back
                                </button>
                            )}
                            <div className="flex-grow"></div>
                            {step < 3 && (
                                <button type="button" onClick={handleNext} className="bg-blue-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-blue-700">
                                    Next
                                </button>
                            )}
                            {step === 3 && (
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`bg-blue-600 text-white font-bold px-12 py-3 rounded-lg shadow-lg hover:bg-blue-700 w-full sm:w-auto disabled:bg-blue-400 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {loading ? 'Processing...' : 'Donate'}
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

// --- Main Page Component ---
const DonationImpactCard = ({ amount, title, description }) => (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
        <p className="text-3xl font-bold text-gray-800">₹{amount.toLocaleString('en-IN')}</p>
        <h3 className="text-xl font-semibold text-gray-800 mt-4">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
    </div>
);

const NriSupportCard = ({ country, icon, description }) => (
    <div className="bg-white/20 backdrop-blur-sm p-8 rounded-2xl text-center text-white border border-white/30">
        {country==="Australia" ? (
            <img src="https://res.cloudinary.com/dqwcr4y98/image/upload/v1756455472/2f064345-3c69-4a73-9ff1-458b4fdaf37b_m0tkfz.jpg" alt="Australia" className="h-16 w-30 rounded-md mx-auto mb-4 object-cover" />
        ) : (
            <Icon name={icon} className="h-16 w-24 rounded-md mx-auto mb-4 object-cover" />
        )}
        <h3 className="text-2xl font-bold">{country}</h3>
        <p className="mt-2">{description}</p>
    </div>
);


export default function SupportPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

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

    const handleDonate = async (formData) => {
        setLoading(true);
        let amountToDonate = formData.amount;
        

        if (!amountToDonate || amountToDonate <= 0) {
            alert("Please select a valid donation amount.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/razorpay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: amountToDonate,
                    type: formData.donationType,
                    currency: formData.currencyCode,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Failed to create payment order.");
            }
            
            const data = await response.json();

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: data.amount,
                currency: data.currency,
                name: "TEJO SURYA Charitable Foundation",
                description: formData.donationType === 'once' ? "One-Time Donation" : "Monthly Donation Setup",
                ...(formData.donationType === 'once' ? { order_id: data.id } : { subscription_id: data.subscription_id }),
                handler: function (response) {
                    alert(`Payment successful! ID: ${response.razorpay_payment_id} \n  Save this ID for future reference`);
                    setIsModalOpen(false); // Close modal on success
                },
                prefill: {
                    name: formData.donor.fullName,
                    email: formData.donor.email,
                    contact: formData.donor.whatsapp,
                },
                theme: { color: "#007BFF" },
                modal: {
                    ondismiss: function() {
                        setLoading(false); // Re-enable button if user closes Razorpay modal
                    }
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error("Donation failed:", error);
            alert(`Donation process failed: ${error.message}`);
            setLoading(false);
        }
    };

    const impactLevels = [
        { amount: 500, title: "Provides hygiene kits for 2 girls", description: "Essential supplies for one month" },
        { amount: 1500, title: "Sponsors health education session", description: "Reaches 50+ students" },
        { amount: 50000, title: "Supports a full program", description: "For one school" }
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
                            <Icon name="handshake" className="h-10 w-10 text-orange-500" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Your Gift For Future Mothers!</h1>
                        <p className="mt-4 max-w-3xl mx-auto text-gray-600 text-lg">
                            Your donation opens doors to dignity, awareness, and opportunity. Together, we shape stronger women and a brighter nation for tomorrow.</p>
                        <div className="mt-8">
                             <button 
                                onClick={() => setIsModalOpen(true)}
                                className="bg-red-500 text-white font-bold px-10 py-4 rounded-lg shadow-lg hover:bg-red-700 transition-all transform hover:scale-105"
                            >
                                Donate Now
                            </button>
                        </div>
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

                {/* Support from NRIs Section */}
                <section className="py-20 bg-gradient-to-r from-orange-600 to-yellow-600">
                     <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Support from NRIs <Icon name="globe" className="inline-block h-8 w-8 ml-2" /></h2>
                        <p className="mt-2 max-w-3xl mx-auto text-white/90">
                            Non-Resident Indians are joining our mission to empower girls back home. Your contribution makes a real difference!
                        </p>
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                            {nriSupport.map((support) => (
                                <NriSupportCard key={support.country} {...support} />
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <DonationModal 
                isOpen={isModalOpen} 
                onClose={() => {
                    setIsModalOpen(false);
                    setLoading(false); // Reset loading state when modal is closed
                }} 
                handleDonate={handleDonate}
                loading={loading}
            />
        </div>
    );
}
