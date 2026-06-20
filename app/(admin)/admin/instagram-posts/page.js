"use client";
import React, { useState, useEffect } from 'react';
import ReorderableList from '../components/ReorderableList';

export default function ManageInstagramPosts() {
    const [posts, setPosts] = useState([]);
    const [form, setForm] = useState({ postUrl: '', src: '', caption: '' });
    const [editing, setEditing] = useState(null);

    useEffect(() => { fetchData() }, []);

    const fetchData = async () => {
        const res = await fetch('/api/instagram-posts');
        setPosts(await res.json());
    };

    const saveOrder = async (items) => {
        await Promise.all(items.map((post, index) => (
            fetch(`/api/admin/instagram-posts/${post.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...post, sortOrder: index }),
            })
        )));
        fetchData();
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editing ? 'PUT' : 'POST';
        const url = editing ? `/api/admin/instagram-posts/${editing.id}` : '/api/admin/instagram-posts';
        await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
        resetForm();
        fetchData();
    };

    const editPost = (post) => {
        setEditing(post);
        setForm(post);
    };

    const deletePost = async (id) => {
        if (window.confirm("Are you sure?")) {
            await fetch(`/api/admin/instagram-posts/${id}`, { method: 'DELETE' });
            fetchData();
        }
    };
    
    const resetForm = () => {
        setEditing(null);
        setForm({ postUrl: '', src: '', caption: '' });
    };

    return (
        <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Manage Instagram Posts</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="space-y-4 mb-6 p-4 border rounded-lg">
                    <h3 className="text-lg font-medium">{editing ? 'Edit Post' : 'Add New Post'}</h3>
                    <input name="postUrl" value={form.postUrl} onChange={handleChange} placeholder="Instagram Post URL" className="w-full p-2 border rounded" required />
                    <input name="src" value={form.src} onChange={handleChange} placeholder="Image Source URL" className="w-full p-2 border rounded" required />
                    <input name="caption" value={form.caption} onChange={handleChange} placeholder="Caption" className="w-full p-2 border rounded" required />
                    <div className="flex gap-4">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">{editing ? 'Update' : 'Add'}</button>
                        {editing && <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>}
                    </div>
                </form>
                <ReorderableList
                    items={posts}
                    setItems={setPosts}
                    onSaveOrder={saveOrder}
                    renderItem={(post, index, { dragProps, isDragging }) => (
                        <div key={post.id} {...dragProps} className={`flex items-center justify-between rounded border p-2 ${isDragging ? 'ring-2 ring-blue-300' : ''}`}>
                           <div className="flex items-center gap-3">
                               <span className="cursor-grab text-gray-400">⋮⋮</span>
                               <img src={post.src} alt={post.caption} className="mr-4 h-16 w-16 rounded-md object-cover"/>
                               <a href={post.postUrl} target="_blank" rel="noopener noreferrer" className="flex-grow truncate text-blue-600 hover:underline">{post.postUrl}</a>
                           </div>
                            <div className="flex gap-2">
                                <button onClick={() => editPost(post)} className="text-sm bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                                <button onClick={() => deletePost(post.id)} className="text-sm bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                            </div>
                        </div>
                    )}
                />
            </div>
        </div>
    );
}
