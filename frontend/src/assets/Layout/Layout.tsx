import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { CSSTransition } from 'react-transition-group';

const Layout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className={sidebarCollapsed ? 'sidebar-collapsed' : ''}>
      <Sidebar collapsed={sidebarCollapsed} />
      <div className="main-content">
        <Navbar toggleSidebar={toggleSidebar} />
        <CSSTransition
          in={true}
          appear={true}
          timeout={300}
          classNames="page-transition"
        ></CSSTransition>