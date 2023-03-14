import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
import MailIcon from '@material-ui/icons/Mail';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import React, { useState } from "react";
import { MdBloodtype } from 'react-icons/md';
import "./Basic_info.css";

const BasicInfo =()=>{
    const [profilePic, setProfilePic] = useState(null);
    const [profileName, setProfileName] = useState("Profile Name");
    const [profileDesc, setProfileDesc] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    const [emailId, setEmailId] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);
    
  
    const handleProfilePicChange = (event) => {
      const file = event.target.files[0];
      setProfilePic(file);
    };
  
    const handleSaveProfile = () => {
      // TODO: Send the updated profile information to the server
      setIsEditMode(false);
    };
    const handleDeleteProfilePic = () => {
      setProfilePic(null);
    };
    const renderProfilePic = () => {
      if (profilePic) {
        return <img src={URL.createObjectURL(profilePic)} alt="Profile" />;
      } else {
        return <PhotoCamera />;
      }
    };
    const renderProfileName = () => {
      if (isEditMode) {
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
        return <h3>{profileName}</h3>;
      }
    };
    
    const renderProfileDesc = () => {
      if (isEditMode) {
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
        return <h4>{profileDesc}</h4>;
      }
    };
    
    
    const renderEmailId = () => {
      if (emailId) {
        return (
          <IconButton fontSize='small' onClick={() => window.location.href = `mailto:${emailId}`}>
            <MailIcon fontSize="small"/><h6>{emailId}</h6>
          </IconButton>
        );
       }
     };
  
    const renderBloodGroup = () => {
      if (bloodGroup) {
        return <div className="blood-group">
                <MdBloodtype className="blood-icon" />
                <h6>{bloodGroup}</h6>
                </div>
        }
    };
    const renderSaveButton = () => {
      if (isEditMode) {
        return (
          <button className="basic_info_option" onClick={handleSaveProfile}>
            Save
          </button>
        );
      } else {
        return (
          <div className="basic_info_option" onClick={() => setIsEditMode(true)}>
            <IconButton><EditIcon fontSize="small" /></IconButton>
          </div>
        );
      }
    };
    
    return (
    <div className="basic_info">
            <div className="basic_info_left">
  <label htmlFor="image-upload">
    <IconButton color="primary" aria-label="upload picture" component="span">
      {renderProfilePic()}
    </IconButton>
    {isEditMode && (
      <label>
        <h6>Update Profile</h6>
      </label>
    )}
  </label>
  {isEditMode && (
    <>
      <input
        accept="image/*"
        id="image-upload"
        type="file"
        style={{ display: "none" }}
        onChange={handleProfilePicChange}
      />
      {profilePic && (
        <div>
          <IconButton
            color="tertiary"
            aria-label="delete picture"
            onClick={handleDeleteProfilePic}
          >
            <DeleteIcon/>
          </IconButton>
        </div>
      )}
    </>
  )}
</div>

    <div className="basic_info_center">
    {renderProfileName()}         
    {renderProfileDesc()}
    </div>
   
    <div className="basic_info_right">
    {renderBloodGroup()}
    {isEditMode && (
        <div className="blood-group">
        <label htmlFor="blood-group">Blood Group:</label>
        <input
                type="text"
                id="blood-group"
                value={bloodGroup}
                onChange={(event) => setBloodGroup(event.target.value)}
            />
        </div>
        )}
    <div className="link-container">
      {renderEmailId()}
    {isEditMode && (
      <div>
     <label htmlFor="email-id">Email Id:</label>
     <input
      type="text"
      id="email-id"
      value={emailId}
      onChange={(event) => setEmailId(event.target.value)}
      />
    </div>
    )}
    </div>
  <div className="save button">
  {renderSaveButton()}
    </div>
 </div>
 </div>
    );
};
export default BasicInfo;