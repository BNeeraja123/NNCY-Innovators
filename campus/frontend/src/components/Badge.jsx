import React from 'react';

const Badge = ({ children, variant = 'orange', className = '' }) => {
  const base = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold';
  const variantClasses =
    variant === 'green' ? 'bg-green-100 text-green-800' : 'bg-primary text-white';
  return <span className={`${base} ${variantClasses} ${className}`}>{children}</span>;
};

export default Badge;
