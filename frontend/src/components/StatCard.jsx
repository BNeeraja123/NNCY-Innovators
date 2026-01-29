import React from 'react';

export default function StatCard({ title, value, icon, color = 'bg-blue-100' }) {
  return (
    <div className={`${color} rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-bold mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
        <span className="text-4xl">{icon}</span>
      </div>
    </div>
  );
}
