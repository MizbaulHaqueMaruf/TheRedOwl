import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import { useState } from "react";
import "./Education.css";

const Education = () => {
  const [educations, setEducations] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newEducation, setNewEducation] = useState({});

  const handleAddEducation = () => {
    setIsEditing(true);
    setNewEducation({});
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEducation((prevEducation) => ({ ...prevEducation, [name]: value }));
  };

  const handleSaveEducation = () => {
    setEducations((prevEducations) => [...prevEducations, newEducation]);
    setIsEditing(false);
    setNewEducation({});
  };

  const handleDeleteEducation = (index) => {
    setEducations((prevEducations) => [
      ...prevEducations.slice(0, index),
      ...prevEducations.slice(index + 1),
    ]);
  };

  const handleEditEducation = (index) => {
    setIsEditing(true);
    setNewEducation(educations[index]);
    handleDeleteEducation(index);
  };

  return (
    <div className="education">
      <div className="education_top">
        <h3>Education</h3>
        {isEditing ? (
          <IconButton onClick={handleSaveEducation} fontSize='small'>
            <SaveIcon fontSize="small"/>
          </IconButton>
        ) : (
          <IconButton onClick={handleAddEducation} fontSize='small'>
            <AddIcon fontSize="small"/>
          </IconButton>
        )}
      </div>
      <div className="education_list">
        {educations.map((education, index) => (
          <div key={index} className="education_item">
            <ul>{education.degree}</ul>
            <ul>{education.institute}</ul>
            <ul>{education.years}</ul>
            <div className="education_buttons">
              <IconButton onClick={() => handleEditEducation(index)} fontSize='small'>
                <EditIcon fontSize="small"/>
              </IconButton>
              <IconButton onClick={() => handleDeleteEducation(index)} fontSize='small'>
                <DeleteIcon fontSize="small"/>
              </IconButton>
            </div>
          </div>
        ))}
        {isEditing && (
          <div className="education_item">
            <input
              type="text"
              name="degree"
              value={newEducation.degree || ""}
              placeholder="Degree"
              onChange={handleInputChange}
              className="input-field"
            />
            <br />
            <input
              type="text"
              name="institute"
              value={newEducation.institute || ""}
              placeholder="Institute"
              onChange={handleInputChange}
              className="input-field"
            />
            <br />
            <input
              type="text"
              name="years"
              value={newEducation.years || ""}
              placeholder="Years"
              onChange={handleInputChange}
              className="input-field"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Education;

