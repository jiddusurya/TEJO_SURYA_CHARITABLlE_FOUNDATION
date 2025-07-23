"use client";
import React from 'react';

// Helper component for Icons using inline SVGs
const Icon = ({ name, className }) => {
  const icons = {
    fileText: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
    eye: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>,
  };
  return icons[name] || null;
};

const ReportCard = ({ year, title, description, imageUrl }) => (
  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
    <div className="bg-amber-400 p-6 text-center text-white">
        <div className="inline-block p-3 bg-white/20 rounded-full mb-2">
            <Icon name="fileText" className="h-6 w-6" />
        </div>
        <h2 className="text-2xl font-bold">{year}</h2>
        <p className="font-semibold">{title}</p>
    </div>
    <div className="p-8">
        <h3 className="text-xl font-bold text-gray-800">Annual Report FY {year}</h3>
        <p className="text-gray-600 mt-2 text-sm">{description}</p>
        <div className="mt-6">
            <button className="w-full bg-white text-gray-700 font-semibold px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors flex items-center justify-center">
                <Icon name="eye" className="h-5 w-5 mr-2" />
                View Report
            </button>
        </div>
    </div>
  </div>
);

// Main Page Component
export default function AnnualReportsPage() {

  const reports = [
    {
      year: "2021-22",
      title: "Annual Report",
      description: "Our first year of operation focused on COVID-19 relief, supporting 16 families with essential groceries and household supplies.",
    },
    {
      year: "2022-23",
      title: "Annual Report",
      description: "Expanded our reach with continued family support and launched elderly medicine support program for 16+ elderly people.",
    }
  ];

  return (
    <div className="bg-white font-sans">
      <main>
        {/* Annual Reports Section */}
        <section className="py-20 text-center bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="inline-block p-4 bg-orange-100 rounded-full mb-6 shadow-sm">
                    <Icon name="fileText" className="h-10 w-10 text-orange-500" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Annual Reports</h1>
                <p className="mt-4 max-w-3xl mx-auto text-gray-600 text-lg">
                    Explore our comprehensive annual reports showcasing our impact, achievements, and financial transparency in promoting menstrual health awareness.
                </p>
            </div>
        </section>

        {/* Reports Grid Section */}
        <section className="py-20 bg-amber-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reports.map((report) => (
                        <ReportCard key={report.year} {...report} />
                    ))}
                </div>
            </div>
        </section>
      </main>
    </div>
  );
}
