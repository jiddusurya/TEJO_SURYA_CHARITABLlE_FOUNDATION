"use client";
import React, { useState, useEffect } from 'react';

export default function ManageImpactStories() {
    const [stories, setStories] = useState([]);
    const [form, setForm] = useState({ title: '', imageUrl: '', content: '', isVisible: true });
    const [editing, setEditing] = useState(null);

    useEffect(() => { fetchData(); }, []);

    const fetchData = async () => {
        const res = await fetch('/api/admin/impact-stories');
        setStories(await res.json());
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editing ? 'PUT' : 'POST';
        const url = editing ? `/api/admin/impact-stories/${editing.id}` : '/api/admin/impact-stories';
        await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
        resetForm();
        fetchData();
    };

    const editStory = (story) => {
        setEditing(story);
        setForm(story);
    };

    const deleteStory = async (id) => {
        if (window.confirm("Are you sure?")) {
            await fetch(`/api/admin/impact-stories/${id}`, { method: 'DELETE' });
            fetchData();
        }
    };
    
    const resetForm = () => {
        setEditing(null);
        setForm({ title: '', imageUrl: '', content: '', isVisible: true });
    };

    return (
        <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Manage Impact Stories</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="space-y-4 mb-6 p-4 border rounded-lg">
                    <h3 className="text-lg font-medium">{editing ? 'Edit Story' : 'Add New Story'}</h3>
                    <input name="title" value={form.title} onChange={handleChange} placeholder="Story Title" className="w-full p-2 border rounded" required />
                    <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Image URL" className="w-full p-2 border rounded" required />
                    <textarea name="content" value={form.content} onChange={handleChange} placeholder="Full Story Content (newlines will be preserved)" className="w-full p-2 border rounded h-32" required />
                    <label className="flex items-center gap-2">
                        <input type="checkbox" name="isVisible" checked={form.isVisible} onChange={handleChange} />
                        <span>Visible on website</span>
                    </label>
                    <div className="flex gap-4">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">{editing ? 'Update Story' : 'Add Story'}</button>
                        {editing && <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>}
                    </div>
                </form>
                <div className="space-y-2">
                    {stories.map(story => (
                        <div key={story.id} className="flex items-center justify-between p-2 border rounded">
                           <span className="font-semibold">{story.title}</span>
                           <span className={`text-sm font-medium px-2 py-1 rounded-full ${story.isVisible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {story.isVisible ? 'Visible' : 'Hidden'}
                            </span>
                            <div className="flex gap-2">
                                <button onClick={() => editStory(story)} className="text-sm bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                                <button onClick={() => deleteStory(story.id)} className="text-sm bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
