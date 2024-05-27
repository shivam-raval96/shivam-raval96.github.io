import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>About Me</h1>
      <h2>(In About 145 Words)</h2>
      
      <section className="intro">
        <h3>Intro</h3>
        <p>
          Hi, I'm Shivam Raval. I am passionate about exploring the intersection of technology and science, particularly in the fields of astrophysics and machine learning. I love solving complex problems and constantly seek new challenges to grow both personally and professionally.
        </p>
      </section>
      <hr/>
      
      <section className="history">
        <h3>Some History</h3>
        <ul>
          <li>My parents put a computer in my bedroom in 1998 when I was 2. My favorite games were Prince, Wolfenstein 3D, and Mario. I was really small and did not know how to play, but I loved watching my parents play those games.</li>
          <li>I lived in Egypt for a year or so when I was 4. My apartment faced the Suez Canal and my favorite pastime was to watch the ships go by.</li>
          <li>Ask me in person for other stories that I'm afraid to share with the internet.</li>
        </ul>
      </section><hr/>
      
      <section className="likes">
        <h3>I Like</h3>
        <ul>
          <li>Travelling</li>
          <li>Pets</li>
          <li>Painting</li>
          <li>Social dancing</li>
          <li>Working out</li>
          <li>Exploring new music genres</li>
          <li>Science Fiction</li>
          <li>Summer and Fall</li>
          <li>The day it snows in the winter</li>
          <li>Making and looking at pretty visualizations</li>
        </ul>
      </section><hr/>
      
      <section className="travel">
        <h3>Travel / Geography</h3>
        <p>
          I love exploring new places and experiencing different cultures. Some of my favorite travel destinations include Japan, Italy, and the beautiful landscapes of New Zealand. I believe travel broadens the mind and provides new perspectives on life.
        </p>
      </section>
      
      <section className="fun-facts">
        <h3>Fun Facts</h3>
        <ul>
          <li>I can solve a Rubik's cube in under 2 minutes.</li>
          <li>I'm an avid collector of vintage video games.</li>
          <li>I once participated in a marathon dressed as a superhero.</li>
          <li>I'm learning to play the guitar in my spare time.</li>
        </ul>
      </section><hr/>
      
      <section className="dreams">
        <h3>I Dream Of</h3>
        <ul>
          <li>Always finding motivation</li>
          <li>Learning new things everyday</li>
          <li>Solving real world problems</li>
          <li>Living someplace foreign</li>
        </ul>
      </section>
    </div>
  );
};

export default Home;
