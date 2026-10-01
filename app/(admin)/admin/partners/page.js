"use client";
import React, { useState, useEffect } from 'react';
import ReorderableList from '../components/ReorderableList';

const emptyForm = { logoUrl: '', websiteUrl: '', description: '', isVisible: true };

export default function ManagePartners() {
    const [partners, setPartners] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editing, setEditing] = useState(null);

    useEffect(() => { fetchData() }, []);

    const fetchData = async () => {
        const res = await fetch('/api/admin/partners');
        setPartners(await res.json());
    };

    const saveOrder = async (items) => {
        await Promise.all(items.map((partner, index) => (
            fetch(`/api/admin/partners/${partner.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...partner, sortOrder: index }),
            })
        )));
        fetchData();
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editing ? 'PUT' : 'POST';
        const url = editing ? `/api/admin/partners/${editing.id}` : '/api/admin/partners';
        await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
        resetForm();
        fetchData();
    };

    const editPartner = (partner) => {
        setEditing(partner);
        setForm({ ...partner, websiteUrl: partner.websiteUrl || '', description: partner.description || '' });
    };

    const deletePartner = async (id) => {
        if (window.confirm("Are you sure?")) {
            await fetch(`/api/admin/partners/${id}`, { method: 'DELETE' });
            fetchData();
        }
    };

    const resetForm = () => {
        setEditing(null);
        setForm(emptyForm);
    };

    return (
        <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Manage Partners</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="space-y-4 mb-6 p-4 border rounded-lg">
                    <h3 className="text-lg font-medium">{editing ? 'Edit Partner' : 'Add New Partner'}</h3>
                    <input name="logoUrl" value={form.logoUrl} onChange={handleChange} placeholder="Logo Image URL" className="w-full p-2 border rounded" required />
                    <input name="websiteUrl" value={form.websiteUrl} onChange={handleChange} placeholder="Website URL (optional)" className="w-full p-2 border rounded" />
                    <textarea name="description" value={form.description} onChange={handleChange} placeholder="Short description (optional)" className="w-full p-2 border rounded h-24" />
                    {form.logoUrl && (
                        <div>
                            <p className="text-sm text-gray-600 mb-2">Logo preview (as shown on the website):</p>
                            <div className="h-28 w-48 p-4 bg-white rounded-xl border-2 border-[#e68541] shadow-sm flex items-center justify-center">
                                <img src={form.logoUrl} alt="Logo preview" className="max-h-full max-w-full object-contain" />
                            </div>
                        </div>
                    )}
                    <label className="flex items-center gap-2">
                        <input name="isVisible" type="checkbox" checked={form.isVisible} onChange={handleChange} className="form-checkbox" />
                        <span>Visible on public page</span>
                    </label>
                    <div className="flex gap-4">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">{editing ? 'Update Partner' : 'Add Partner'}</button>
                        {editing && <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>}
                    </div>
                </form>
                <ReorderableList
                    items={partners}
                    setItems={setPartners}
                    onSaveOrder={saveOrder}
                    emptyText="No partners added yet."
                    renderItem={(partner, index, { dragProps, isDragging }) => (
                        <div key={partner.id} {...dragProps} className={`flex items-center justify-between rounded border p-2 ${partner.isVisible ? 'bg-white' : 'bg-gray-200'} ${isDragging ? 'ring-2 ring-blue-300' : ''}`}>
                            <div className="flex items-center">
                                <span className="cursor-grab text-gray-400 mr-3">⋮⋮</span>
                                <div className="mr-4 h-12 w-20 p-1 bg-white rounded border border-gray-100 flex items-center justify-center flex-shrink-0">
                                    <img src={partner.logoUrl} alt="Partner logo" className="max-h-full max-w-full object-contain" />
                                </div>
                                <span className="flex-grow text-sm text-gray-600 truncate">{partner.websiteUrl || 'No website'}</span>
                            </div>
                            <div className="flex items-center">
                                <span className={`text-sm font-bold px-2 py-1 rounded-full ${partner.isVisible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {partner.isVisible ? 'Visible' : 'Hidden'}
                                </span>
                                <div className="ml-4 flex gap-2">
                                    <button onClick={() => editPartner(partner)} className="text-sm bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                                    <button onClick={() => deletePartner(partner.id)} className="text-sm bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                                </div>
                            </div>
                        </div>
                    )}
                />
            </div>
        </div>
    );
}
