import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, studentId, role, picturePath }) => {
        return { _id, firstName, lastName, studentId, role, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, studentId, role, picturePath }) => {
        return { _id, firstName, lastName, studentId, role, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const updateBasicInfo = async (req, res) => {
  try {
    const {_id, firstName, lastName, description, bloodgroup,
            email, picturePath} = req.body;
    const user = {
      firstName: firstName, // Use req.body.firstName instead of req.body.name
      lastName: lastName, // Use req.body.lastName instead of req.body.name
      description: description,
      bloodgroup: bloodgroup,
      email: email,
      picturePath: picturePath
    };

    // Use findByIdAndUpdate instead of findById
    const updatedUser = await User.findByIdAndUpdate(_id, user, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(req.body.picturePath);
    res.status(500).json({ error: error.message});
  }
};

/*Update intro */
  export const updateIntro = async (req, res)=>{
    try{
      const _id = req.body.id;
      const user = {
        intro: req.body.intro
      };
  
      // Use findByIdAndUpdate instead of findById
      const updatedUser = await User.findByIdAndUpdate(_id, user, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
/* update social media */

export const updateSocialMedia = async (req, res)=>{
  try{
    const _id = req.body.id;
    const user = {
      socialMedia: req.body.socialMedia
    };

    // Use findByIdAndUpdate instead of findById
    const updatedUser = await User.findByIdAndUpdate(_id, user, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
/* update education */

export const updateEducation = async (req, res) =>{
  try{
    const _id = req.body.id;
    const user ={
        education : req.body.education
    };
     // Use findByIdAndUpdate instead of findById
     const updatedUser = await User.findByIdAndUpdate(_id, user, { new: true });

     if (!updatedUser) {
       return res.status(404).json({ message: "User not found" });
     }
 
     res.status(200).json(updatedUser);
  }catch(error){
    res.status(500).json({error: error.message});
  }
}
/* delete education */
export const deleteEducation = async (req, res) => {
  try {
    const { id } = req.body;
    const { index } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove the education at the specified index
    user.education.splice(index, 1);

    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* update experience */

export const updateExperience = async (req, res) =>{
  try{
    const _id = req.body.id;
    const user ={
        experience : req.body.experience
    };
     // Use findByIdAndUpdate instead of findById
     const updatedUser = await User.findByIdAndUpdate(_id, user, { new: true });

     if (!updatedUser) {
       return res.status(404).json({ message: "User not found" });
     }
 
     res.status(200).json(updatedUser);
  }catch(error){
    res.status(500).json({error: error.message});
  }
}

/* delete experience */
export const deleteExperience = async (req, res) => {
  try {
    const { id } = req.body;
    const { index } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove the education at the specified index
    user.experience.splice(index, 1);

    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* update researchInterests */

export const updateResearchInterests = async (req, res)=>{
    
  try{  
      const _id = req.body.id;
      const user ={
        researchInterests : req.body.researchInterests
      };
      // Use findByIdAndUpdate instead of findById
     const updatedUser = await User.findByIdAndUpdate(_id, user, { new: true });

     if (!updatedUser) {
       return res.status(404).json({ message: "User not found" });
     }
 
     res.status(200).json(updatedUser);
  }catch(error){
    res.status(500).json({ error: error.message });
  }
}

/* update skills */

export const updateSkills = async (req, res)=>{
    
  try{  
      const _id = req.body.id;
      const user ={
        skills : req.body.skills
      };
      // Use findByIdAndUpdate instead of findById
     const updatedUser = await User.findByIdAndUpdate(_id, user, { new: true });

     if (!updatedUser) {
       return res.status(404).json({ message: "User not found" });
     }
 
     res.status(200).json(updatedUser);
  }catch(error){
    res.status(500).json({ error: error.message });
  }
}

/*update address */

export const updateAddress = async(req, res)=>{
  try{  
    const _id = req.body.id;
    const user ={
      address : req.body.address
    };
    // Use findByIdAndUpdate instead of findById
   const updatedUser = await User.findByIdAndUpdate(_id, user, { new: true });

   if (!updatedUser) {
     return res.status(404).json({ message: "User not found" });
   }

   res.status(200).json(updatedUser);
}catch(error){
  res.status(500).json({ error: error.message });
}
}