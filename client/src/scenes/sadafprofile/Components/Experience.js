import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Experience.css";

const Experience = ({ user_id }) => {
  const loggedInUserId = useSelector((state) => state.user._id);
  const isOwnerProfile = loggedInUserId === user_id;
  const [experiences, setExperiences] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newExperience, setNewExperience] = useState({});
  const token = useSelector((state) => state.token);
  const [user, setUser] = useState(null);
  
  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${user_id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data && data.experience) {
        const formattedExperiences = data.experience.map((exp) => ({
          position: exp.position,
          company: exp.company,
          years: exp.years,
          location: exp.location,
        }));
        setExperiences(formattedExperiences);
      }
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return null;
  }

  const handleAddExperience = () => {
    setIsEditing(true);
    setNewExperience({});
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewExperience((prevExperience) => ({ ...prevExperience, [name]: value }));
  };

  const handleSaveExperience = () => {
    const updatedExperiences = [...experiences, newExperience];
    setExperiences((prevExperiences) => [...prevExperiences, newExperience]);
    const requestBody = {
      id: user_id,
      experience: updatedExperiences,
    };
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    };
    fetch("http://localhost:3001/users/updateExperience", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Handle the response as needed
        setIsEditing(false); // Exit edit mode after successfully saving the profile
      })
      .catch((error) => {
        console.error(error);
      });
    setNewExperience({});
  };

  const handleDeleteExperience = (index) => {
    const updatedExperiences = [...experiences];
    updatedExperiences.splice(index, 1);

    const requestBody = {
      id: user._id, // Assuming the user object has an _id property
      index: index,
    };

    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    };

    fetch("http://localhost:3001/users/deleteExperience", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Handle the response as needed
      })
      .catch((error) => {
        console.error(error);
      });

    setExperiences(updatedExperiences);
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
        {isEditing && isOwnerProfile && (
          <IconButton onClick={handleSaveExperience} fontSize="small">
            <SaveIcon fontSize="small" />
          </IconButton>
        )}
        {!isEditing && isOwnerProfile && (
          <IconButton onClick={handleAddExperience} fontSize="small">
            <AddIcon fontSize="small" />
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
              {isOwnerProfile && (
                <IconButton
                  onClick={() => handleEditExperience(index)}
                  fontSize="small"
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              )}
              {isOwnerProfile && (
                <IconButton
                  onClick={() => handleDeleteExperience(index)}
                  fontSize="small"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              )}
            </div>
          </div>
        ))}
        {isEditing  && isOwnerProfile && (
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
