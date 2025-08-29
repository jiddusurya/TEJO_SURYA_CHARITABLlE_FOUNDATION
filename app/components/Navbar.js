"use client";
import React, { useState, useEffect, useRef } from 'react';

// --- Custom Hook for Click Outside ---
const useClickOutside = (ref, callback) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, callback]);
};


// --- UI Components ---

// Helper component for all Icons using inline SVGs
const Icon = ({ name, className }) => {
    const icons = {
        home: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
        chevronDown: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="6 9 12 15 18 9"></polyline></svg>,
        handshake: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16"><path fill="currentColor" d="M13 3a5.393 5.393 0 0 1-1.902 1.178c-.748.132-2.818-.828-3.838.152c-.17.17-.38.34-.6.51c-.48-.21-1.22-.53-1.76-.84S3 3 3 3L0 6.5s.74 1 1.2 1.66c.3.44.67 1.11.91 1.56l-.34.4a.876.876 0 0 0 .15 1a.833.833 0 0 0 1.002-.002a.62.62 0 0 0 .077.881a.994.994 0 0 0 1.006-.002a.806.806 0 0 0-.003 1.005a1.012 1.012 0 0 0 .892-.114a.822.822 0 0 0 .187.912a1.093 1.093 0 0 0 1.054-.092l.516-.467c.472.47 1.123.761 1.842.761l.061-.001a1.311 1.311 0 0 0 1.094-.791c.146.056.312.094.488.094c.236 0 .455-.068.64-.185c.585-.387.445-.687.445-.687a1.07 1.07 0 0 0 1.229-.279a.996.996 0 0 0 .138-1.215a.036.036 0 0 0 .021.005c.421 0 .787-.232.978-.574a1.564 1.564 0 0 0-.191-1.48l.003.005c.82-.16.79-.57 1.19-1.17a4.725 4.725 0 0 1 1.387-1.208zm-.05 7.06c-.44.44-.78.25-1.53-.32S9.18 8.1 9.18 8.1c.061.305.202.57.401.781c.319.359 1.269 1.179 1.719 1.599c.28.26 1 .78.58 1.18s-.75 0-1.44-.56s-2.23-1.94-2.23-1.94a.937.937 0 0 0 .27.72c.17.2 1.12 1.12 1.52 1.54s.75.67.41 1s-1.03-.19-1.41-.58c-.59-.57-1.76-1.63-1.76-1.63l-.001.053c0 .284.098.544.263.75c.288.378.848.868 1.188 1.248s.54.7 0 1s-1.34-.44-1.69-.8v-.002a.411.411 0 0 0-.1-.269a.896.896 0 0 0-.906-.188A.609.609 0 0 0 6 11.1a.754.754 0 0 0-.912.001a.61.61 0 0 0-.085-.95a1 1 0 0 0-1.174.08a.66.66 0 0 0-.068-.911a.996.996 0 0 0-1.186-.128L1.91 8.069c-.46-.73-1-1.49-1-1.49l2.28-2.77s.81.5 1.48.88c.33.19.9.44 1.33.64c-.68.51-1.25 1-1.08 1.34a1.834 1.834 0 0 0 2.087.036a2.41 2.41 0 0 1 1.343-.403c.347 0 .677.072.976.203c.554.374 1.574 1.294 2.504 1.874c1.17.85 1.4 1.4 1.12 1.68z" /></svg>,
        users: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
        clipboard: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>,
        userCheck: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>,
        menu: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>,
        x: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>,
        target: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>,
        eye: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>,
        rupee: <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="24" height="24" viewBox="0 0 24 24" className={className}><path d="M12.9494914,6 C13.4853936,6.52514205 13.8531598,7.2212202 13.9645556,8 L17.5,8 C17.7761424,8 18,8.22385763 18,8.5 C18,8.77614237 17.7761424,9 17.5,9 L13.9645556,9 C13.7219407,10.6961471 12.263236,12 10.5,12 L7.70710678,12 L13.8535534,18.1464466 C14.0488155,18.3417088 14.0488155,18.6582912 13.8535534,18.8535534 C13.6582912,19.0488155 13.3417088,19.0488155 13.1464466,18.8535534 L6.14644661,11.8535534 C5.83146418,11.538571 6.05454757,11 6.5,11 L10.5,11 C11.709479,11 12.7183558,10.1411202 12.9499909,9 L6.5,9 C6.22385763,9 6,8.77614237 6,8.5 C6,8.22385763 6.22385763,8 6.5,8 L12.9499909,8 C12.7183558,6.85887984 11.709479,6 10.5,6 L6.5,6 C6.22385763,6 6,5.77614237 6,5.5 C6,5.22385763 6.22385763,5 6.5,5 L10.5,5 L17.5,5 C17.7761424,5 18,5.22385763 18,5.5 C18,5.77614237 17.7761424,6 17.5,6 L12.9494914,6 L12.9494914,6 Z" /></svg>,
        fileText: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
    };
    return icons[name] || null;
};


