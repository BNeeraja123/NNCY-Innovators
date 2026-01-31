import React from 'react';

const PrimaryButton = ({ children, className = '', ...props }) => {
  return (
    <button
      {...props}
      className={`bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg transition ${className}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
