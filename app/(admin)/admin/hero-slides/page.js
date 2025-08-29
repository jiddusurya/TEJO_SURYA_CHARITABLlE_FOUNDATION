"use client";
import React, { useState, useEffect } from 'react';

export default function ManageHeroSlides() {
    const [heroSlides, setHeroSlides] = useState([]);
    const [slideForm, setSlideForm] = useState({ imgSrc: '', title: '', subtitle: '', description: '' });
    const [editingSlide, setEditingSlide] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const res = await fetch('/api/hero-slides');
        setHeroSlides(await res.json());
    };

    const handleSlideChange = (e) => {
        const { name, value } = e.target;
        setSlideForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSlideSubmit = async (e) => {
        e.preventDefault();
        const method = editingSlide ? 'PUT' : 'POST';
        const url = editingSlide ? `/api/admin/hero-slides/${editingSlide.id}` : '/api/admin/hero-slides';
        
        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(slideForm),
        });
        
        setSlideForm({ imgSrc: '', title: '', subtitle: '', description: '' });
        setEditingSlide(null);
        fetchData();
    };
    
    const editSlide = (slide) => {
        setEditingSlide(slide);
        setSlideForm(slide);
    };

    const deleteSlide = async (id) => {
        if (window.confirm("Are you sure?")) {
            await fetch(`/api/admin/hero-slides/${id}`, { method: 'DELETE' });
            fetchData();
        }
    };

    return (
        <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Manage Hero Carousel</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <form onSubmit={handleSlideSubmit} className="space-y-4 mb-6 p-4 border rounded-lg">
                    <h3 className="text-lg font-medium">{editingSlide ? 'Edit Slide' : 'Add New Slide'}</h3>
                    <input name="imgSrc" value={slideForm.imgSrc} onChange={handleSlideChange} placeholder="Image URL" className="w-full p-2 border rounded" required />
                    <input name="title" value={slideForm.title} onChange={handleSlideChange} placeholder="Title" className="w-full p-2 border rounded" required />
                    <input name="subtitle" value={slideForm.subtitle} onChange={handleSlideChange} placeholder="Subtitle" className="w-full p-2 border rounded" required />
                    <textarea name="description" value={slideForm.description} onChange={handleSlideChange} placeholder="Description" className="w-full p-2 border rounded" required />
                    <div className="flex gap-4">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">{editingSlide ? 'Update Slide' : 'Add Slide'}</button>
                        {editingSlide && <button type="button" onClick={() => { setEditingSlide(null); setSlideForm({ imgSrc: '', title: '', subtitle: '', description: '' }); }} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel</button>}
                    </div>
                </form>
                <div className="space-y-2">
                    {heroSlides.map(slide => (
                        <div key={slide.id} className="flex items-center justify-between p-2 border rounded">
                            <span>{slide.title}</span>
                            <div className="flex gap-2">
                                <button onClick={() => editSlide(slide)} className="text-sm bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                                <button onClick={() => deleteSlide(slide.id)} className="text-sm bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}