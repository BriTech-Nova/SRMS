import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaUserCircle, FaSignOutAlt, FaUserEdit } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav className="top-navbar d-flex justify-content-between align-items-center px-4">
      <div className="d-flex align-items-center">
        <button 
          className="btn btn-link text-dark" 
          onClick={toggleSidebar}
        >
          <FaBars size={20} />
        </button>
      </div>
      
      <div className="position-relative" ref={dropdownRef}>
        <button 
          className="btn btn-link text-dark d-flex align-items-center" 
          onClick={toggleDropdown}
        >
          {user?.profile_image ? (
            <img 
              src={user.profile_image} 
              alt={user.username}
              className="rounded-circle me-2"
              width="32"
              height="32"
            />
          ) : (
            <FaUserCircle size={32} className="me-2" />
          )}
          <span className="d-none d-md-inline">{user?.first_name} {user?.last_name}</span>
        </button>
        
        {dropdownOpen && (
          <div className="position-absolute end-0 mt-2 py-2 bg-white rounded shadow" style={{ minWidth: '200px', zIndex: 1000 }}>
            <div className="px-4 py-2 border-bottom">
              <div className="fw-bold">{user?.first_name} {user?.last_name}</div>
              <div className="text-muted small">{user?.email}</div>
              <div className="text-primary small text-capitalize">{user?.role}</div>
            </div>
            <Link to="/profile" className="dropdown-item py-2 px-4 d-flex align-items-center" onClick={() => setDropdownOpen(false)}>
              <FaUserEdit className="me-2" />
              <span>My Profile</span>
            </Link>
            <button 
              className="dropdown-item py-2 px-4 d-flex align-items-center text-danger border-0 bg-transparent w-100 text-start" 
              onClick={logout}
            >
              <FaSignOutAlt className="me-2" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
