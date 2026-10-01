"use client";
import React, { useState, useEffect } from 'react';

const Icon = ({ name, className }) => {
    const icons = {
        handshake: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16" className={className}><path fill="currentColor" d="M13 3a5.393 5.393 0 0 1-1.902 1.178c-.748.132-2.818-.828-3.838.152c-.17.17-.38.34-.6.51c-.48-.21-1.22-.53-1.76-.84S3 3 3 3L0 6.5s.74 1 1.2 1.66c.3.44.67 1.11.91 1.56l-.34.4a.876.876 0 0 0 .15 1a.833.833 0 0 0 1.002-.002a.62.62 0 0 0 .077.881a.994.994 0 0 0 1.006-.002a.806.806 0 0 0-.003 1.005a1.012 1.012 0 0 0 .892-.114a.822.822 0 0 0 .187.912a1.093 1.093 0 0 0 1.054-.092l.516-.467c.472.47 1.123.761 1.842.761l.061-.001a1.311 1.311 0 0 0 1.094-.791c.146.056.312.094.488.094c.236 0 .455-.068.64-.185c.585-.387.445-.687.445-.687a1.07 1.07 0 0 0 1.229-.279a.996.996 0 0 0 .138-1.215a.036.036 0 0 0 .021.005c.421 0 .787-.232.978-.574a1.564 1.564 0 0 0-.191-1.48l.003.005c.82-.16.79-.57 1.19-1.17a4.725 4.725 0 0 1 1.387-1.208zm-.05 7.06c-.44.44-.78.25-1.53-.32S9.18 8.1 9.18 8.1c.061.305.202.57.401.781c.319.359 1.269 1.179 1.719 1.599c.28.26 1 .78.58 1.18s-.75 0-1.44-.56s-2.23-1.94-2.23-1.94a.937.937 0 0 0 .27.72c.17.2 1.12 1.12 1.52 1.54s.75.67.41 1s-1.03-.19-1.41-.58c-.59-.57-1.76-1.63-1.76-1.63l-.001.053c0 .284.098.544.263.75c.288.378.848.868 1.188 1.248s.54.7 0 1s-1.34-.44-1.69-.8v-.002a.411.411 0 0 0-.1-.269a.896.896 0 0 0-.906-.188A.609.609 0 0 0 6 11.1a.754.754 0 0 0-.912.001a.61.61 0 0 0-.085-.95a1 1 0 0 0-1.174.08a.66.66 0 0 0-.068-.911a.996.996 0 0 0-1.186-.128L1.91 8.069c-.46-.73-1-1.49-1-1.49l2.28-2.77s.81.5 1.48.88c.33.19.9.44 1.33.64c-.68.51-1.25 1-1.08 1.34a1.834 1.834 0 0 0 2.087.036a2.41 2.41 0 0 1 1.343-.403c.347 0 .677.072.976.203c.554.374 1.574 1.294 2.504 1.874c1.17.85 1.4 1.4 1.12 1.68z"/></svg>,
        externalLink: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>,
    };
    return icons[name] || null;
};

const PartnerCard = ({ partner }) => (
    <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-[#e68541] text-center h-full flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="h-40 w-full p-4 rounded-xl bg-white flex items-center justify-center">
            <img src={partner.logoUrl} alt="Partner logo" className="max-h-full max-w-full object-contain" loading="lazy" />
        </div>
        {partner.description && (
            <p className="text-gray-600 mt-4 text-sm flex-grow whitespace-pre-wrap">{partner.description}</p>
        )}
        {partner.websiteUrl && (
            <a
                href={partner.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center gap-1 text-red-500 font-semibold hover:text-red-600 transition-colors self-center"
            >
                Visit Website
                <Icon name="externalLink" className="h-4 w-4" />
            </a>
        )}
    </div>
);

export default function PartnersPage() {
    const [partners, setPartners] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const res = await fetch('/api/partners');
                const data = await res.json();
                setPartners(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Failed to fetch partners:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPartners();
    }, []);

    return (
        <div className="bg-gray-50 font-sans">
            <main>
                <section className="py-16 md:py-20 text-center bg-gray-50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className='flex justify-center items-center'>
                            <div className="inline-block p-4 bg-orange-100 rounded-full mx-3 shadow-sm">
                                <Icon name="handshake" className="h-10 w-10 text-orange-500" />
                            </div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#073763]">Our Esteemed Partners</h1>
                        </div>
                        <p className="mt-4 max-w-3xl mx-auto text-gray-600 text-base md:text-lg">
                            We are grateful to the organisations that stand with us. Together, we are building a future where every girl and woman can manage her health with dignity.
                        </p>
                    </div>
                </section>

                <section className="pb-16 md:pb-20 bg-gray-50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        {isLoading ? (
                            <div className="text-center text-gray-500 py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                                Loading partners...
                            </div>
                        ) : partners.length === 0 ? (
                            <div className="text-center text-gray-500 py-12">
                                Our partners will be announced soon.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                                {partners.map((partner) => (
                                    <PartnerCard key={partner.id} partner={partner} />
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}
