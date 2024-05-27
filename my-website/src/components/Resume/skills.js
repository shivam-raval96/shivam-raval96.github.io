import React, { useState } from 'react';
import './skills.css';

const skillsData = [

    { name: "D3", level: 4, category: "Data Visualization" },
    { name: "Tableau", level: 4, category: "Data Visualization" },


    { name: "Node.JS", level: 5, category: "Web Development" },
    { name: "Javascript", level: 4, category: "Web Development" },
    { name: "FastAPI", level: 3, category: "Web Development" },
    { name: "Flask", level: 3, category: "Web Development" },
    { name: "Heroku", level: 4, category: "Web Development" },


    { name: "Python", level: 5, category: "Machine Learning" },
    { name: "PyTorch", level: 5, category: "Machine Learning" },
    { name: "Tensorflow + Keras", level: 5, category: "Machine Learning" },
    { name: "Scikit-Learn", level: 5, category: "Machine Learning" },


    { name: "Amazon Web Services", level: 3, category: "Tools" },
    { name: "Git", level: 4, category: "Tools" },
    { name: "Bash", level: 4, category: "Tools" },


  ];
const categories = [
  "All",  "Data Visualization", "Web Development", "Machine Learning", "Tools", 
];

const colors = {
    "Data Visualization": "#2E86C1",
    "Web Development": "#F1C40F",
    "Machine Learning":"#45B39D",
    "Tools":"#E59866"
}

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredSkills = selectedCategory === "All" ?
    skillsData : skillsData.filter(skill => skill.category === selectedCategory);

  return (
    <div className="skills-container">
      <div className="skills-categories">
        {categories.map(category => (
          <button
            key={category}
            className={selectedCategory === category ? "active" : ""}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="skills-list">
        {filteredSkills.map(skill => (
          <div key={skill.name} className="skill-bar">
            <div className="skill-bar-inner" style={{ width: `${skill.level * 20}%`, backgroundColor: colors[skill.category] }}>
              <span className="skill-name">{skill.name}</span>
              <span className="skill-level">{`${skill.level}/5`}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
