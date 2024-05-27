import React, { Suspense, lazy }from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Resume from './components/Resume';
import Projects from './components/Research';
import Blogs from './components/Blogs';
import Visuals from './components/Visuals';
import Layout from './components/Layout';
import './App.css';

const { PUBLIC_URL } = process.env;


function App() {
  return (
    <Router basename={PUBLIC_URL}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blogs/*" element={<Blogs />} />
          <Route path="/visuals" element={<Visuals />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
