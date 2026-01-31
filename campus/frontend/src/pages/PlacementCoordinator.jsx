import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';

export default function PlacementCoordinator() {
  const { user } = useAuth();
  const [companies, setCompanies] = useState([]);
  const [students, setStudents] = useState([]);
  const [editingCompany, setEditingCompany] = useState(null);
  const [companyForm, setCompanyForm] = useState({ name: '', website: '', minCgpa: '', roles: '' });
  const [errors, setErrors] = useState({});

  // Load mock data from localStorage (or initial)
  useEffect(() => {
    const savedCompanies = JSON.parse(localStorage.getItem('placement_companies') || 'null');
    const savedStudents = JSON.parse(localStorage.getItem('placed_students') || 'null');
    if (savedCompanies) setCompanies(savedCompanies);
    else setCompanies([]);
    if (savedStudents) setStudents(savedStudents);
    else setStudents([]);
  }, []);

  useEffect(() => {
    localStorage.setItem('placement_companies', JSON.stringify(companies));
  }, [companies]);

  useEffect(() => {
    localStorage.setItem('placed_students', JSON.stringify(students));
  }, [students]);

  const validateCompany = (form) => {
    const e = {};
    if (!form.name || form.name.trim().length < 2) e.name = 'Company name required';
    if (form.minCgpa && isNaN(Number(form.minCgpa))) e.minCgpa = 'Min CGPA must be a number';
    return e;
  };

  const handleCompanySubmit = (e) => {
    e.preventDefault();
    const v = validateCompany(companyForm);
    setErrors(v);
    if (Object.keys(v).length) return;

    if (editingCompany) {
      setCompanies((prev) => prev.map((c) => (c.id === editingCompany ? { ...c, ...companyForm } : c)));
      setEditingCompany(null);
    } else {
      setCompanies((prev) => [...prev, { id: Date.now(), ...companyForm }]);
    }

    setCompanyForm({ name: '', website: '', minCgpa: '', roles: '' });
  };

  const handleEditCompany = (c) => {
    setEditingCompany(c.id);
    setCompanyForm({ name: c.name, website: c.website, minCgpa: c.minCgpa, roles: c.roles });
  };

  const handleDeleteCompany = (id) => {
    if (!window.confirm('Delete this company?')) return;
    setCompanies((prev) => prev.filter((c) => c.id !== id));
  };

  const stats = {
    totalCompanies: companies.length,
    totalPlaced: students.length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Placement Coordinator Dashboard</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <h3 className="text-lg font-semibold mb-2">Welcome</h3>
            <p className="text-sm text-gray-700">{user?.name || 'Coordinator'}</p>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold mb-2">Companies</h3>
            <p className="text-2xl font-bold text-primary">{stats.totalCompanies}</p>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold mb-2">Placed Students</h3>
            <p className="text-2xl font-bold text-primary">{stats.totalPlaced}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="card">
            <h2 className="text-xl font-bold mb-4">Add / Edit Company</h2>
            <form onSubmit={handleCompanySubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-semibold mb-1">Company Name</label>
                <input
                  className="w-full px-3 py-2 border rounded-lg"
                  value={companyForm.name}
                  onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                />
                {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Website</label>
                <input
                  className="w-full px-3 py-2 border rounded-lg"
                  value={companyForm.website}
                  onChange={(e) => setCompanyForm({ ...companyForm, website: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Min CGPA</label>
                <input
                  className="w-full px-3 py-2 border rounded-lg"
                  value={companyForm.minCgpa}
                  onChange={(e) => setCompanyForm({ ...companyForm, minCgpa: e.target.value })}
                />
                {errors.minCgpa && <p className="text-xs text-red-600">{errors.minCgpa}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Roles (comma separated)</label>
                <input
                  className="w-full px-3 py-2 border rounded-lg"
                  value={companyForm.roles}
                  onChange={(e) => setCompanyForm({ ...companyForm, roles: e.target.value })}
                />
              </div>

              <div className="flex gap-3">
                <button className="btn-primary" type="submit">{editingCompany ? 'Update' : 'Add'} Company</button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => { setCompanyForm({ name: '', website: '', minCgpa: '', roles: '' }); setEditingCompany(null); setErrors({}); }}
                >
                  Reset
                </button>
              </div>
            </form>
          </section>

          <section className="card">
            <h2 className="text-xl font-bold mb-4">Companies</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Min CGPA</th>
                    <th className="px-4 py-2 text-left">Roles</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {companies.map((c) => (
                    <tr key={c.id} className="border-b">
                      <td className="px-4 py-2">{c.name}</td>
                      <td className="px-4 py-2">{c.minCgpa || '-'}</td>
                      <td className="px-4 py-2">{c.roles}</td>
                      <td className="px-4 py-2 text-center">
                        <button onClick={() => handleEditCompany(c)} className="text-sm text-primary mr-2">Edit</button>
                        <button onClick={() => handleDeleteCompany(c.id)} className="text-sm text-red-600">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <section className="card mt-6">
          <h2 className="text-xl font-bold mb-4">Placed Students (Upload / Edit)</h2>
          <p className="text-sm text-gray-700 mb-3">Upload CSV or add manually (for now, use manual add below)</p>

          <PlacedStudentsEditor students={students} setStudents={setStudents} />
        </section>
      </div>
    </div>
  );
}

function PlacedStudentsEditor({ students, setStudents }) {
  const [form, setForm] = useState({ name: '', roll: '', company: '', package: '' });
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.roll) return alert('Name and Roll required');
    if (editId) {
      setStudents((prev) => prev.map((s) => (s.id === editId ? { ...s, ...form } : s)));
      setEditId(null);
    } else {
      setStudents((prev) => [...prev, { id: Date.now(), ...form }]);
    }
    setForm({ name: '', roll: '', company: '', package: '' });
  };

  const handleEdit = (s) => { setEditId(s.id); setForm({ name: s.name, roll: s.roll, company: s.company, package: s.package }); };
  const handleDelete = (id) => { if (!window.confirm('Delete student?')) return; setStudents((prev) => prev.filter((s) => s.id !== id)); };

  return (
    <div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        <input className="px-3 py-2 border rounded-lg" placeholder="Student Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="px-3 py-2 border rounded-lg" placeholder="Roll No" value={form.roll} onChange={(e) => setForm({ ...form, roll: e.target.value })} />
        <input className="px-3 py-2 border rounded-lg" placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
        <div className="flex gap-3">
          <input className="px-3 py-2 border rounded-lg flex-1" placeholder="Package" value={form.package} onChange={(e) => setForm({ ...form, package: e.target.value })} />
          <button className="btn-primary" type="submit">{editId ? 'Update' : 'Add'}</button>
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Roll</th>
              <th className="px-4 py-2 text-left">Company</th>
              <th className="px-4 py-2 text-left">Package</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-b">
                <td className="px-4 py-2">{s.name}</td>
                <td className="px-4 py-2">{s.roll}</td>
                <td className="px-4 py-2">{s.company}</td>
                <td className="px-4 py-2">{s.package}</td>
                <td className="px-4 py-2 text-center">
                  <button onClick={() => handleEdit(s)} className="text-sm text-primary mr-2">Edit</button>
                  <button onClick={() => handleDelete(s.id)} className="text-sm text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
