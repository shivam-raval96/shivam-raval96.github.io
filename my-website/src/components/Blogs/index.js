import React from 'react';
import './Blogs.css';

const Blogs = () => {
  return (
    <div className="blogs-container">
      <h1>Blogs</h1>
      <div className="blog-links">
        <a href="/blog1/index.html" target="_blank" rel="noopener noreferrer">
          <div className="blog-preview">
            <img src="https://via.placeholder.com/800x400" alt="Blog 1" className="blog-preview-image" />
            <h2>Blog Post 1 Title</h2>
            <h3>A brief description of Blog Post 1</h3>
          </div>
        </a>
        <a href="/blog2/index.html" target="_blank" rel="noopener noreferrer">
          <div className="blog-preview">
            <img src="https://via.placeholder.com/800x400" alt="Blog 2" className="blog-preview-image" />
            <h2>Blog Post 2 Title</h2>
            <h3>A brief description of Blog Post 2</h3>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Blogs;
