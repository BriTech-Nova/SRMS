import React from 'react';

interface CardProps {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  titleAction?: React.ReactNode;
  footer?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ 
  title, 
  subtitle, 
  icon, 
  children, 
  className = '', 
  titleAction,
  footer
}) => {
  return (
    <div className={`card shadow-sm ${className}`}>
      {(title || subtitle) && (
        <div className="card-header bg-white d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            {icon && <div className="card-icon me-3">{icon}</div>}
            <div>
              {title && <h5 className="card-title mb-0">{title}</h5>}
              {subtitle && <div className="card-subtitle text-muted small">{subtitle}</div>}
            </div>
          </div>
          {titleAction && <div>{titleAction}</div>}
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
      {footer && <div className="card-footer bg-white">{footer}</div>}
    </div>
  );
};

export default Card;
