"use client";
import React, { useState, useEffect } from 'react';

export default function ManageGalleryImages() {
    const [images, setImages] = useState([]);
    const [form, setForm] = useState({ src: '', caption: '' });
    const [editing, setEditing] = useState(null);

    useEffect(() => { fetchData() }, []);

    const fetchData = async () => {
        const res = await fetch('/api/gallery-images');
        setImages(await res.json());
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editing ? 'PUT' : 'POST';
        const url = editing ? `/api/admin/gallery-images/${editing.id}` : '/api/admin/gallery-images';
        await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
        resetForm();
        fetchData();
    };

    const editImage = (image) => {
        setEditing(image);
        setForm(image);
    };

    const deleteImage = async (id) => {
        if (window.confirm("Are you sure?")) {
            await fetch(`/api/admin/gallery-images/${id}`, { method: 'DELETE' });
            fetchData();
        }
    };
    
    const resetForm = () => {
        setEditing(null);
        setForm({ src: '', caption: '' });
    };

    return (
        <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Manage Gallery Images</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="space-y-4 mb-6 p-4 border rounded-lg">
                    <h3 className="text-lg font-medium">{editing ? 'Edit Image' : 'Add New Image'}</h3>
                    <input name="src" value={form.src} onChange={handleChange} placeholder="Image URL" className="w-full p-2 border rounded" required />
                    <input name="caption" value={form.caption} onChange={handleChange} placeholder="Caption" className="w-full p-2 border rounded" required />
                    <div className="flex gap-4">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">{editing ? 'Update' : 'Add'}</button>
                        {editing && <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>}
                    </div>
                </form>
                <div className="space-y-2">
                    {images.map(image => (
                        <div key={image.id} className="flex items-center justify-between p-2 border rounded">
                            <img src={image.src} alt={image.caption} className="w-16 h-16 object-cover rounded-md mr-4"/>
                            <span className="flex-grow">{image.caption}</span>
                            <div className="flex gap-2">
                                <button onClick={() => editImage(image)} className="text-sm bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                                <button onClick={() => deleteImage(image.id)} className="text-sm bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
