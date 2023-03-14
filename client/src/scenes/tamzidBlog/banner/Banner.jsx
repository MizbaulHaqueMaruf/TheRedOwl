//import styled from 'styled-components';
import blogsiteImage from '../img/blogsite.jpg';
import { Box, Typography,styled } from '@mui/material';

const Image = styled(Box)`
  background-image: url(${blogsiteImage});
  background-position: cover;
  background-size: 100%;
  background-repeat:no-repeat;
  height: 50vh;
  weidth:100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Banner = () => {
  return (
    <Image>
    </Image>
  );
};

export default Banner;
