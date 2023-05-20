import User from "../models/User.js";

export const getUser = async (req, res) => {
        try {
          const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
          });
          if (!user) {
            return res.status(404).send({ message: 'User not found' });
          }
          res.send(user);
        } catch (error) {
          res.status(500).send({ message: error.message });
        }
};
export const checkUserAuthorization = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      if (user._id.toString() !== req.user._id) {
        return res.status(401).send({ message: 'You are not authorized to access this resource' });
      }
      req.user = user;
      next();
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  
export const updateBasicInfo = async (req, res) =>{
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        
        // Check if the user is authorized to make updates
        if (user._id.toString() !== req.user._id.toString()) {
          return res.status(401).send({ message: 'You are not authorized to make updates to this user' });
        }
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        user.bloodgroup= req.body.bloodgroup || user.bloodgroup;
        user.description= req.body.description || user.description;
        await user.save();
        return res.status(200).send({message:'Basic info updated'});   
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal server error' });
    }
}
export const addSkills =async (req, res) => {
    const { id } = req.params;
    const { skill } = req.body;
    
    try {
      const user = await User.findByIdAndUpdate(
        id,
        { $push: { skills: skill } },
        { new: true }
      );
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

export const removeSkills = async (req, res) =>{
    const { id } = req.params;
    const { skill } = req.body;
    
    try {
      const user = await User.findByIdAndUpdate(
        id,
        { $pull: { skills: skill } },
        { new: true }
      );
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
}

export const addResearchInterests =async (req, res) => {
    const { id } = req.params;
    const { researchInterest} = req.body;
    
    try {
      const user = await User.findByIdAndUpdate(
        id,
        { $push: { researchInterestss: researchInterest } },
        { new: true }
      );
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

export const removeResearchInterests = async (req, res) =>{
    const { id } = req.params;
    const { researchInterest } = req.body;
    
    try {
      const user = await User.findByIdAndUpdate(
        id,
        { $pull: { researchInterests: researchInterest } },
        { new: true }
      );
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
}

export const addAddress = async (req, res)=>{
    try{
        const {id} = req.params;
        const {address} =req.body;
        
        await user.save();
        return res.status(200).send({message:'Address updated'});   
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
} 