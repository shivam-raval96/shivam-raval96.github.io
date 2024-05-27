import React from 'react';
import Sidebar from './Sidebar';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <div className="navbar">
        <a href="/">About</a>
        <a href="/resume">Resume</a>
        <a href="/projects">Research</a>
        <a href="/blogs">Blogs</a>
        <a href="/visuals">Visuals</a>
      </div>
      <div className="content-layout">
        <Sidebar />
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