// --- Main Navbar Component ---
export default function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const headerRef = useRef(null);

  // Use the custom hook to close menus when clicking outside
  useClickOutside(headerRef, () => {
    setOpenDropdown(null);
    setMenuOpen(false);
  });
  
  const navLinks = [
    { label: 'Home', href: '/' },
    {
      label: 'About Us', dropdown: [
        { label: 'Vision & Mission', href: '/vision-and-mission', icon: 'target' },
        { label: 'Core Team', href: '/core-team', icon: 'users' },
        { label: 'Advisory Board', href: '/advisory-board', icon: 'clipboard' },
        { label: 'Mentorship Forums', href: '/mentorship-forums', icon: 'users' },
      ]
    },
    {
      label: 'Get Involved', dropdown: [
        { label: 'Volunteer', href: '/volunteer', icon: 'userCheck' },
        { label: 'Collaborate', href: '/collaborate', icon: 'handshake' },
        { label: 'Donate', href: '/donate', icon: 'rupee' },
      ]
    },
    {
      label: 'Impact Stories', dropdown: [
        { label: 'Impact Stories', href: '/impact-stories', icon: 'handshake' },
        { label: 'Annual Reports', href: '/annual-reports', icon: 'fileText' },
      ]
    },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Register', href: '/register' },
  ];

  return (
    <header ref={headerRef} className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center space-x-2">
              <img src="/logo.png" alt="Tejo Surya Foundation Logo" className="h-10 w-10 rounded-full" />
              <span className="text-sm font-bold text-gray-800">
                  <span className='text-xl font-bold text-[#ff712c]'>TEJO SURYA</span><br />
                  <span className='text-xs font-medium text-[#073763]'>Charitable Foundation</span>
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map(link => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.dropdown && setOpenDropdown(link.label)}
                onMouseLeave={() => link.dropdown && setOpenDropdown(null)}
              >
                {link.dropdown ? (
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={openDropdown === link.label}
                    className="flex items-center text-gray-600 hover:text-red-500 transition-colors px-4 py-2 rounded-md focus:outline-none"
                  >
                    {link.label}
                    <Icon name="chevronDown" className={`h-4 w-4 ml-1 transition-transform duration-200 ${openDropdown === link.label ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <a href={link.href} className="flex items-center text-gray-600 hover:text-red-500 transition-colors px-4 py-2 rounded-md">
                    {link.label}
                  </a>
                )}
                {link.dropdown && openDropdown === link.label && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 bg-white shadow-lg rounded-lg border border-gray-200 w-56 py-2 z-20 transition-all duration-300 ease-in-out transform opacity-100 scale-100">
                    {link.dropdown.map(item => (
                      <a key={item.label} href={item.href} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600" onClick={() => setOpenDropdown(null)}>
                        <Icon name={item.icon} className="h-5 w-4 mr-3 text-gray-500" />
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Donate Button */}
          <div className="hidden lg:flex items-center">
            <a href="/donate">
              <button className="bg-red-500 text-white font-bold text-md px-5 py-2 rounded-lg shadow-md hover:bg-red-600 transition-all duration-300 transform hover:scale-105">
                Donate Now
              </button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={() => setMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-red-500 p-2">
              {isMenuOpen ? <Icon name="x" className="h-6 w-6" /> : <Icon name="menu" className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 absolute top-full left-0 w-full shadow-lg">
          <nav className="flex flex-col p-4 space-y-1">
            {navLinks.map(link => (
              <div key={link.label}>
                {link.href ? (
                    <a href={link.href} className="flex items-center py-2 text-gray-600 hover:text-red-500 transition-colors w-full text-left font-semibold" onClick={() => setMenuOpen(false)}>
                        {link.label}
                    </a>
                ) : (
                    <button
                      onClick={() => {
                        if (link.dropdown) {
                          setOpenDropdown(openDropdown === link.label ? null : link.label);
                        }
                      }}
                      className="flex items-center py-2 text-gray-600 hover:text-red-500 transition-colors w-full text-left font-semibold"
                    >
                      <span className="flex-grow">{link.label}</span>
                      {link.dropdown && <Icon name="chevronDown" className={`h-5 w-5 ml-auto transition-transform ${openDropdown === link.label ? 'rotate-180' : ''}`} />}
                    </button>
                )}
                {link.dropdown && openDropdown === link.label && (
                  <div className="pl-6 py-1 space-y-1">
                    {link.dropdown.map(item => (
                      <a
                        key={item.label}
                        href={item.href}
                        className="flex items-center py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md"
                        onClick={() => setMenuOpen(false)}
                      >
                        <Icon name={item.icon} className="h-4 w-4 mr-3 text-gray-500" />
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4">
                <a href="/donate">
                  <button className="w-full bg-red-500 text-white font-bold text-md px-5 py-3 rounded-lg shadow-md hover:bg-red-600 transition-all duration-300">
                    Donate Now
                  </button>
                </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

