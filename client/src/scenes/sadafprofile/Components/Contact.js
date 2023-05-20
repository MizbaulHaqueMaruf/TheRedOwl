import { IconButton } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import { useEffect, useState } from "react";
import { FaFacebookMessenger, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';
import { SiGooglescholar } from 'react-icons/si';
import { useSelector } from "react-redux";
import "./contact.css";

const Contact = ({user_id}) => {
  const loggedInUserId = useSelector((state) => state.user._id);
  const isOwnerProfile = loggedInUserId === user_id;
  const [messengerLink, setMessengerLink] = useState("");
  const [LinkedInId, setLinkedInId] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [googleScholarId, setGoogleScholarId] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`http://localhost:3001/users/${user_id}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (data && data.socialMedia) {
          if (data.socialMedia.MessengerLink) setMessengerLink(data.socialMedia.MessengerLink);
          if (data.socialMedia.YoutubeLink) setYoutubeLink(data.socialMedia.YoutubeLink);
          if (data.socialMedia.LinkedInLink) setLinkedInId(data.socialMedia.LinkedInLink);
          if (data.socialMedia.GoogleScholarLink) setGoogleScholarId(data.socialMedia.GoogleScholarLink);
          if (data.socialMedia.TwitterLink) setTwitterLink(data.socialMedia.TwitterLink);
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

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSave = () => {
    const requestBody = {
      id: user_id,
      socialMedia: {
        MessengerLink: messengerLink,
        YoutubeLink: youtubeLink,
        LinkedInLink: LinkedInId,
        GoogleScholarLink: googleScholarId,
        TwitterLink: twitterLink
      }
    };
    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    };
    fetch('http://localhost:3001/users/updateSocialMedia', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data); // Handle the response as needed
        setIsEditMode(false); // Exit edit mode after successfully saving the profile
      })
      .catch(error => {
        console.error(error);
      });
  };

  const renderMessengerLink = () => {
    if (messengerLink) {
      return (
        <a href={messengerLink} target="_blank" rel="noopener noreferrer">
          <IconButton><FaFacebookMessenger fontSize='medium' /></IconButton>
        </a>
      );
    }
    return null;
  };

  const renderLinkedInId = () => {
    if (LinkedInId) {
      return (
        <a href={LinkedInId} target="_blank" rel="noopener noreferrer">
          <IconButton><FaLinkedin fontSize='medium' /></IconButton>
        </a>
      );
    }
    return null;
  };

  const renderTwitterLink = () => {
    if (twitterLink) {
      return (
        <a href={twitterLink} target="_blank" rel="noopener noreferrer">
          <IconButton><FaTwitter fontSize='medium' /></IconButton>
        </a>
      );
    }
    return null;
  };


  const renderYoutubeLink = () => {
    if (youtubeLink) {
      return (
        <a href={youtubeLink} target="_blank" rel="noopener noreferrer">
          <IconButton><FaYoutube fontSize='medium' /></IconButton>
        </a>
      );
    }
    return null;
  };


  const renderGoogleScholarId = () => {
    if (googleScholarId) {
      return (
        <a href={googleScholarId} target="_blank" rel="noopener noreferrer">
          <IconButton><SiGooglescholar fontSize='medium' /></IconButton>
        </a>
      );
    }
    return null;
  };

  return (
    <div className="contact">
      <div className="contact-top">
        <h3>Connect With Me</h3>
        {isEditMode && isOwnerProfile && (
          <IconButton fontSize='small' onClick={handleSave}><SaveIcon fontSize="small" /></IconButton>
        )}
        {!isEditMode && isOwnerProfile && (
          <IconButton fontSize='small' onClick={handleEdit}><EditIcon fontSize="small" /></IconButton>
        )}
      </div>
      <div className="contact-list">
        <div className="link-container">
          {renderMessengerLink()}
          {isEditMode && isOwnerProfile && (
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
          {renderLinkedInId()}
          {isEditMode && isOwnerProfile && (
            <div>
              <label htmlFor="Linkedin-id">LinkedIn Link:</label>
              <input
                type="text"
                id="email-id"
                value={LinkedInId}
                onChange={(event) => setLinkedInId(event.target.value)}
              />
            </div>
          )}
        </div>
        <div className="link-container">
          {renderYoutubeLink()}
          {isEditMode && isOwnerProfile && (
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
          {isEditMode && isOwnerProfile && (
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
        <div className="link-container">
          {renderTwitterLink()}
          {isEditMode && isOwnerProfile && (
            <div>
              <label htmlFor="twitter-link-id">Twitter Link :</label>
              <input
                type="text"
                id="google-scholar-id"
                value={twitterLink}
                onChange={(event) => setTwitterLink(event.target.value)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
