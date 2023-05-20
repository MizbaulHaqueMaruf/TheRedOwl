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
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import Navbar from "scenes/navbar";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBlogs } from "state";
import { Navigate, useNavigate } from 'react-router-dom';

const MyBlog = ({ picturePath }) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [blog, setBlog]= useState("");
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const [title, setTitle] = useState("");
  
    const handleBlog = async () => {
      const formData = new FormData();
      formData.append("userId", _id);
      formData.append("title", title); // Add the title field
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
      setTitle(""); // Reset the title field
      navigate('/AllBlogs');
    };
    
    const navigate = useNavigate();
    return (
      
      <div>
        <Navbar/>
        
        <div style={{ maxWidth: '600px', margin: '150px auto', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)', background: 'linear-gradient(to bottom, #ffffff, #f2f2f2)' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#333', fontFamily: "'Times New Roman', serif", fontSize: '36px', letterSpacing: '2px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Share your thoughts!</h1>
          <div style={{ marginBottom: '20px' }}>
          <textarea id="title" name="title" placeholder="Write a title" onChange={(e) => setTitle(e.target.value)} value={title} required style={{ width: '100%', height: '200px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px', fontFamily: 'Arial, Helvetica, sans-serif' }}></textarea>
                
            <textarea id="description" name="description" placeholder="Write a blog" onChange={(e) => setBlog(e.target.value)} value={blog} required style={{ width: '100%', height: '200px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px', fontFamily: 'Arial, Helvetica, sans-serif' }}></textarea>
          </div>
          <button onClick={handleBlog} style={{ backgroundColor: '#5C0404', color: '#fff', border: 'none', borderRadius: '5px', padding: '10px 20px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer'}}  onMouseEnter={(e) => e.target.style.background = 'black'} onMouseLeave={(e) => e.target.style.background = '#5C0404'}>Submit</button>
        
        </div>


         
        
      </div>
    );
  };
  
  export default MyBlog;
  //<label htmlFor="description" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Description</label> #008cba