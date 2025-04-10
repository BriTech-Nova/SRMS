import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../types/auth';
import { 
  FaChalkboardTeacher, FaFlask, FaBoxes, FaBook, 
  FaUserCog, FaChartBar, FaClipboardList, FaCalendarAlt,
  FaExchangeAlt, FaPencilRuler, FaBookOpen, FaListAlt,
  FaUsers, FaFileAlt, FaBoxOpen, FaShoppingCart, FaTachometerAlt
} from 'react-icons/fa';

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        {!collapsed ? (
          <h4 className="m-0">School Resource</h4>
        ) : (
          <h4 className="m-0">SRM</h4>
        )}
      </div>
      <div className="sidebar-body">
        <ul className="nav flex-column mt-4">
          <li className="nav-item">
            <NavLink to="/dashboard" className="nav-link">
              <FaTachometerAlt className="nav-icon" />
              <span className="nav-text">Dashboard</span>
            </NavLink>
          </li>

          {/* Teacher Links */}
          {(user.role === UserRole.TEACHER || user.role === UserRole.ADMIN) && (
            <>
              <li className="nav-item">
                <NavLink to="/resource-requests" className="nav-link">
                  <FaClipboardList className="nav-icon" />
                  <span className="nav-text">Resource Requests</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/lab-booking" className="nav-link">
                  <FaCalendarAlt className="nav-icon" />
                  <span className="nav-text">Lab Booking</span>
                </NavLink>
              </li>
            </>
          )}

          {/* Lab Technician Links */}
          {(user.role === UserRole.LAB_TECHNICIAN || user.role === UserRole.ADMIN) && (
            <>
              <li className="nav-item">
                <NavLink to="/lab-management" className="nav-link">
                  <FaFlask className="nav-icon" />
                  <span className="nav-text">Lab Management</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/booked-sessions" className="nav-link">
                  <FaCalendarAlt className="nav-icon" />
                  <span className="nav-text">Booked Sessions</span>
                </NavLink>
              </li>
            </>
          )}

          {/* Storekeeper Links */}
          {(user.role === UserRole.STOREKEEPER || user.role === UserRole.ADMIN) && (
            <>
              <li className="nav-item">
                <NavLink to="/inventory" className="nav-link">
                  <FaBoxes className="nav-icon" />
                  <span className="nav-text">Inventory</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/material-allocation" className="nav-link">
                  <FaExchangeAlt className="nav-icon" />
                  <span className="nav-text">Material Allocation</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/exercise-books" className="nav-link">
                  <FaPencilRuler className="nav-icon" />
                  <span className="nav-text">Exercise Books</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/class-books" className="nav-link">
                  <FaBookOpen className="nav-icon" />
                  <span className="nav-text">Class Books</span>
                </NavLink>
              </li>
            </>
          )}

          {/* Librarian Links */}
          {(user.role === UserRole.LIBRARIAN || user.role === UserRole.ADMIN) && (
            <>
              <li className="nav-item">
                <NavLink to="/library" className="nav-link">
                  <FaBook className="nav-icon" />
                  <span className="nav-text">Library Management</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/book-loans" className="nav-link">
                  <FaExchangeAlt className="nav-icon" />
                  <span className="nav-text">Book Loans</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/textbooks" className="nav-link">
                  <FaListAlt className="nav-icon" />
                  <span className="nav-text">Textbook Assignment</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/returned-books" className="nav-link">
                  <FaBookOpen className="nav-icon" />
                  <span className="nav-text">Returned Books</span>
                </NavLink>
              </li>
            </>
          )}

          {/* Admin Links */}
          {user.role === UserRole.ADMIN && (
            <>
              <li className="nav-item">
                <NavLink to="/users" className="nav-link">
                  <FaUsers className="nav-icon" />
                  <span className="nav-text">User Management</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/reports" className="nav-link">
                  <FaChartBar className="nav-icon" />
                  <span className="nav-text">Reports</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/stock-control" className="nav-link">
                  <FaBoxOpen className="nav-icon" />
                  <span className="nav-text">Stock Control</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/orders" className="nav-link">
                  <FaShoppingCart className="nav-icon" />
                  <span className="nav-text">Order Management</span>
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
