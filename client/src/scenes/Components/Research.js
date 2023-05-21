import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Research.css";

const Research = ({ user_id }) => {
  const loggedInUserId = useSelector((state) => state.user._id);
  const isOwnerProfile = loggedInUserId === user_id;
  const [editing, setEditing] = useState(false);
  const [researchInterests, setResearchInterests] = useState([]);
  const token = useSelector((state) => state.token);
  const [user, setUser] = useState(null);

  const getUser = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${user_id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data && data.researchInterests) {
        setResearchInterests(data.researchInterests);
      }
      if (data) setUser(data);
    } catch (error) {
      console.error(error);
    }
  }, [user_id, token]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const addResearchInterest = useCallback(() => {
    setResearchInterests((prevInterests) => [...prevInterests, { interest: "" }]);
  }, []);

  const removeResearchInterest = useCallback((index) => {
    setResearchInterests((prevInterests) => {
      const updatedResearchInterests = [...prevInterests];
      updatedResearchInterests.splice(index, 1);
      return updatedResearchInterests;
    });
  }, []);

  const handleResearchInterestChange = useCallback((event, index) => {
    setResearchInterests((prevInterests) => {
      const updatedResearchInterests = [...prevInterests];
      updatedResearchInterests[index].interest = event.target.value;
      return updatedResearchInterests;
    });
  }, []);

  const handleSave = useCallback(() => {
    const requestBody = {
      id: user_id,
      researchInterests: researchInterests,
    };
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    };
    fetch("http://localhost:3001/users/updateResearchInterests", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Handle the response as needed
        window.location.reload();
        setEditing(false); // Exit edit mode after successfully saving the profile
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user_id, researchInterests, token]);

  if (!user) {
    return null; // or display loading state
  }

  return (
    <div className="research">
      <div className="research_top">
        <h3>Research Interests</h3>
        {isOwnerProfile && !editing && (
          <IconButton fontSize="inherit" onClick={() => setEditing(true)}>
            <EditIcon fontSize="small" style={{ fontSize: "smaller" }} />
          </IconButton>
        )}
        {isOwnerProfile && editing && (
          <IconButton onClick={handleSave} fontSize="small">
            <SaveIcon fontSize="small" />
          </IconButton>
        )}
      </div>
      {isOwnerProfile && editing && (
        <>
          <div className="research_contents_editing">
            {researchInterests.map((research, index) => (
              <div key={index} className="research_interest">
                <input
                  type="text"
                  value={research.interest}
                  onChange={(event) => handleResearchInterestChange(event, index)}
                />
                <IconButton onClick={() => removeResearchInterest(index)}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </div>
            ))}
          </div>
          <IconButton className="add_button" onClick={addResearchInterest} fontSize="small">
            <span>+</span>
          </IconButton>
        </>
      )}
      {!editing && (
        <div className="research_contents">
          {researchInterests.map((research, index) => (
            <div key={index} className="research_topic">
              {research.interest}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Research;
