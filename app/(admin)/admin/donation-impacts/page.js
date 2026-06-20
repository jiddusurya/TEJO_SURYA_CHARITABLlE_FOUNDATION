"use client";
import React, { useEffect, useState } from 'react';
import ReorderableList from '../components/ReorderableList';

export default function ManageDonationImpacts() {
  const [impacts, setImpacts] = useState([]);
  const [form, setForm] = useState({ amount: '', title: '', description: '', isVisible: true });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch('/api/admin/donation-impacts');
    setImpacts(await res.json());
  };

  const saveOrder = async (items) => {
    await Promise.all(items.map((impact, index) => (
      fetch(`/api/admin/donation-impacts/${impact.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...impact, sortOrder: index }),
      })
    )));
    fetchData();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editing ? 'PUT' : 'POST';
    const url = editing ? `/api/admin/donation-impacts/${editing.id}` : '/api/admin/donation-impacts';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    resetForm();
    fetchData();
  };

  const editImpact = (impact) => {
    setEditing(impact);
    setForm(impact);
  };

  const deleteImpact = async (id) => {
    if (window.confirm('Are you sure?')) {
      await fetch(`/api/admin/donation-impacts/${id}`, { method: 'DELETE' });
      fetchData();
    }
  };

  const resetForm = () => {
    setEditing(null);
    setForm({ amount: '', title: '', description: '', isVisible: true });
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Manage Donation Impacts</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4 mb-6 p-4 border rounded-lg">
          <h3 className="text-lg font-medium">{editing ? 'Edit Impact Tile' : 'Add Impact Tile'}</h3>

          <input
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            placeholder="Amount (e.g., 1500)"
            className="w-full p-2 border rounded"
            required
          />

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-2 border rounded"
            required
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border rounded"
            rows={3}
            required
          />

          <label className="flex items-center gap-2">
            <input name="isVisible" type="checkbox" checked={form.isVisible} onChange={handleChange} className="form-checkbox" />
            <span>Visible on public page</span>
          </label>

          <div className="flex gap-4">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              {editing ? 'Update Impact' : 'Add Impact'}
            </button>
            {editing && (
              <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            )}
          </div>
        </form>

        <ReorderableList
          items={impacts}
          setItems={setImpacts}
          onSaveOrder={saveOrder}
          renderItem={(impact, index, { dragProps, isDragging }) => (
            <div key={impact.id} {...dragProps} className={`flex items-center justify-between rounded border p-3 ${impact.isVisible ? 'bg-white' : 'bg-gray-200'} ${isDragging ? 'ring-2 ring-blue-300' : ''}`}>
              <div className="flex items-center gap-3">
                <span className="cursor-grab text-gray-400">⋮⋮</span>
                <span className="flex-grow font-semibold">Rs {impact.amount}: {impact.title}</span>
              </div>
              <span className={`text-sm font-bold px-2 py-1 rounded-full ${impact.isVisible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {impact.isVisible ? 'Visible' : 'Hidden'}
              </span>
              <div className="ml-4 flex gap-2">
                <button onClick={() => editImpact(impact)} className="text-sm bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                <button onClick={() => deleteImpact(impact.id)} className="text-sm bg-red-500 text-white px-3 py-1 rounded">Delete</button>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}
