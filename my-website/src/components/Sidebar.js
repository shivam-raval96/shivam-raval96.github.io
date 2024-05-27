import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';
import profilePic from './imgs/me.jpg'; // Add the correct path to your profile picture
import ContactMe from '../components/ContactMe';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <img src={profilePic} alt="Profile" className="profile-pic" />
      <h2>Shivam Raval</h2>
      <p>Email: srawal@g.harvard.edu</p>
      <hr/>
      <br/>
      You can send me:
      <ContactMe loopMessage ={true}/>
      <br/>
      <hr/>
      <div className="social-icons">
        <a href="https://github.com/shivam-raval96" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a href="https://scholar.google.com/citations?user=hs94v8AAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGraduationCap} />
        </a>
        <a href="https://www.linkedin.com/in/shivam-raval-27820484/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
