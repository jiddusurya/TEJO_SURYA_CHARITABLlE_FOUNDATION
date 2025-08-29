"use client";
import React, { useState, useEffect } from 'react';

export default function ManageVideoTestimonials() {
    const [videos, setVideos] = useState([]);
    const [form, setForm] = useState({ youtubeUrl: '', title: '', description: '' });
    const [editing, setEditing] = useState(null);

    useEffect(() => { fetchData() }, []);

    const fetchData = async () => {
        const res = await fetch('/api/video-testimonials');
        setVideos(await res.json());
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editing ? 'PUT' : 'POST';
        const url = editing ? `/api/admin/video-testimonials/${editing.id}` : '/api/admin/video-testimonials';
        await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
        resetForm();
        fetchData();
    };

    const editVideo = (video) => {
        setEditing(video);
        setForm(video);
    };

    const deleteVideo = async (id) => {
        if (window.confirm("Are you sure?")) {
            await fetch(`/api/admin/video-testimonials/${id}`, { method: 'DELETE' });
            fetchData();
        }
    };
    
    const resetForm = () => {
        setEditing(null);
        setForm({ youtubeUrl: '', title: '', description: '' });
    };

    return (
        <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Manage Video Testimonials</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="space-y-4 mb-6 p-4 border rounded-lg">
                    <h3 className="text-lg font-medium">{editing ? 'Edit Video' : 'Add New Video'}</h3>
                    <input name="youtubeUrl" value={form.youtubeUrl} onChange={handleChange} placeholder="YouTube Video URL" className="w-full p-2 border rounded" required />
                    <input name="title" value={form.title} onChange={handleChange} placeholder="Video Title" className="w-full p-2 border rounded" required />
                    <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" required />
                    <div className="flex gap-4">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">{editing ? 'Update' : 'Add'}</button>
                        {editing && <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>}
                    </div>
                </form>
                <div className="space-y-2">
                    {videos.map(video => (
                        <div key={video.id} className="flex items-center justify-between p-2 border rounded">
                           <span className="flex-grow">{video.title}</span>
                            <div className="flex gap-2">
                                <button onClick={() => editVideo(video)} className="text-sm bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                                <button onClick={() => deleteVideo(video.id)} className="text-sm bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
