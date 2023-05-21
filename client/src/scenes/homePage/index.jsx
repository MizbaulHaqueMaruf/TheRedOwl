import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import BlogListWidget from "scenes/widgets/BlogListWidget";
import Contact from "scenes/Components/Contact";
import Education from "../Components/Education";
import Experience from "scenes/Components/Experience";
import Intro from "scenes/Components/Intro";
import Research from "scenes/Components/Research";
import Skills from "scenes/Components/Skills";
import Address from "scenes/Components/Address";
import "./index.css";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
          {/* <Experience user_id={_id} />
          <Education user_id={_id} />
          <Research user_id={_id} />
          <Skills user_id={_id} />
          <Address user_id={_id} /> */}
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <BlogListWidget userId={_id} />
            {/* <div className="right-panel">
              <Contact user_id={_id} />
            </div> */}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
