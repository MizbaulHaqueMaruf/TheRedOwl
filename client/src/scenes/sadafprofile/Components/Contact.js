import { IconButton } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import MailIcon from '@material-ui/icons/Mail';
import SaveIcon from '@material-ui/icons/Save';
import React, { useState } from "react";
import { FaFacebookMessenger, FaYoutube } from 'react-icons/fa';
import { SiGooglescholar } from 'react-icons/si';
import "./contact.css";

const Contact = () => {
  const [messengerLink, setMessengerLink] = useState("");
  const [emailId, setEmailId] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [googleScholarId, setGoogleScholarId] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSave = () => {
    setIsEditMode(false);
  };

  const renderMessengerLink = () => {
    if (messengerLink) {
      return (
        <a href={messengerLink} target="_blank" rel="noopener noreferrer">
          <IconButton><FaFacebookMessenger fontSize='medium'/></IconButton>
        </a>
      );
    }
  };

  const renderEmailId = () => {
    if (emailId) {
      return (
        <IconButton fontSize='small' onClick={() => window.location.href = `mailto:${emailId}`}>
          <MailIcon fontSize="small"/>
        </IconButton>
      );
    }
  };
  

  const renderYoutubeLink = () => {
    if (youtubeLink) {
      return (
        <a href={youtubeLink} target="_blank" rel="noopener noreferrer">
          <IconButton><FaYoutube fontSize='medium'/></IconButton>
        </a>
      );
    }
  };

   
  const renderGoogleScholarId = () => {
    if (googleScholarId) {
      return (
        <a href={googleScholarId} target="_blank" rel="noopener noreferrer">
          <IconButton><SiGooglescholar fontSize='medium'/></IconButton>
        </a>
      );
    }
  };

  return (
    <div className="contact">
      <div className="contact-top">
        <h3>Connect With Me</h3>
        {isEditMode ? (
          <IconButton fontSize='small' onClick={handleSave}><SaveIcon fontSize="small"/></IconButton>
        ) : (
          <IconButton fontSize='small'onClick={handleEdit}><EditIcon fontSize="small"/></IconButton>
        )}
      </div>
      <div className="contact-list">
        <div className="link-container">
          {renderMessengerLink()}
          {isEditMode && (
            <div>
              <label htmlFor="messenger-link">Messenger Link:</label>
              <input
                type="text"
                id="messenger-link"
                value={messengerLink}
                onChange={(event) => setMessengerLink(event.target.value)}
              />
            </div>
          )}
        </div>
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
        <div className="link-container">
          {renderYoutubeLink()}
          {isEditMode && (
            <div>
              <label htmlFor="youtube-link">Youtube Link:</label>
              <input
                type="text"
                id="youtube-link"
                value={youtubeLink}
                onChange={(event) => setYoutubeLink(event.target.value)}
              />
            </div>
          )}
        </div>
        <div className="link-container">
        {renderGoogleScholarId()}
        {isEditMode && (
          <div>
            <label htmlFor="google-scholar-id">Google Scholar ID:</label>
            <input
              type="text"
              id="google-scholar-id"
              value={googleScholarId}
              onChange={(event) => setGoogleScholarId(event.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  </div>
);
};
export default Contact;
