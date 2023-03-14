import { Box, Typography, useTheme, Divider } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import FlexBetween from "components/FlexBetween";
import ImportContactsTwoToneIcon from "@mui/icons-material/ImportContactsTwoTone";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Recent Blogs
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <ImportContactsTwoToneIcon />
            <Box>
              <Typography color={main} fontWeight="500">
                Getting Started with Competitive Programming
              </Typography>
              <Typography color={medium}>
                First of all, let me introduce the purpose of this publication
                and what can...
              </Typography>
            </Box>
          </FlexBetween>
        </FlexBetween>
      </Box>

      <Box p="0.5rem 0"></Box>
      <Divider />
      <Box p="0.5rem 0"></Box>

      <Box display="flex" flexDirection="column" gap="1.5rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <ImportContactsTwoToneIcon />
            <Box>
              <Typography color={main} fontWeight="500">
                How to get into research in your undergrad?
              </Typography>
              <Typography color={medium}>
                I’m writing this piece in response to a question I’ve been ..
              </Typography>
            </Box>
          </FlexBetween>
        </FlexBetween>
      </Box>

      <Box p="0.5rem 0"></Box>
      <Divider />
      <Box p="0.5rem 0"></Box>

      <Box display="flex" flexDirection="column" gap="1.5rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <ImportContactsTwoToneIcon />
            <Box>
              <Typography color={main} fontWeight="500">
                GPT 4.0 Will be Released Next Week
              </Typography>
              <Typography color={medium}>
                Hello everyone, here with some exciting news! It has come to
                light that GPT ...
              </Typography>
            </Box>
          </FlexBetween>
        </FlexBetween>
      </Box>

      <Box p="0.5rem 0"></Box>
      <Divider />
      <Box p="0.5rem 0"></Box>

      <Box display="flex" flexDirection="column" gap="1.5rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <ImportContactsTwoToneIcon />
            <Box>
              <Typography color={main} fontWeight="500">
                My Google Interview Experience
              </Typography>
              <Typography color={medium}>
                Hiring Process Google uses several steps to filter out the
                candidates. Each of ..
              </Typography>
            </Box>
          </FlexBetween>
        </FlexBetween>
      </Box>
    </WidgetWrapper>

    // <WidgetWrapper>
    //   <Typography
    //     color={palette.neutral.dark}
    //     variant="h5"
    //     fontWeight="500"
    //     sx={{ mb: "1.5rem" }}
    //   >Top Blogs</Typography>
    //   <Box display="flex" flexDirection="column" gap="1.5rem">
    //     {friends.map((friend) => (
    //       <Friend
    //         key={friend._id}
    //         friendId={friend._id}
    //         name={`${friend.firstName} ${friend.lastName}`}
    //         subtitle={friend.occupation}
    //         userPicturePath={friend.picturePath}
    //       />
    //     ))}
    //   </Box>
    // </WidgetWrapper>
  );
};

export default FriendListWidget;
