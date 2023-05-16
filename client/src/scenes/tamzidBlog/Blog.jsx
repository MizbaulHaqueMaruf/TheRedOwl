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
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPost, setBlog } from "state";
  
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
  
  
    return (
      <WidgetWrapper m="2rem 0">
        <Friend
          friendId={blogUserId}
          name={name}
          subtitle={role}
          userPicturePath={userPicturePath}
        />
        <Typography color={main} sx={{ mt: "1rem" }}>
          {description}
        </Typography>
        {picturePath && (
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`http://localhost:3001/assets/${picturePath}`}
          />
        )}
        
      
      </WidgetWrapper>
    );
  };
  
  export default Blog;
  