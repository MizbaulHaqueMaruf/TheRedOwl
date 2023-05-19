import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    HowToRegOutlined,
    HowToRegRounded,
    ShareOutlined,
  } from "@mui/icons-material";
  import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
  import FlexBetween from "components/FlexBetween";
  import Friend from "components/Friend";
  import WidgetWrapper from "components/WidgetWrapper";
  //import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPost, setBlog } from "state";
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

  
  import React, { useState } from 'react';
  //import { useTheme } from '@mui/material/styles';
  //import Typography from '@mui/material/Typography';
  //import WidgetWrapper from 'path/to/WidgetWrapper'; // Replace with the actual path
  //import Friend from 'path/to/Friend'; // Replace with the actual path
  
  const Blog = ({
    blogUserId,
    name,
    description,
    role,
    picturePath,
    userPicturePath,
  }) => {
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const [showFullDescription, setShowFullDescription] = useState(false);
  
    const toggleDescription = () => {
      setShowFullDescription(!showFullDescription);
    };
  
    const getDescription = () => {
      if (showFullDescription) {
        return description;
      } else {
        return description.substring(0, 500) + '...';
      }
    };
  
    return (
      <WidgetWrapper m="2rem 0" className="blog-item">
        <Friend
          friendId={blogUserId}
          name={name}
          subtitle={role}
          userPicturePath={userPicturePath}
        />
        <Typography color={main} sx={{ mt: '1rem' }}>
          {getDescription()}
        </Typography>
        {picturePath && (
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
            src={`http://localhost:3001/assets/${picturePath}`}
          />
        )}
      <button onClick={toggleDescription} className="read-more-button">
        {showFullDescription ? (
        <>
         <FontAwesomeIcon icon={faAngleUp} />
    </>
  ) : (
    <>
       <FontAwesomeIcon icon={faAngleDown} />
    </>
  )}
      </button>
      </WidgetWrapper>
    );
  };
  
  export default Blog;
  