import React from 'react';

const FeatureCard = ({ title, subtitle, value, badge, children, actions, className = '' }) => {
  return (
    <div className={`bg-white p-6 rounded-lg shadow hover:shadow-xl transition ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
        {badge && (
          <div className="ml-4">
            <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">{badge}</span>
          </div>
        )}
      </div>

      {value && <p className="text-3xl font-bold text-primary mt-4">{value}</p>}

      {children && <div className="mt-4">{children}</div>}

      {actions && <div className="mt-4 flex gap-2">{actions}</div>}
    </div>
  );
};

export default FeatureCard;
