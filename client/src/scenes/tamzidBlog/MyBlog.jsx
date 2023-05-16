import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setBlogs } from "state";
import { Navigate, useNavigate } from 'react-router-dom';

const MyBlog = ({ picturePath }) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    //const [post, setPost] = useState("");
    const [blog, setBlog]= useState("");
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;
  
    const handleBlog = async () => {
      const formData = new FormData();
      formData.append("userId", _id);
      formData.append("description", blog);
      if (image) {
        formData.append("picture", image);
        formData.append("picturePath", image.name);
      }
  
      const response = await fetch(`http://localhost:3001/blogs`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const blogs = await response.json();
      dispatch(setBlogs({ blogs }));
      setImage(null);
      setBlog("");
      navigate('/AllBlogs');
    };
    const navigate = useNavigate();
    return (
      <WidgetWrapper>
        <FlexBetween gap="1.5rem">
          <UserImage image={picturePath} />
          <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Create Blog</h1>
            
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="description" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Description</label>
              <textarea id="description" name="description" placeholder="Write a blog" onChange={(e) => setBlog(e.target.value)} value={blog} required style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px', fontFamily: 'Arial, Helvetica, sans-serif' }}></textarea>
              </div>
              <button onClick={handleBlog} style={{ backgroundColor: '#008cba', color: '#fff', border: 'none', borderRadius: '5px', padding: '10px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>Submit</button>
            
          </div>

         </FlexBetween>
        
      </WidgetWrapper>
    );
  };
  
  export default MyBlog;
  




/*
{isImage && (
          <Box
            border={`1px solid ${medium}`}
            borderRadius="5px"
            mt="1rem"
            p="1rem"
          >
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => (
                <FlexBetween>
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    width="100%"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!image ? (
                      <p>Add Image Here</p>
                    ) : (
                      <FlexBetween>
                        <Typography>{image.name}</Typography>
                        <EditOutlined />
                      </FlexBetween>
                    )}
                  </Box>
                  {image && (
                    <IconButton
                      onClick={() => setImage(null)}
                      sx={{ width: "15%" }}
                    >
                      <DeleteOutlined />
                    </IconButton>
                  )}
                </FlexBetween>
              )}
            </Dropzone>
          </Box>
        )}
         <InputBase
            placeholder="Write a blog"
            onChange={(e) => setBlog(e.target.value)}
            value={blog}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "1rem 2rem",
            }}
          />
  
          <FlexBetween gap="0.5rem" onClick={() => setIsImage(!isImage)}>
            <ImageOutlined sx={{ color: mediumMain }} />
            <Typography
              color={mediumMain}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            ></Typography>
            <Button
              // disabled={!post}
              onClick={handleBlog}
              sx={{
                color: palette.background.alt,
                backgroundColor: palette.primary.main,
                borderRadius: "3rem",
              }}
            >
              POST
            </Button>
          </FlexBetween>
        
    */