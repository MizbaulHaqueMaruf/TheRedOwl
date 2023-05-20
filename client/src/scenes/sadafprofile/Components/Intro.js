import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Intro.css";

const Intro = ({ user_id }) => {
  const loggedInUserId = useSelector((state) => state.user._id);
  const isOwnerProfile = loggedInUserId === user_id;
  const [isEditing, setIsEditing] = useState(false);
  const [paragraph, setParagraph] = useState("");
  const [showFullIntro, setShowFullIntro] = useState(false);
  const token = useSelector((state) => state.token);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`http://localhost:3001/users/${user_id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.intro) setParagraph(data.intro);
      setUser(data);
      console.log(data);
    };

    getUser();
  }, [user_id, token]);

  if(!user){
    return null;
  }
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const requestBody = {
      id: user_id,
      intro: paragraph,
    };
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    };

    fetch("http://localhost:3001/users/updateIntro", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Handle the response as needed
        setIsEditing(false); // Exit edit mode after successfully saving the profile
      })
      .catch((error) => {
        console.error(error);
      });
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

  return (
    <div className="intro">
      <div className="intro_top">
        <h3 style={{ flex: 1, textAlign: "left" }}>Intro</h3>
        {isEditing && isOwnerProfile ? (
          <IconButton onClick={handleSaveClick}>
            <SaveIcon fontSize="small" />
          </IconButton>
        ) : (
          isOwnerProfile && (
            <IconButton onClick={handleEditClick}>
              <EditIcon fontSize="small" />
            </IconButton>
          )
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
      ) : (
        renderIntroDetails(paragraph, showFullIntro, handleSeeMoreClick, handleSeeLessClick)
      )}
    </div>
  );
};

const renderIntroDetails = (paragraph, showFullIntro, handleSeeMoreClick, handleSeeLessClick) => {
  if (showFullIntro) {
    return (
      <div className="intro_details">
        {paragraph}
        <br />
        <button className="see_less_button" onClick={handleSeeLessClick} color="white">
          See less
        </button>
      </div>
    );
  } else if (paragraph.length > 200) {
    return (
      <div className="intro_details">
        {paragraph.slice(0, 200)}
        ...
        <button  className="see_more_button" onClick={handleSeeMoreClick}>
          See more
        </button>
      </div>
    );
  } else {
    return <div className="intro_details">{paragraph}</div>;
  }
};

export default Intro;
