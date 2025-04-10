import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;

// src/components/common/LoadingSpinner.tsx
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = 'primary' 
}) => {
  const sizeClass = size === 'sm' 
    ? 'spinner-border-sm' 
    : size === 'lg' 
      ? 'width: 2rem; height: 2rem;' 
      : '';

  return (
    <div className={`spinner-border text-${color}`} role="status" style={{ ...(size === 'lg' ? { width: '2rem', height: '2rem' } : {}) }}>
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;