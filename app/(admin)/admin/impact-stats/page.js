"use client";
import React, { useState, useEffect } from 'react';

export default function ManageImpactStats() {
    const [impactStats, setImpactStats] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [statForm, setStatForm] = useState({ id: '', label: '', count: '', icon: 'users' });

    const availableIcons = ['users', 'school', 'clipboard', 'userCheck', 'mapPin', 'handshake', 'checkCircle'];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const res = await fetch('/api/impact-stats');
        setImpactStats(await res.json());
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setStatForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const method = isEditing ? 'PUT' : 'POST';
        const url = isEditing ? `/api/admin/impact-stats/${statForm.id}` : '/api/admin/impact-stats';
        
        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(statForm),
        });
        
        resetForm();
        fetchData();
    };
    
    const editStat = (stat) => {
        setIsEditing(true);
        setStatForm(stat);
    };

    const deleteStat = async (id) => {
        if (window.confirm("Are you sure?")) {
            await fetch(`/api/admin/impact-stats/${id}`, { method: 'DELETE' });
            fetchData();
        }
    };
    
    const resetForm = () => {
        setIsEditing(false);
        setStatForm({ id: '', label: '', count: '', icon: 'users' });
    };

    return (
        <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Manage Impact Numbers</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <form onSubmit={handleFormSubmit} className="space-y-4 mb-6 p-4 border rounded-lg">
                    <h3 className="text-lg font-medium">{isEditing ? 'Edit Stat' : 'Add New Stat'}</h3>
                    <input name="label" value={statForm.label} onChange={handleFormChange} placeholder="Label (e.g., Girls Served)" className="w-full p-2 border rounded" required />
                    <input name="count" type="number" value={statForm.count} onChange={handleFormChange} placeholder="Count (e.g., 1000)" className="w-full p-2 border rounded" required />
                    <select name="icon" value={statForm.icon} onChange={handleFormChange} className="w-full p-2 border rounded bg-white">
                        {availableIcons.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                    </select>
                    <div className="flex gap-4">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">{isEditing ? 'Update Stat' : 'Add Stat'}</button>
                        {isEditing && <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel</button>}
                    </div>
                </form>

                <div className="space-y-2">
                    {impactStats.map(stat => (
                        <div key={stat.id} className="flex items-center justify-between p-2 border rounded">
                            <span>{stat.label}: <span className="font-bold">{stat.count}</span></span>
                            <div className="flex gap-2">
                                <button onClick={() => editStat(stat)} className="text-sm bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                                <button onClick={() => deleteStat(stat.id)} className="text-sm bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
