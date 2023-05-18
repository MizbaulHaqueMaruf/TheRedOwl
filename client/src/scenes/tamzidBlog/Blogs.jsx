import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBlogs } from "state";
import Blog from "./Blog";
import { useState } from 'react';
import Navbar from "scenes/navbar/blognavbar";
import IUTImage from './img/iut.jpg';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'sticky',
    top: '70px',
    right: '30px',
    width: 'fit-content',
  },
  card: {
    display: 'flex',
    width: '300px',
    marginRight: '20px',
  },
  image: {
    width: '300px',
    height: '130px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
  },

}));

const Blogs = ({ userId, isProfile = false }) => {

  const classes = useStyles();

  //that line
  const [showLine, setShowLine] = useState(true);
  const sentence = "For IUTians, To IUTians, By IUTians";
  const words = sentence.split(" ");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 1000); // 1000 milliseconds = 1 second

    return () => {
      clearTimeout(timeout);
    };
  }, [currentWordIndex, words.length]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLine(false);
      setTimeout(() => {
        setShowLine(true);
        setCurrentWordIndex(0);
      }, 500); // 500 milliseconds
    }, words.length * 1000); // Total duration of word-by-word display

    return () => {
      clearTimeout(timeout);
    };
  }, [words.length]);



  const dispatch = useDispatch();
  const blogs = useSelector((state)=> state.blogs);
  const token = useSelector((state) => state.token);

  const getBlogs = async () => {
    const response = await fetch("http://localhost:3001/blogs", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setBlogs({ blogs: data }));
  };

  const getUserBlogs = async () => {
    const response = await fetch(
      `http://localhost:3001/blogs/${userId}/blogs`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setBlogs({ blogs: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserBlogs();
    } else {
      getBlogs();
    }
  }, []);

  
  return (
    <div>
      <Navbar />
      <div >
        <div style={{ height: '2px', textAlign: 'left', position:'sticky', top:'70px', marginLeft:'30px' }}>
        
          {showLine && (
            <div style={{ textAlign: 'left' }}>
              {words.map((word, index) => (
                <div
                  key={index}
                  style={{
                    opacity: currentWordIndex >= index ? 1 : 0,
                    fontSize: '50px', // Adjust the font size as needed
                    color:'#5C0404',
                    fontWeight: 'bold'
                  }}
                >
                  {word}
                  {index !== words.length - 1 && " "}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div style={{ padding: '0 350px',}}>
        {blogs.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          role,
          picturePath,
          userPicturePath,
        }) => (
          <Blog
          key={_id}
          blogId={_id}
          blogUserId={userId}
          name={`${firstName} ${lastName}`}
          description={description}
          role={role}
          picturePath={picturePath}
          userPicturePath={userPicturePath}
        />
      )
    )}
    
        </div>

    </div>

    <div class="card" style={{boxShadow:'0 4px 8px 4px rgba(0,0,0,0.2', height:'450px', maxWidth: '303px'}}>
      <img src={IUTImage} style={{width:'100%'}}/>
      <div class="container" style={{padding: '2px 16px'}}>
        <div style={{ fontWeight: 'bold', fontSize: '20px', fontFamily: 'cursive', color: '#5C0404', textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
          <h4>
            Embark on a journey of <span style={{ color: '#5C0404' }}>self-expression</span>, where every word paints a vivid canvas of <span style={{ color: '#5C0404' }}>thoughts</span> and <span style={{ color: '#5C0404' }}>ideas</span>.
          </h4>
        </div>

      </div>
    </div>
    
</div>
  );
};

export default Blogs;
