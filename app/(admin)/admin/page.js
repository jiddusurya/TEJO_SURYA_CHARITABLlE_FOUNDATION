"use client";
import Link from 'next/link';

export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Dashboard</h1>
            <p className="mb-6">Welcome to the admin panel. Here you can manage your website's content.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/admin/hero-slides" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"><h2 className="text-2xl font-semibold mb-2">Manage Hero Carousel</h2><p>Add, edit, or delete the slides on your homepage.</p></Link>
                <Link href="/admin/impact-stats" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"><h2 className="text-2xl font-semibold mb-2">Manage Impact Stats</h2><p>Update the numbers for your "Impact in Numbers" section.</p></Link>
                <Link href="/admin/goal-stats" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"><h2 className="text-2xl font-semibold mb-2">Manage Goals</h2><p>Update the numbers for your "Ambitious Goals" section.</p></Link>
                <Link href="/admin/gallery-images" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"><h2 className="text-2xl font-semibold mb-2">Manage Gallery</h2><p>Add, edit, or delete images in the main gallery.</p></Link>
                <Link href="/admin/instagram-posts" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"><h2 className="text-2xl font-semibold mb-2">Manage Instagram Posts</h2><p>Add or remove Instagram posts displayed on the gallery page.</p></Link>
                <Link href="/admin/video-testimonials" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"><h2 className="text-2xl font-semibold mb-2">Manage Videos</h2><p>Add or remove YouTube video testimonials.</p></Link>
                <Link href="/admin/news-articles" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"><h2 className="text-2xl font-semibold mb-2">Manage News Articles</h2><p>Add or remove links to news articles.</p></Link>
                <Link href="/admin/annual-reports" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"><h2 className="text-2xl font-semibold mb-2">Manage Annual Reports</h2><p>Add or remove annual report PDFs.</p></Link>
            </div>
        </div>
    );
}


