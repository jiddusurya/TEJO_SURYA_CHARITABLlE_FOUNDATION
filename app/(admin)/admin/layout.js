"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
    const pathname = usePathname();

    const handleSignOut = async () => {
        await fetch('/api/admin/logout', { method: 'POST' });
        window.location.href = '/admin/login';
    };

    const navLinks = [
        { href: '/admin', label: 'Dashboard' },
        { href: '/admin/hero-slides', label: 'Hero Carousel' },
        { href: '/admin/impact-stats', label: 'Impact Stats' },
        { href: '/admin/goal-stats', label: 'Impact & Goals' },
        { href: '/admin/gallery-images', label: 'Gallery Images' },
        { href: '/admin/instagram-posts', label: 'Instagram Posts' },
        { href: '/admin/video-testimonials', label: 'Video Testimonials' },
        { href: '/admin/news-articles', label: 'News Articles' },
        { href: '/admin/annual-reports', label: 'Annual Reports' },
        { href: '/admin/mentors', label: 'Mentors' },
        { href: '/admin/advisory-board', label: 'Advisory Board' },
        { href: '/admin/core-team', label: 'Core Team' },
        { href: '/admin/impact-stories', label: 'Impact Stories' }, // New Link
    ];

    return (
        <div className="flex min-h-screen bg-gray-100">
            <aside className="w-64 bg-gray-800 text-white p-4 flex flex-col">
                <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
                <nav className="flex-grow">
                    <ul>
                        {navLinks.map(link => (
                            <li key={link.href}>
                                <Link href={link.href} className={`block px-4 py-2 rounded-md ${pathname === link.href ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div>
                    <button
                        onClick={handleSignOut}
                        className="block w-full text-left bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
                    >
                        Sign Out
                    </button>
                </div>
            </aside>
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    );
}