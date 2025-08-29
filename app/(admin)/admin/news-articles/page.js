"use client";
import React, { useState, useEffect } from 'react';

export default function ManageNewsArticles() {
    const [articles, setArticles] = useState([]);
    const [form, setForm] = useState({ imageUrl: '', title: '', articleUrl: '', source: '' });
    const [editing, setEditing] = useState(null);

    useEffect(() => { fetchData() }, []);

    const fetchData = async () => {
        const res = await fetch('/api/news-articles');
        setArticles(await res.json());
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editing ? 'PUT' : 'POST';
        const url = editing ? `/api/admin/news-articles/${editing.id}` : '/api/admin/news-articles';
        await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
        resetForm();
        fetchData();
    };

    const editArticle = (article) => {
        setEditing(article);
        setForm(article);
    };

    const deleteArticle = async (id) => {
        if (window.confirm("Are you sure?")) {
            await fetch(`/api/admin/news-articles/${id}`, { method: 'DELETE' });
            fetchData();
        }
    };
    
    const resetForm = () => {
        setEditing(null);
        setForm({ imageUrl: '', title: '', articleUrl: '', source: '' });
    };

    return (
        <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Manage News Articles</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="space-y-4 mb-6 p-4 border rounded-lg">
                    <h3 className="text-lg font-medium">{editing ? 'Edit Article' : 'Add New Article'}</h3>
                    <input name="title" value={form.title} onChange={handleChange} placeholder="Article Title" className="w-full p-2 border rounded" required />
                    <input name="articleUrl" value={form.articleUrl} onChange={handleChange} placeholder="URL to Full Article" className="w-full p-2 border rounded" required />
                    <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Image URL for the Card" className="w-full p-2 border rounded" required />
                    <input name="source" value={form.source} onChange={handleChange} placeholder="News Source (e.g., The Hindu)" className="w-full p-2 border rounded" required />
                    <div className="flex gap-4">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">{editing ? 'Update' : 'Add'}</button>
                        {editing && <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>}
                    </div>
                </form>
                <div className="space-y-2">
                    {articles.map(article => (
                        <div key={article.id} className="flex items-center justify-between p-2 border rounded">
                           <img src={article.imageUrl} alt={article.title} className="w-16 h-16 object-cover rounded-md mr-4"/>
                           <span className="flex-grow">{article.title}</span>
                            <div className="flex gap-2">
                                <button onClick={() => editArticle(article)} className="text-sm bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                                <button onClick={() => deleteArticle(article.id)} className="text-sm bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
