"use client";
import React, { useState } from 'react';
import Link from 'next/link';


// Helper component for Icons using inline SVGs
const Icon = ({ name, className }) => {
  const icons = {
    home: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
    chevronDown: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="6 9 12 15 18 9"></polyline></svg>,
    heart: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>,
    users: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
    clipboard: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>,
    userCheck: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>,
    menu: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>,
    x: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>,
    target: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>,
    eye: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>,
    rupee: <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="24" height="24" viewBox="0 0 24 24" className={className}>
      <path d="M12.9494914,6 C13.4853936,6.52514205 13.8531598,7.2212202 13.9645556,8 L17.5,8 C17.7761424,8 18,8.22385763 18,8.5 C18,8.77614237 17.7761424,9 17.5,9 L13.9645556,9 C13.7219407,10.6961471 12.263236,12 10.5,12 L7.70710678,12 L13.8535534,18.1464466 C14.0488155,18.3417088 14.0488155,18.6582912 13.8535534,18.8535534 C13.6582912,19.0488155 13.3417088,19.0488155 13.1464466,18.8535534 L6.14644661,11.8535534 C5.83146418,11.538571 6.05454757,11 6.5,11 L10.5,11 C11.709479,11 12.7183558,10.1411202 12.9499909,9 L6.5,9 C6.22385763,9 6,8.77614237 6,8.5 C6,8.22385763 6.22385763,8 6.5,8 L12.9499909,8 C12.7183558,6.85887984 11.709479,6 10.5,6 L6.5,6 C6.22385763,6 6,5.77614237 6,5.5 C6,5.22385763 6.22385763,5 6.5,5 L10.5,5 L17.5,5 C17.7761424,5 18,5.22385763 18,5.5 C18,5.77614237 17.7761424,6 17.5,6 L12.9494914,6 L12.9494914,6 Z" />
    </svg>,
    fileText: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
    logOut: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>,
  };
  return icons[name] || null;
};


export default function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    {
      label: 'About Us', href: '#', dropdown: [
        { label: 'Mission', href: '/mission', icon: 'target' },
        { label: 'Vision', href: '/vision', icon: 'eye' },
        { label: 'Core Team', href: '/core-team', icon: 'users' },
        { label: 'Advisory Board', href: '/advisory-board', icon: 'clipboard' },
        { label: 'Mentorship Forums', href: '/mentorship-forums', icon: 'users' },
      ]
    },
    {
      label: 'Get Involved', href: '#', dropdown: [
        { label: 'Donate', href: '/donate', icon: 'rupee' },
        { label: 'Volunteer', href: '/volunteer', icon: 'userCheck' },
        { label: 'Collaborate', href: '/collaborate', icon: 'heart' },
      ]
    },
    {
      label: 'Impact Stories', href: '#', dropdown: [
        { label: 'Impact Stories', href: '/impact-stories', icon: 'heart' },
        { label: 'Annual Reports', href: '/annual-reports', icon: 'fileText' },
      ]
    },
    { label: 'Gallery', href: '/gallery' },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/logo.png" alt="Tejo Surya Foundation Logo" className="h-10 w-10 rounded-full" />
              <span className="text-sm font-bold text-gray-800">TEJO SURYA<br />FOUNDATION</span>
            </Link>
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
                <Link href={link.href} className="flex items-center text-gray-600 hover:text-red-500 transition-colors px-4 py-2 rounded-md">
                  {link.icon && <Icon name={link.icon} className="h-4 w-4 mr-2" />}
                  {link.label}
                  {link.dropdown && <Icon name="chevronDown" className={`h-4 w-4 ml-1 transition-transform ${openDropdown === link.label ? 'rotate-180' : ''}`} />}
                </Link>
                {link.dropdown && openDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-lg border border-gray-200 w-56 py-2 z-20">
                    {link.dropdown.map(item => (
                      <Link key={item.label} href={item.href} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600">
                        <Icon name={item.icon} className="h-5 w-4 mr-3 text-gray-500" />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            

            <Link href="/donate">
              <button className="bg-red-500 text-white font-bold text-xl px-5 py-2 rounded-lg shadow-md hover:bg-red-600 transition-all duration-300 flex items-center">
                Donate Now
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={() => setMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-red-500">
              {isMenuOpen ? <Icon name="x" className="h-6 w-6" /> : <Icon name="menu" className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <nav className="flex flex-col p-4 space-y-1">
            {navLinks.map(link => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  onClick={(e) => {
                    if (link.dropdown) {
                      e.preventDefault();
                      setOpenDropdown(openDropdown === link.label ? null : link.label);
                    }
                  }}
                  className="flex items-center py-2 text-gray-600 hover:text-red-500 transition-colors w-full"
                >
                  {link.icon && <Icon name={link.icon} className="h-5 w-5 mr-2" />}
                  {link.label}
                  {link.dropdown && <Icon name="chevronDown" className={`h-5 w-5 ml-auto transition-transform ${openDropdown === link.label ? 'rotate-180' : ''}`} />}
                </Link>
                {link.dropdown && openDropdown === link.label && (
                  <div className="pl-8 py-1">
                    {link.dropdown.map(item => (
                      <Link key={item.label} href={item.href} className="flex items-center py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md">
                        <Icon name={item.icon} className="h-4 w-4 mr-3 text-gray-500" />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <Link href="/donate">
              <button className="w-full bg-red-500 text-white font-bold text-md px-5 py-3 rounded-lg shadow-md hover:bg-red-600 transition-all duration-300 flex items-center justify-center mt-2">
                Donate Now
              </button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
