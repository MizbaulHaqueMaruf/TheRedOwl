import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Skills.css";

const Skills = ({ user_id }) => {
  const loggedInUserId = useSelector((state) => state.user._id);
  const isOwnerProfile = loggedInUserId === user_id;
  const [editing, setEditing] = useState(false);
  const [skills, setSkills] = useState([]);
  const token = useSelector((state) => state.token);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`http://localhost:3001/users/${user_id}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (data && data.skills) {
          setSkills(data.skills);
        }
        if (data) setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    getUser();
  }, [user_id, token]);

  if (!user) {
    return null;
  }

  const addSkills = () => {
    setSkills([...skills, { skill: "" }]);
  };

  const removeSkills = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const handleSkillChange = (event, index) => {
    const updatedSkills = [...skills];
    updatedSkills[index].skill = event.target.value;
    setSkills(updatedSkills);
  };

  const handleSave = () => {
    const requestBody = {
      id: user_id,
      skills: skills,
    };
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    };
    fetch("http://localhost:3001/users/updateSkills", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Handle the response as needed
        window.location.reload();
        setEditing(false); // Exit edit mode after successfully saving the profile
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="skills">
      <div className="skills_top">
        <h3>Skills</h3>
        {!editing && isOwnerProfile && (
          <IconButton fontSize="inherit" onClick={() => setEditing(true)}>
            <EditIcon fontSize="small" style={{ fontSize: "smaller" }} />
          </IconButton>
        )}
        {editing && isOwnerProfile && (
          <IconButton fontSize="small" onClick={handleSave}>
            <SaveIcon fontSize="small" />
          </IconButton>
        )}
      </div>
      {editing && isOwnerProfile ? (
        <>
          <div className="skills_editing">
            {skills.map((skill, index) => (
              <div key={index} className="skill">
                <input
                  type="text"
                  value={skill.skill}
                  onChange={(event) => handleSkillChange(event, index)}
                />
                {isOwnerProfile && (
                  <IconButton onClick={() => removeSkills(index)}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )}
              </div>
            ))}
          </div>
          {isOwnerProfile && (
            <IconButton className="add_button" onClick={addSkills} fontSize="small">
              <span>+</span>
            </IconButton>
          )}
        </>
      ) : (
        <div className="skills_lists">
          {skills.map((skill, index) => (
            <div key={index} className="skill_name">
              {skill.skill}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Skills;
