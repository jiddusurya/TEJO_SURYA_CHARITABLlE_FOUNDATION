"use client";
import React, { useEffect, useState } from 'react';

export default function ManageCoreValues() {
  const [values, setValues] = useState([]);
  const [form, setForm] = useState({ icon: 'heart', title: '', color: 'blue', description: '', isVisible: true });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch('/api/admin/core-values');
    setValues(await res.json());
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editing ? 'PUT' : 'POST';
    const url = editing ? `/api/admin/core-values/${editing.id}` : '/api/admin/core-values';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    resetForm();
    fetchData();
  };

  const editValue = (value) => {
    setEditing(value);
    setForm(value);
  };

  const deleteValue = async (id) => {
    if (window.confirm('Are you sure?')) {
      await fetch(`/api/admin/core-values/${id}`, { method: 'DELETE' });
      fetchData();
    }
  };

  const resetForm = () => {
    setEditing(null);
    setForm({ icon: 'heart', title: '', color: 'blue', description: '', isVisible: true });
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Manage Core Values</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4 mb-6 p-4 border rounded-lg">
          <h3 className="text-lg font-medium">{editing ? 'Edit Value Tile' : 'Add Value Tile'}</h3>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title (e.g., Compassion)"
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

          <select name="icon" value={form.icon} onChange={handleChange} className="w-full p-2 border rounded" required>
            <option value="heart">heart</option>
            <option value="sparkle">sparkle</option>
            <option value="handshake">handshake</option>
            <option value="bookOpen">bookOpen</option>
            <option value="leaf">leaf</option>
            <option value="lightbulb">lightbulb</option>
          </select>

          <select name="color" value={form.color} onChange={handleChange} className="w-full p-2 border rounded" required>
            <option value="blue">blue</option>
            <option value="orange">orange</option>
            <option value="yellow">yellow</option>
            <option value="red">red</option>
            <option value="green">green</option>
            <option value="amber">amber</option>
          </select>

          <label className="flex items-center gap-2">
            <input name="isVisible" type="checkbox" checked={form.isVisible} onChange={handleChange} className="form-checkbox" />
            <span>Visible on public page</span>
          </label>

          <div className="flex gap-4">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              {editing ? 'Update Value' : 'Add Value'}
            </button>
            {editing && (
              <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="space-y-2">
          {values.map((value) => (
            <div key={value.id} className={`flex items-center justify-between p-3 border rounded ${value.isVisible ? 'bg-white' : 'bg-gray-200'}`}>
              <span className="flex-grow font-semibold">{value.title}</span>
              <span className="text-sm text-gray-600 mr-4">{value.icon} • {value.color}</span>
              <span className={`text-sm font-bold px-2 py-1 rounded-full ${value.isVisible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {value.isVisible ? 'Visible' : 'Hidden'}
              </span>
              <div className="flex gap-2 ml-4">
                <button onClick={() => editValue(value)} className="text-sm bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                <button onClick={() => deleteValue(value.id)} className="text-sm bg-red-500 text-white px-3 py-1 rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
