import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import IutProfilePage from "scenes/sadafSearchDirectory/components/Directory.js";
import ProfilePage from "scenes/sadafProfile/Profile.js";
import BlogDetails from "scenes/tamzidBlog/BlogDetails.jsx";
import AllBlogs from "scenes/tamzidBlog/Blogs.jsx";
import BlogPage from "scenes/tamzidBlog/MyBlog.jsx";
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />

            <Route
              path="/profile"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />

            <Route
              path="/blog"
              element={isAuth ? <BlogPage /> : <Navigate to="/" />}
            />
            <Route
              path="/allblogs"
              element={isAuth ? <AllBlogs /> : <Navigate to="/" />}
            />
            <Route exact path="/allblogs" component={AllBlogs} />
            <Route path="/blogs/:blogId" component={BlogDetails} />

            <Route
              path="/iutProfile"
              element={isAuth ? <IutProfilePage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
