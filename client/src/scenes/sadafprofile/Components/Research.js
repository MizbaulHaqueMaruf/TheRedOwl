import { IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import { useState } from "react";
import "./Research.css";

const Research = () => {
  const [editing, setEditing] = useState(false);
  const [researchInterests, setResearchInterests] = useState([]);

  const addResearchInterest = () => {
    setResearchInterests([...researchInterests, ""]);
  };

  const removeResearchInterest = (index) => {
    const updatedResearchInterests = [...researchInterests];
    updatedResearchInterests.splice(index, 1);
    setResearchInterests(updatedResearchInterests);
  };

  const handleResearchInterestChange = (event, index) => {
    const updatedResearchInterests = [...researchInterests];
    updatedResearchInterests[index] = event.target.value;
    setResearchInterests(updatedResearchInterests);
  };

  const handleSave = () => {
    setEditing(false);
  };

  return (
    <div className="research">
      <div className="research_top">
        <h3>Research Interests</h3>
        {!editing ? (
          <IconButton  fontSize="inherit" onClick={() => setEditing(true)}>
            <EditIcon fontsize="small"style={{fontSize:'smaller'}}/>
          </IconButton>
        ) : (
          <IconButton onClick={handleSave} fontSize='small'>
            <SaveIcon fontSize="small"/>
          </IconButton>
        )}
      </div>
      {editing ? (
        <>
          <div className="research_contents_editing">
            {researchInterests.map((interest, index) => (
              <div key={index} className="research_interest">
                <input
                  type="text"
                  value={interest}
                  onChange={(event) => handleResearchInterestChange(event, index)}
                />
                <IconButton onClick={() => removeResearchInterest(index)}>
                  <CloseIcon fontSize="small"/>
                </IconButton>
              </div>
            ))}
          </div>
          <IconButton className="add_button" onClick={addResearchInterest} fontSize="small">
            <span>+</span>
          </IconButton>
        </>
      ) : (
        <div className="research_contents">
          {researchInterests.map((interest, index) => (
            <div key={index} className="research_topic">
              {interest}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Research;

