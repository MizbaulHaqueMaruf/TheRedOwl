import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Address.css";

const Address = ({ user_id }) => {
  const loggedInUserId = useSelector((state) => state.user._id);
  const isOwnerProfile = loggedInUserId === user_id;
  const [address, setAddress] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const token = useSelector((state) => state.token);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`http://localhost:3001/users/${user_id}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (data && data.address) {
          setAddress(data.address);
        }
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    getUser();
  }, [user_id, token]);
  
  if(!user){
    return null;
  }
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleSaveClick = () => {
    const requestBody = {
      id: user_id,
      address: address,
    };
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    };

    fetch("http://localhost:3001/users/updateAddress", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Handle the response as needed
        setIsEditable(false); // Exit edit mode after successfully saving the profile
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteClick = () => {
    setAddress("");
  };

  return (
    <div className="address">
      <div className="address-top">
        <h3 style={{ flex: 1, textAlign: "left" }}>Address</h3>
        {!isEditable && isOwnerProfile && (
          <IconButton onClick={handleEditClick}>
            <EditIcon fontSize="small" />
          </IconButton>
        )}
        {isEditable && isOwnerProfile && (
          <IconButton onClick={handleSaveClick}>
            <SaveIcon fontSize="small" />
          </IconButton>
        )}
        {isEditable && isOwnerProfile && (
          <IconButton onClick={handleDeleteClick}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        )}
      </div>
      <div className="address-elements">
        {isEditable && isOwnerProfile ? (
          <input type="text" value={address} onChange={handleAddressChange} />
        ) : (
          <h3>{address || ""}</h3>
        )}
      </div>
    </div>
  );
};

export default Address;
