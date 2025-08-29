"use client";
import React, { useState, useEffect } from 'react';

export default function ManageGoalStats() {
    const [goals, setGoals] = useState([]);
    const [form, setForm] = useState({ label: '', count: '', suffix: '', prefix: '', formatAsLakh: false });
    const [editing, setEditing] = useState(null);

    useEffect(() => { fetchData() }, []);

    const fetchData = async () => {
        const res = await fetch('/api/goal-stats');
        setGoals(await res.json());
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editing ? 'PUT' : 'POST';
        const url = editing ? `/api/admin/goal-stats/${editing.id}` : '/api/admin/goal-stats';
        await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
        resetForm();
        fetchData();
    };

    const editGoal = (goal) => {
        setEditing(goal);
        setForm(goal);
    };

    const deleteGoal = async (id) => {
        if (window.confirm("Are you sure?")) {
            await fetch(`/api/admin/goal-stats/${id}`, { method: 'DELETE' });
            fetchData();
        }
    };
    
    const resetForm = () => {
        setEditing(null);
        setForm({ label: '', count: '', suffix: '', prefix: '', formatAsLakh: false });
    };

    return (
        <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Manage Impact & Goals</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="space-y-4 mb-6 p-4 border rounded-lg">
                    <h3 className="text-lg font-medium">{editing ? 'Edit Goal' : 'Add New Goal'}</h3>
                    <input name="label" value={form.label} onChange={handleChange} placeholder="Label (e.g., High Schools Aimed)" className="w-full p-2 border rounded" required />
                    <input name="count" type="number" value={form.count} onChange={handleChange} placeholder="Count (e.g., 75000)" className="w-full p-2 border rounded" required />
                    <input name="prefix" value={form.prefix} onChange={handleChange} placeholder="Prefix (e.g., $)" className="w-full p-2 border rounded" />
                    <input name="suffix" value={form.suffix} onChange={handleChange} placeholder="Suffix (e.g., +)" className="w-full p-2 border rounded" />
                    <label className="flex items-center gap-2">
                        <input name="formatAsLakh" type="checkbox" checked={form.formatAsLakh} onChange={handleChange} className="form-checkbox" />
                        <span>Format as Lakh</span>
                    </label>
                    <div className="flex gap-4">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">{editing ? 'Update Goal' : 'Add Goal'}</button>
                        {editing && <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>}
                    </div>
                </form>
                <div className="space-y-2">
                    {goals.map(goal => (
                        <div key={goal.id} className="flex items-center justify-between p-2 border rounded">
                           <span className="flex-grow font-semibold">{goal.label}: {goal.count}</span>
                            <div className="flex gap-2">
                                <button onClick={() => editGoal(goal)} className="text-sm bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                                <button onClick={() => deleteGoal(goal.id)} className="text-sm bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
