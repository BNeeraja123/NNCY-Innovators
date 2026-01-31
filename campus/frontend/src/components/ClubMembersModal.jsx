import React, { useState, useEffect } from 'react';

const ClubMembersModal = ({ isOpen, onClose, clubName = '', currentMembers = [], loading = false, onUpdateMembers }) => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [newMember, setNewMember] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('member');
  const [showAddMember, setShowAddMember] = useState(false);

  useEffect(() => {
    if (Array.isArray(currentMembers)) {
      setMembers(currentMembers);
    } else {
      setMembers([]);
    }
  }, [currentMembers, isOpen]);

  const handleAddMember = () => {
    if (newMember.trim()) {
      const member = {
        id: Date.now(),
        name: newMember.trim(),
        role: newMemberRole,
        joinedDate: new Date().toLocaleDateString(),
        status: 'active'
      };
      setMembers([...members, member]);
      setNewMember('');
      setNewMemberRole('member');
      setShowAddMember(false);
    }
  };

  const handleRemoveMember = (id) => {
    if (window.confirm('Are you sure you want to remove this member?')) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  const handleRoleChange = (id, newRole) => {
    setMembers(members.map(m => m.id === id ? { ...m, role: newRole } : m));
  };

  const handleSaveMembers = () => {
    onUpdateMembers?.(members);
    onClose();
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || member.role === filterRole;
    return matchesSearch && matchesRole;
  });

  if (!isOpen) return null;

  const roles = ['member', 'core_team', 'officer', 'president'];
  const memberStats = {
    total: members.length,
    officers: members.filter(m => m.role === 'officer').length,
    coreTeam: members.filter(m => m.role === 'core_team').length
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto py-8">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">
            👥 Manage Club Members - {clubName}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 p-1 rounded"
            disabled={loading}
          >
            ✕
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-orange-600">{memberStats.total}</p>
              <p className="text-sm text-gray-600">Total Members</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-blue-600">{memberStats.officers}</p>
              <p className="text-sm text-gray-600">Officers</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-green-600">{memberStats.coreTeam}</p>
              <p className="text-sm text-gray-600">Core Team</p>
            </div>
          </div>

          {/* Add Member Section */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <button
              onClick={() => setShowAddMember(!showAddMember)}
              className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              {showAddMember ? '✕ Cancel' : '+ Add New Member'}
            </button>

            {showAddMember && (
              <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Member Name
                    </label>
                    <input
                      type="text"
                      value={newMember}
                      onChange={(e) => setNewMember(e.target.value)}
                      placeholder="Enter member name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddMember()}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Role
                    </label>
                    <select
                      value={newMemberRole}
                      onChange={(e) => setNewMemberRole(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {roles.map(role => (
                        <option key={role} value={role}>
                          {role.replace('_', ' ').toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  onClick={handleAddMember}
                  disabled={!newMember.trim()}
                  className="w-full px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition disabled:opacity-50"
                >
                  Add Member
                </button>
              </div>
            )}
          </div>

          {/* Search and Filter */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <input
                type="text"
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">All Roles</option>
                {roles.map(role => (
                  <option key={role} value={role}>
                    {role.replace('_', ' ').toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Members List */}
          <div className="space-y-3 mb-6">
            {filteredMembers.length > 0 ? (
              filteredMembers.map(member => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{member.name}</p>
                    <p className="text-xs text-gray-500">
                      Joined: {member.joinedDate} • Status: {member.status}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <select
                      value={member.role}
                      onChange={(e) => handleRoleChange(member.id, e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {roles.map(role => (
                        <option key={role} value={role}>
                          {role.replace('_', ' ').toUpperCase()}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleRemoveMember(member.id)}
                      className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition font-semibold text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p className="text-lg">No members found</p>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition disabled:opacity-50"
            >
              Close
            </button>
            <button
              onClick={handleSaveMembers}
              disabled={loading}
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubMembersModal;
