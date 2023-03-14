import { IconButton } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import { useState } from "react";
import "./Intro.css";

const Intro = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [paragraph, setParagraph] = useState("");
  const [showFullIntro, setShowFullIntro] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleParagraphChange = (event) => {
    setParagraph(event.target.value);
  };

  const handleSeeMoreClick = () => {
    setShowFullIntro(true);
  };

  const handleSeeLessClick = () => {
    setShowFullIntro(false);
  };

  const renderIntroDetails = () => {
    if (showFullIntro) {
      return (
        <div className="intro_details">
          {paragraph}
          <br />
          <button className="see_less_button" onClick={handleSeeLessClick} color="white">See less</button>
        </div>
      );
    } else if (paragraph.length > 200) {
      return (
        <div className="intro_details">
          {paragraph.slice(0, 200)}
          ...
          <button className="see_more_button" onClick={handleSeeMoreClick}>See more</button>
        </div>
      );
    } else {
      return (
        <div className="intro_details">
          {paragraph}
        </div>
      );
    }
  };

  return (
    <div className="intro">
      <div className="intro_top">
        <h3 style={{ flex: 1, textAlign: 'left' }}>Intro</h3>
        {isEditing ? (
          <IconButton onClick={handleSaveClick}>
            <SaveIcon fontSize="small"/>
          </IconButton>
        ) : (
          <IconButton onClick={handleEditClick}>
            <EditIcon fontSize="small"/>
          </IconButton>
        )}
      </div>
      {isEditing ? (
        <div className="intro_details">
          <textarea
            className="paragraph_input"
            placeholder="Enter paragraph here"
            value={paragraph}
            onChange={handleParagraphChange}
          />
        </div>
      ) : renderIntroDetails()}
    </div>
  );
};

export default Intro;

