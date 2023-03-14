import { IconButton } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import { useState } from "react";
import "./Address.css";

const Address = () => {
  const [address, setAddress] = useState(""); 
  const [isEditable, setIsEditable] = useState(false);
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  const handleEditClick = () => {
    setIsEditable(true); 
  };

  const handleSaveClick = () => {
    setIsEditable(false); 
  };

  const handleDeleteClick = () => {
    setAddress("");
  };

  return (
    <div className="address">
      <div className="address-top">
        <h3 style={{ flex: 1, textAlign: 'left' }}>Address</h3>
        {!isEditable && <IconButton onClick={handleEditClick}><EditIcon fontSize="small"/></IconButton>}
        {isEditable && <IconButton onClick={handleSaveClick}><SaveIcon fontSize="small"/></IconButton>}
        {isEditable && <IconButton onClick={handleDeleteClick}><DeleteIcon fontsize="small"/></IconButton>}
      </div>
      <div className="address-elements">
        {isEditable ? (
          <input type="text" value={address} onChange={handleAddressChange} />
        ) : (
          <h4>{address || ""}</h4>
        )}
      </div>
    </div>
  );
};

export default Address;
