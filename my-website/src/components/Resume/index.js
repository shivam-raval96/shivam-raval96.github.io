import React from 'react';
import './Resume.css';
import Skills from './skills';


const Resume = () => {
  return (
    <div className="resume-container">
      <h1 className="resume-title">Resume</h1>
      <nav className="resume-nav">
        <a href="#education">Education</a>
        <a href="#experience">Experience</a>
        <a href="#leadership">Leadership</a>
        <a href="#skills">Skills</a>
      </nav>
      
      <section id="education" className="resume-section">
        <h2>Education</h2>
        <div className="education-item">
          <h3>PhD: Dissertation on Visualizing and Interpreting embedding vectors from AI models</h3>
          <p>Harvard University, Expected 2025</p>
        </div>
        <div className="education-item">
          <h3>AM in Physics</h3>
          <p>Harvard University, 2023</p>
        </div>
        <div className="education-item">
          <h3>BS-MS in Physics</h3>
          <p>Indian Institute of Technology (IIT), Kharagpur, 2018</p>
        </div>
      </section>

      <section id="experience" className="resume-section">
        <h2>Experience</h2>
        <div className="experience-item">
          <h3>Junior Investigator, AstroAI LLM group, Center for Astrophysics, Harvard</h3>
          <p>Oct 2023 - Present</p>
          <ul>
            <li>We are developing an AI-Augmented Astronomy Research framework with a unified multi-modal representation space and that can provide insights and grounded explanations to provide astronomers with a novel platform for rapid exploration and discovery.</li>
            <li>This involves extracting meaningful representations from different modalities of data like natural language, tabular datasets and knowledge graphs and aligning their represenations using contrastive learning.</li>
          </ul>
        </div>
        <div className="experience-item">
          <h3>Doctoral Assistant, Insight and Interaction Lab, Harvard</h3>
          <p>May 2022 - Present</p>
          <ul>
            <li>I am leading two multi-year research projects to (1) visually explore structure of domain specific high dimensional data; and (2) auditing multimodal LLMs and datasets for learned associations like bias and stereotypes</li>
            <li>The end goal of the work is to develop a tool leveraging interactive and explainable state-of-the-art AI techniques and interactive visualizations to explain low-dimension clusters in projections.</li>
            <li>This approach was used by our collaborators to find new insights in ICU Healthcare setting, Astrophysics and Natural Language texts. The work was presented at NeurIPS ML4H 2022 and IEEE VIS 2023 and 2 article submissions are currently in preperation.</li>
          </ul>
        </div>
        <div className="experience-item">
          <h3>Research Assistant, Ultracold Molecules Lab, Harvard</h3>
          <p>August 2019 - Jan 2021</p>
          <ul>
          <li>I was part of the group building and operating a novel experimental vacuum laser system intended to perform quantum simulation using molecules</li>
          <li>We managed the daily operation and maintenance of the system along with analysis of experimental data to interpret and communicate results.</li>
          <li>We co-authored 3 journal article submissions in leading physics journals including Science, Physical Review Letters (PRL) and Physical Review A (PRA).</li>        
          </ul>
        </div>
        <div className="experience-item">
          <h3>Research Intern, Atomic, Molecular and Optical Physics Lab, Yale University</h3>
          <p>June 2018 - March 2021</p>
          <ul>
          <li>I designed and implemented an experimental laser cooling system to study novel quantum physics phenomena at ultracold temperatures.</li>
          <li>This also involed constructing a hardware-software interface to analyze image data from the experiment in real-time using a high speed camera.</li>
          </ul>
        </div>
      </section>

      <section id="leadership" className="resume-section">
        <h2>Leadership</h2>
        <div className="experience-item">
          <h3>Mentorship</h3>
          <p>2022 - Ongoing</p>
          <ul>
          <li>I am currently mentoring two undergraduates and a early graduate student on interactive speech visualization and AI research.</li>
          <li>Previously, I mentored three undergraduates on visualization and Explainable AI research, resulting in a workshop presentation and a conference article submission. I am still in touch with the students and they have shown great enthusiam and progress!</li>
          </ul>
        </div>
        <div className="experience-item">
          <h3>Teaching Fellow, Department of Physics, Institute of Applied Computation (IACS), Harvard</h3>
          <p>2021 - 2023</p>
          <ul>
          <li>I was a Teaching Fellow for courses in Physics and IACS. Part of my duties were to manage curriculum on laboratory computational physics and data science emphasizing quantitative thinking, statistics, and error analysis.</li>
          <li>I also designed, implemented and graded classroom activities, homeworks and lab experiments and provided constructive feedback to the students. They loved the courses :)</li>
        </ul>
        </div>
        <div className="experience-item">
          <h3>Student Leadership Fellow - Outings and Wellness, GSAS, Harvard University</h3>
          <p>2020 - 2022</p>
          <ul>
          <li>I co-led the GSAS Student Center teams for Outings and Wellness. We organised and led student activities and outdoor trips aimed improve mental and physical health.</li>
          <li>Our cultural and outdoor dance events were among the most popular events across all groups!</li>

          </ul>
        </div>
      </section>

      <section id="skills" className="resume-section">
      <h2>Skills</h2>
      <p>Note: I think these sections are silly, but everyone seems to have one. Here is a *mostly* honest overview of my skills.</p>
      
        <Skills />
      </section>
    </div>
  );
};

export default Resume;
