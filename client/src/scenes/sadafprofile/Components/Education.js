import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Education.css";

const Education = ({ user_id }) => {
  const loggedInUserId = useSelector((state) => state.user._id);
  const isOwnerProfile = loggedInUserId === user_id;
  const [educations, setEducations] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newEducation, setNewEducation] = useState({});
  const token = useSelector((state) => state.token);
  const [user, setUser] = useState(null);
  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${user_id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data && data.education) {
        const formattedEducations = data.education.map((edu) => ({
          degree: edu.degree,
          institute: edu.institute,
          years: edu.years,
        }));
        setEducations(formattedEducations);
      }
      setUser(data);
      if (data) setUser(data);
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
  const handleAddEducation = () => {
    setIsEditing(true);
    setNewEducation({});
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEducation((prevEducation) => ({ ...prevEducation, [name]: value }));
  };

  const handleSaveEducation = () => {
    const updatedEducations = [...educations, newEducation];
    setEducations((prevEducations) => [...prevEducations, newEducation]);
    const requestBody = {
      id: user_id,
      education: updatedEducations,
    };
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    };
    fetch("http://localhost:3001/users/updateEducation", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Handle the response as needed
        setIsEditing(false); // Exit edit mode after successfully saving the profile
      })
      .catch((error) => {
        console.error(error);
      });
    setNewEducation({});
  };

  const handleDeleteEducation = (index) => {
    const updatedEducations = [...educations];
    updatedEducations.splice(index, 1);

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

    fetch("http://localhost:3001/users/deleteEducation", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Handle the response as needed
      })
      .catch((error) => {
        console.error(error);
      });

    setEducations(updatedEducations);
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
        {isEditing && isOwnerProfile ? (
          <IconButton onClick={handleSaveEducation} fontSize="small">
            <SaveIcon fontSize="small" />
          </IconButton>
        ) : (
          isOwnerProfile && (
            <IconButton onClick={handleAddEducation} fontSize="small">
              <AddIcon fontSize="small" />
            </IconButton>
          )
        )}
      </div>
      <div className="education_list">
        {educations.map((education, index) => (
          <div key={index} className="education_item">
            <ul>{education.degree}</ul>
            <ul>{education.institute}</ul>
            <ul>{education.years}</ul>
            <div className="education_buttons">
              {isOwnerProfile && isEditing && (
                <IconButton
                  onClick={() => handleEditEducation(index)}
                  fontSize="small"
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              )}
              {isOwnerProfile && (
                <IconButton
                  onClick={() => handleDeleteEducation(index)}
                  fontSize="small"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              )}
            </div>
          </div>
        ))}
        {isEditing && isOwnerProfile && (
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
