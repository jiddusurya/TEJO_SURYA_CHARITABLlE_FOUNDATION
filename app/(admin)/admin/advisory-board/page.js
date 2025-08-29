"use client";
import React, { useState, useEffect } from 'react';

export default function ManageAdvisoryBoard() {
    const [members, setMembers] = useState([]);
    const [form, setForm] = useState({ imgSrc: '', name: '', title: '', role: '', description: '', isVisible: true });
    const [editing, setEditing] = useState(null);

    useEffect(() => { fetchData() }, []);

    const fetchData = async () => {
        const res = await fetch('/api/admin/advisory-board');
        setMembers(await res.json());
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editing ? 'PUT' : 'POST';
        const url = editing ? `/api/admin/advisory-board/${editing.id}` : '/api/admin/advisory-board';
        await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
        resetForm();
        fetchData();
    };

    const editMember = (member) => {
        setEditing(member);
        setForm(member);
    };

    const deleteMember = async (id) => {
        if (window.confirm("Are you sure?")) {
            await fetch(`/api/admin/advisory-board/${id}`, { method: 'DELETE' });
            fetchData();
        }
    };
    
    const resetForm = () => {
        setEditing(null);
        setForm({ imgSrc: '', name: '', title: '', role: '', description: '', isVisible: true });
    };

    return (
        <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Manage Advisory Board</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="space-y-4 mb-6 p-4 border rounded-lg">
                    <h3 className="text-lg font-medium">{editing ? 'Edit Member' : 'Add New Member'}</h3>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Member Name" className="w-full p-2 border rounded" required />
                    <input name="title" value={form.title} onChange={handleChange} placeholder="Title (e.g., Senior Advisor)" className="w-full p-2 border rounded" required />
                    <input name="role" value={form.role} onChange={handleChange} placeholder="Role (e.g., Gynecologist, MD)" className="w-full p-2 border rounded" required />
                    <input name="imgSrc" value={form.imgSrc} onChange={handleChange} placeholder="Image URL" className="w-full p-2 border rounded" required />
                    <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" required />
                    <label className="flex items-center gap-2">
                        <input name="isVisible" type="checkbox" checked={form.isVisible} onChange={handleChange} className="form-checkbox" />
                        <span>Visible on public page</span>
                    </label>
                    <div className="flex gap-4">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">{editing ? 'Update Member' : 'Add Member'}</button>
                        {editing && <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>}
                    </div>
                </form>
                <div className="space-y-2">
                    {members.map(member => (
                        <div key={member.id} className={`flex items-center justify-between p-2 border rounded ${member.isVisible ? 'bg-white' : 'bg-gray-200'}`}>
                           <img src={member.imgSrc} alt={member.name} className="w-12 h-12 object-cover rounded-full mr-4"/>
                           <span className="flex-grow font-semibold">{member.name}</span>
                           <span className={`text-sm font-bold px-2 py-1 rounded-full ${member.isVisible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                               {member.isVisible ? 'Visible' : 'Hidden'}
                           </span>
                            <div className="flex gap-2 ml-4">
                                <button onClick={() => editMember(member)} className="text-sm bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                                <button onClick={() => deleteMember(member.id)} className="text-sm bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
