import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import { useState } from "react";
import "./Experience.css";

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newExperience, setNewExperience] = useState({});

  const handleAddExperience = () => {
    setIsEditing(true);
    setNewExperience({});
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewExperience((prevExperience) => ({ ...prevExperience, [name]: value }));
  };

  const handleSaveExperience = () => {
    setExperiences((prevExperiences) => [...prevExperiences, newExperience]);
    setIsEditing(false);
    setNewExperience({});
  };

  const handleDeleteExperience = (index) => {
    setExperiences((prevExperiences) => [
      ...prevExperiences.slice(0, index),
      ...prevExperiences.slice(index + 1),
    ]);
  };

  const handleEditExperience = (index) => {
    setIsEditing(true);
    setNewExperience(experiences[index]);
    handleDeleteExperience(index);
  };

  return (
    <div className="experience">
      <div className="experience_top">
        <h3>Experience</h3>
        {isEditing ? (
          <IconButton onClick={handleSaveExperience} fontSize='small'>
            <SaveIcon fontSize="small"/>
          </IconButton>
        ) : (
          <IconButton onClick={handleAddExperience} fontSize='small'>
            <AddIcon fontSize="small"/>
          </IconButton>
        )}
      </div>
      <div className="experience_list">
        {experiences.map((experience, index) => (
          <div key={index} className="experience_item">
            <ul>{experience.position}</ul>
            <ul>{experience.company}</ul>
            <ul>{experience.years}</ul>
            <ul>{experience.location}</ul>
            <div className="experience_buttons">
              <IconButton onClick={() => handleEditExperience(index)} fontSize='small'>
                <EditIcon fontSize="small"/>
              </IconButton>
              <IconButton onClick={() => handleDeleteExperience(index)} fontSize='small'>
                <DeleteIcon fontSize="small"/>
              </IconButton>
            </div>
          </div>
        ))}
        {isEditing && (
          <div className="experience_item">
            <input
              type="text"
              name="position"
              value={newExperience.position || ""}
              placeholder="Position"
              onChange={handleInputChange}
            />
            <br />
            <input
              type="text"
              name="company"
              value={newExperience.company || ""}
              placeholder="Company"
              onChange={handleInputChange}
            />
            <br />
            <input
              type="text"
              name="years"
              value={newExperience.years || ""}
              placeholder="Years active"
              onChange={handleInputChange}
            />
             <br />
            <input
              type="text"
              name="location"
              value={newExperience.location || ""}
              placeholder="Location"
              onChange={handleInputChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Experience;

