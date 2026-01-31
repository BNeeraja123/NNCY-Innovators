import React, { useState, useEffect } from 'react';

const EventRegistrationsModal = ({ isOpen, onClose, event, registrations = [], loading = false, onUpdateStatus, onDownloadData }) => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const [filteredRegistrations, setFilteredRegistrations] = useState(registrations);

  useEffect(() => {
    let filtered = registrations || [];

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(reg => reg.status === filterStatus);
    }

    // Filter by search
    if (searchQuery.trim()) {
      filtered = filtered.filter(reg =>
        reg.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reg.userEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reg.teamName?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredRegistrations(filtered);
  }, [registrations, filterStatus, searchQuery]);

  if (!isOpen) return null;

  const totalRegistrations = registrations?.length || 0;
  const confirmedRegistrations = registrations?.filter(r => r.status === 'confirmed')?.length || 0;
  const pendingRegistrations = registrations?.filter(r => r.status === 'pending')?.length || 0;
  const cancelledRegistrations = registrations?.filter(r => r.status === 'cancelled')?.length || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto py-8">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary-light px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white">{event?.title || 'Event'}</h2>
            <p className="text-white text-opacity-90 text-sm mt-1">Manage Event Registrations</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 p-1 rounded"
            disabled={loading}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-blue-600 text-sm font-semibold">Total Registrations</p>
              <p className="text-blue-900 text-2xl font-bold mt-2">{totalRegistrations}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-green-600 text-sm font-semibold">Confirmed</p>
              <p className="text-green-900 text-2xl font-bold mt-2">{confirmedRegistrations}</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <p className="text-yellow-600 text-sm font-semibold">Pending</p>
              <p className="text-yellow-900 text-2xl font-bold mt-2">{pendingRegistrations}</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <p className="text-red-600 text-sm font-semibold">Cancelled</p>
              <p className="text-red-900 text-2xl font-bold mt-2">{cancelledRegistrations}</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name, email, or team..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={loading}
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={loading}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button
              onClick={() => onDownloadData?.(filteredRegistrations)}
              disabled={loading || filteredRegistrations.length === 0}
              className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
            >
              Download CSV
            </button>
          </div>

          {/* Registrations Table */}
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Registration Type</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Team Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredRegistrations && filteredRegistrations.length > 0 ? (
                  filteredRegistrations.map((registration) => (
                    <tr key={registration.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-800">{registration.userName || 'N/A'}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{registration.userEmail || 'N/A'}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold">
                          {registration.registrationType || 'Individual'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{registration.teamName || '-'}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                          registration.status === 'confirmed' ? 'bg-green-50 text-green-700' :
                          registration.status === 'pending' ? 'bg-yellow-50 text-yellow-700' :
                          'bg-red-50 text-red-700'
                        }`}>
                          {registration.status?.charAt(0).toUpperCase() + registration.status?.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex gap-2">
                          {registration.status !== 'confirmed' && (
                            <button
                              onClick={() => onUpdateStatus?.(registration.id, 'confirmed')}
                              disabled={loading}
                              className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition disabled:opacity-50"
                              title="Confirm registration"
                            >
                              Confirm
                            </button>
                          )}
                          {registration.status !== 'cancelled' && (
                            <button
                              onClick={() => onUpdateStatus?.(registration.id, 'cancelled')}
                              disabled={loading}
                              className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition disabled:opacity-50"
                              title="Cancel registration"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                      No registrations found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="mt-6 flex justify-between items-center pt-4 border-t">
            <p className="text-sm text-gray-600">
              Showing {filteredRegistrations?.length || 0} of {totalRegistrations} registrations
            </p>
            <button
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition disabled:opacity-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventRegistrationsModal;
