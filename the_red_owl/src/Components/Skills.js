import { IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import { useState } from "react";
import "./Skills.css";

const Skills = () => {
  const [editing, setEditing] = useState(false);
  const [skills, setSkills] = useState([]);

  const addSkills = () => {
    setSkills([...skills, ""]);
  };

  const removeSkills = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const handleSkillChange = (event, index) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = event.target.value;
    setSkills(updatedSkills);
  };

  const handleSave = () => {
    setEditing(false);
  };

  return (
    <div className="skills">
      <div className="skills_top">
        <h3>Skills</h3>
        {!editing ? (
          <IconButton fontSize="inherit" onClick={() => setEditing(true)}>
            <EditIcon fontSize="small"/>
          </IconButton>
        ) : (
          <IconButton fontSize="small" onClick={handleSave}>
            <SaveIcon fontSize="small"/>
          </IconButton>
        )}
      </div>
      {editing ? (
        <>
          <div className="skills_editing">
            {skills.map((interest, index) => (
              <div key={index} className="skill">
                <input
                  type="text"
                  value={interest}
                  onChange={(event) => handleSkillChange(event, index)}
                />
                <IconButton onClick={() => removeSkills(index)}>
                  <CloseIcon fontSize="small"/>
                </IconButton>
              </div>
            ))}
          </div>
          <IconButton className="add_button" onClick={addSkills} fontSize="small">
            <span>+</span>
          </IconButton>
        </>
      ) : (
        <div className="skills_lists">
          {skills.map((interest, index) => (
            <div key={index} className="skill_name">
              {interest}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Skills;
