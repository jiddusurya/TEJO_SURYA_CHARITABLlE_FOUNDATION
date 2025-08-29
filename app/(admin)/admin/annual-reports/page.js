"use client";
import React, { useState, useEffect } from 'react';

export default function ManageAnnualReports() {
    const [reports, setReports] = useState([]);
    const [form, setForm] = useState({ year: '', title: '', description: '', fileId: '' });
    const [editing, setEditing] = useState(null);

    useEffect(() => { fetchData() }, []);

    const fetchData = async () => {
        const res = await fetch('/api/annual-reports');
        setReports(await res.json());
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editing ? 'PUT' : 'POST';
        const url = editing ? `/api/admin/annual-reports/${editing.id}` : '/api/admin/annual-reports';
        await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
        resetForm();
        fetchData();
    };

    const editReport = (report) => {
        setEditing(report);
        setForm(report);
    };

    const deleteReport = async (id) => {
        if (window.confirm("Are you sure?")) {
            await fetch(`/api/admin/annual-reports/${id}`, { method: 'DELETE' });
            fetchData();
        }
    };
    
    const resetForm = () => {
        setEditing(null);
        setForm({ year: '', title: '', description: '', fileId: '' });
    };

    return (
        <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Manage Annual Reports</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="space-y-4 mb-6 p-4 border rounded-lg">
                    <h3 className="text-lg font-medium">{editing ? 'Edit Report' : 'Add New Report'}</h3>
                    <input name="year" value={form.year} onChange={handleChange} placeholder="Year (e.g., 2022-23)" className="w-full p-2 border rounded" required />
                    <input name="title" value={form.title} onChange={handleChange} placeholder="Title (e.g., Annual Report)" className="w-full p-2 border rounded" required />
                    <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" required />
                    <input name="fileId" value={form.fileId} onChange={handleChange} placeholder="Google Drive File URL" className="w-full p-2 border rounded" required />
                    <div className="flex gap-4">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">{editing ? 'Update Report' : 'Add Report'}</button>
                        {editing && <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>}
                    </div>
                </form>
                <div className="space-y-2">
                    {reports.map(report => (
                        <div key={report.id} className="flex items-center justify-between p-2 border rounded">
                           <span className="flex-grow font-semibold">{report.year} - {report.title}</span>
                            <div className="flex gap-2">
                                <button onClick={() => editReport(report)} className="text-sm bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                                <button onClick={() => deleteReport(report.id)} className="text-sm bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}