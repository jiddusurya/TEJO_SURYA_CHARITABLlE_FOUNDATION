"use client";
import React, { useState, useEffect } from 'react';

export default function ManageMentors() {
    const [mentors, setMentors] = useState([]);
    const [form, setForm] = useState({ imgSrc: '', name: '', title: '', tags: '', isVisible: true });
    const [editing, setEditing] = useState(null);

    useEffect(() => { fetchData() }, []);

    const fetchData = async () => {
        const res = await fetch('/api/admin/mentors');
        setMentors(await res.json());
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editing ? 'PUT' : 'POST';
        const url = editing ? `/api/admin/mentors/${editing.id}` : '/api/admin/mentors';
        await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
        resetForm();
        fetchData();
    };

    const editMentor = (mentor) => {
        setEditing(mentor);
        // Convert tags array back to a comma-separated string for the form
        setForm({ ...mentor, tags: mentor.tags.join(', ') });
    };

    const deleteMentor = async (id) => {
        if (window.confirm("Are you sure?")) {
            await fetch(`/api/admin/mentors/${id}`, { method: 'DELETE' });
            fetchData();
        }
    };
    
    const resetForm = () => {
        setEditing(null);
        setForm({ imgSrc: '', name: '', title: '', tags: '', isVisible: true });
    };

    return (
        <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Manage Mentors</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="space-y-4 mb-6 p-4 border rounded-lg">
                    <h3 className="text-lg font-medium">{editing ? 'Edit Mentor' : 'Add New Mentor'}</h3>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Mentor Name" className="w-full p-2 border rounded" required />
                    <input name="title" value={form.title} onChange={handleChange} placeholder="Title (e.g., Pediatric Mentor)" className="w-full p-2 border rounded" required />
                    <input name="imgSrc" value={form.imgSrc} onChange={handleChange} placeholder="Image URL" className="w-full p-2 border rounded" required />
                    <input name="tags" value={form.tags} onChange={handleChange} placeholder="Tags (comma-separated, e.g., Medical, Youth)" className="w-full p-2 border rounded" required />
                    <label className="flex items-center gap-2">
                        <input name="isVisible" type="checkbox" checked={form.isVisible} onChange={handleChange} className="form-checkbox" />
                        <span>Visible on public page</span>
                    </label>
                    <div className="flex gap-4">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">{editing ? 'Update Mentor' : 'Add Mentor'}</button>
                        {editing && <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>}
                    </div>
                </form>
                <div className="space-y-2">
                    {mentors.map(mentor => (
                        <div key={mentor.id} className={`flex items-center justify-between p-2 border rounded ${mentor.isVisible ? 'bg-white' : 'bg-gray-200'}`}>
                           <img src={mentor.imgSrc} alt={mentor.name} className="w-12 h-12 object-cover rounded-full mr-4"/>
                           <span className="flex-grow font-semibold">{mentor.name}</span>
                           <span className={`text-sm font-bold px-2 py-1 rounded-full ${mentor.isVisible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                               {mentor.isVisible ? 'Visible' : 'Hidden'}
                           </span>
                            <div className="flex gap-2 ml-4">
                                <button onClick={() => editMentor(mentor)} className="text-sm bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                                <button onClick={() => deleteMentor(mentor.id)} className="text-sm bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
