import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBlogs } from "state";
import Blog from "./Blog";

const Blogs = ({ userId, isProfile = false }) => {
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  
  return (
    <div>
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
          register,
          // comments,
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
          register={register}
          // comments={comments}
          style={{
            maxWidth: '500px',
            border: '1px solid #ddd',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            borderRadius: '5px',
            overflow: 'hidden'
          }}
        />
      )
    )}
</div>
  );
};

export default Blogs;
