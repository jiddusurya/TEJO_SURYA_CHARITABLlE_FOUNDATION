"use client";
import React, { useState, useEffect } from 'react';

// --- Reusable Icon Component ---
const Icon = ({ name, className }) => {
  const icons = {
    fileText: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
    eye: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>,
    close: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  };
  return icons[name] || null;
};

// --- Secure PDF Viewer Component ---
// This component dynamically loads the react-pdf library to avoid server-side build errors.
const SecureDocumentViewer = ({ fileUrl, watermarkText }) => {
  const [PdfModule, setPdfModule] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Dynamically load the react-pdf library from the jsdelivr CDN to avoid redirects.
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/react-pdf@9.1.0/dist/umd/react-pdf.min.js';
    script.async = true;

    script.onload = () => {
      const loadedModule = window.ReactPDF;
      if (loadedModule) {
        // Configure the worker from the same reliable CDN.
        loadedModule.pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${loadedModule.pdfjs.version}/build/pdf.worker.min.js`;
        setPdfModule(loadedModule);
      } else {
        setError("Failed to load PDF library.");
        setIsLoading(false);
      }
    };
    
    script.onerror = () => {
      setError("Failed to load PDF library script.");
      setIsLoading(false);
    }

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setIsLoading(false);
  }

  function onDocumentLoadError(loadError) {
    setError("Failed to load PDF. Please check the link and your proxy setup.");
    setIsLoading(false);
    console.error(loadError);
  }

  const watermarkStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
    pointerEvents: 'none',
    backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='150px' width='150px'><text x='50%' y='50%' transform='rotate(-45 75,75)' fill='rgba(0,0,0,0.1)' font-size='16' text-anchor='middle'>${watermarkText}</text></svg>")`,
    backgroundRepeat: 'repeat',
  };

  if (!PdfModule) {
    return <div className="text-center p-4">Initializing PDF viewer...</div>;
  }
  
  const { Document, Page } = PdfModule;

  return (
    <div style={{ position: 'relative' }}>
      {isLoading && <div className="text-center p-4">Loading document...</div>}
      {error && <div className="text-center p-4 text-red-500">{error}</div>}
      <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess} onLoadError={onDocumentLoadError}>
        {!isLoading && !error && Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} renderTextLayer={false} renderAnnotationLayer={false} />
        ))}
      </Document>
      {!isLoading && !error && <div style={watermarkStyle}></div>}
    </div>
  );
};

// --- Report Card Component ---
const ReportCard = ({ year, title, description, onViewReport }) => (
  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
    <div className="bg-amber-400 p-6 text-center text-white">
        <div className="inline-block p-3 bg-white/20 rounded-full mb-2">
            <Icon name="fileText" className="h-6 w-6" />
        </div>
        <h2 className="text-2xl font-bold">{year}</h2>
        <p className="font-semibold">{title}</p>
    </div>
    <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800">Annual Report FY {year}</h3>
        <p className="text-gray-600 mt-2 text-sm flex-grow">{description}</p>
        <div className="mt-6">
            <button onClick={onViewReport} className="w-full bg-white text-gray-700 font-semibold px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors flex items-center justify-center">
                <Icon name="eye" className="h-5 w-5 mr-2" />
                View Report
            </button>
        </div>
    </div>
  </div>
);

// --- Main Page Component ---
export default function AnnualReportsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);

  // In a real application, get this from your authentication session
  const currentUserEmail = "user@example.com"; 

  const reports = [
    {
      year: "2021-22",
      title: "Annual Report",
      description: "Our first year of operation focused on COVID-19 relief, supporting 16 families with essential groceries and household supplies.",
      fileId: "1iXjQnyhCGJS55obebxNTtrXLofLXepvT", 
    },
    {
      year: "2022-23",
      title: "Annual Report",
      description: "Expanded our reach with continued family support and launched elderly medicine support program for 16+ elderly people.",
      fileId: "1-H_9jZ7kL5mN3pX8qR7sT6uV5wX4Y3Z2", 
    }
  ];

  const handleViewReport = (fileId) => {
    // This function now calls your backend proxy route to avoid CORS errors.
    const proxyUrl = `/api/get-pdf?fileId=${fileId}`;
    setSelectedPdf(proxyUrl);
    setModalOpen(true);
  };

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
                    Explore our comprehensive annual reports showcasing our impact, achievements, and financial transparency.
                </p>
            </div>
        </section>

        {/* Reports Grid Section */}
        <section className="py-20 bg-amber-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reports.map((report) => (
                        <ReportCard 
                            key={report.year} 
                            {...report} 
                            onViewReport={() => handleViewReport(report.fileId)}
                        />
                    ))}
                </div>
            </div>
        </section>
      </main>

      {/* Secure PDF Viewer Modal */}
      {modalOpen && selectedPdf && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-bold">Secure Document Viewer</h3>
              <button onClick={() => setModalOpen(false)} className="p-2 rounded-full hover:bg-gray-200">
                <Icon name="close" className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-grow overflow-y-auto p-4">
              <SecureDocumentViewer fileUrl={selectedPdf} watermarkText={currentUserEmail} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
