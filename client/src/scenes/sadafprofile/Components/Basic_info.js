import { IconButton, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import MailIcon from "@material-ui/icons/Mail";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Box from "@mui/material/Box";
import FlexBetween from "components/FlexBetween";
import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { MdBloodtype } from "react-icons/md";
import { useSelector } from "react-redux";
import "./Basic_info.css";

const BasicInfo = ({ user_id }) => {
  const loggedInUserId = useSelector((state) => state.user._id);
  const isOwnerProfile = loggedInUserId === user_id;
  const [profilePic, setProfilePic] = useState(null);
  const [profileName, setProfileName] = useState("");
  const [profileDesc, setProfileDesc] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [emailId, setEmailId] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const token = useSelector((state) => state.token);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`http://localhost:3001/users/${user_id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.firstName && data.lastName)
        setProfileName(data.firstName + " " + data.lastName);
      if (data.picturePath) setProfilePic(data.picturePath);
      if (data.email) setEmailId(data.email);
      if (data.description) setProfileDesc(data.description);
      if (data.bloodgroup) setBloodGroup(data.bloodgroup);
      setUser(data);
    };

    getUser();
  }, [user_id, token]);

  if (!user) {
    return null;
  }

  const handleProfilePicChange = (files) => {
    if (files.length > 0) {
      setProfilePic(files[0]);
    }
  };

  const handleSaveProfile = async () => {
    const formData = new FormData();

    let firstName = "";
    let lastName = "";
    const lastSpaceIndex = profileName.lastIndexOf(" ");
    if (lastSpaceIndex !== -1) {
      firstName = profileName.slice(0, lastSpaceIndex).trim();
      lastName = profileName.slice(lastSpaceIndex + 1).trim();
    } else {
      firstName = profileName.trim();
    }
    formData.append("_id", user_id);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("description", profileDesc);
    formData.append("bloodgroup", bloodGroup);
    formData.append("email", emailId);
    if(profilePic.name){
      formData.append("picturePath", profilePic.name);
    }
    else{ 
      formData.append("picturePath", profilePic);
    }
     const requestOptions = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    try {
      const response = await fetch(
        "http://localhost:3001/users/updateBasicInfo",
        requestOptions
      );
      const data = await response.json();
      if (data) {
        setIsEditMode(false);
        window.location.reload();
      }
      } catch (error) {
      console.error(error);
      // Handle the error scenario
    }
  };

  const handleDeleteProfilePic = () => {
    setProfilePic(null);
  };

  const renderProfilePic = () => {
    if (profilePic) {
      return (
        <img
          style={{ objectFit: "cover", borderRadius: "50%" }}
          width={"120 px"}
          height={"120px"}
          alt="user"
          src={`http://localhost:3001/assets/${profilePic}`}
        />
      );
    } else {
      return <PhotoCamera />;
    }
  };

  const renderProfileName = () => {
    if (isEditMode && isOwnerProfile) {
      return (
        <div>
          <label htmlFor="profile-name">Name:</label>
          <input
            type="text"
            id="profile-name"
            value={profileName}
            onChange={(event) => setProfileName(event.target.value)}
          />
        </div>
      );
    } else {
      return <h2>{profileName}</h2>;
    }
  };

  const renderProfileDesc = () => {
    if (isEditMode && isOwnerProfile) {
      return (
        <div>
          <label htmlFor="profile-desc">Description:</label>
          <textarea
            id="profile-desc"
            value={profileDesc}
            onChange={(event) => setProfileDesc(event.target.value)}
          />
        </div>
      );
    } else {
      return <h3>{profileDesc}</h3>;
    }
  };

  const renderEmailId = () => {
    if (isEditMode && isOwnerProfile) {
      return (
        <div>
          <label htmlFor="email-id">Email:</label>
          <textarea
            id="email-id"
            value={emailId}
            onChange={(event) => setEmailId(event.target.value)}
          />
        </div>
      );
    } else {
      if (emailId) {
        return (
          <IconButton
            fontSize="small"
            onClick={() => (window.location.href = `mailto:${emailId}`)}
          >
            <MailIcon fontSize="small" />
            <h6>{emailId}</h6>
          </IconButton>
        );
      }
    }
  };

  const renderBloodGroup = () => {
    if (isEditMode && isOwnerProfile) {
      return (
        <div>
          <label htmlFor="blood-group">Blood Group</label>
          <textarea
            id="blood-group"
            value={bloodGroup}
            onChange={(event) => setBloodGroup(event.target.value)}
          />
        </div>
      );
    } else {
      if (bloodGroup) {
        return (
          <div className="blood-group">
            <MdBloodtype className="blood-icon" />
            <h6>{bloodGroup}</h6>
          </div>
        );
      }
    }
  };

  const renderSaveButton = () => {
    if (isEditMode && isOwnerProfile) {
      return (
        <button className="basic_info_option" onClick={handleSaveProfile}>
          Save
        </button>
      );
    } else {
      return (
        <div
          className="basic_info_option"
          onClick={() => setIsEditMode(true)}
        >
          {isOwnerProfile && (
            <IconButton>
              <EditIcon fontSize="small" />
            </IconButton>
          )}
        </div>
      );
    }
  };

  return (
    <div className="basic_info">
      <div className="basic_info_left">
        {isOwnerProfile && (
          <label htmlFor="image-upload">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
            </IconButton>
            {isEditMode && isOwnerProfile && (
              <label>
                <h6>Update Profile</h6>
              </label>
            )}
          </label>
        )}
         {renderProfilePic()}
        {isEditMode && isOwnerProfile && (
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) =>{
                setProfilePic(acceptedFiles[0]);
                handleProfilePicChange(acceptedFiles[0]);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <Box
                {...getRootProps()}
                border={`2px dashed`}
                p="1rem"
                sx={{ "&:hover": { cursor: "pointer" } }}
              >
                <input {...getInputProps()} />
                {!profilePic ? (
                  <p>Add Picture Here</p>
                ) : (
                  <FlexBetween>
                    <Typography>{profilePic.name}</Typography>
                    <EditOutlinedIcon />
                  </FlexBetween>
                )}
              </Box>
            )}
          </Dropzone>
        )}
        {profilePic && isEditMode && isOwnerProfile && (
          <div>
            <IconButton
              aria-label="delete picture"
              onClick={handleDeleteProfilePic}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        )}
      </div>
      <div className="basic_info_center">
        {renderProfileName()}
        {renderProfileDesc()}
      </div>

      <div className="basic_info_right">
        {renderBloodGroup()}
        <div className="link-container">{renderEmailId()}</div>
        <div className="save button">{renderSaveButton()}</div>
      </div>
    </div>
  );
};

export default BasicInfo;
