import User from "../models/User.js";

export const searchUsers = async (req, res) => {
  try {
    const searchFilter = req.query.searchFilter;
    const searchTerm = req.query.searchTerm;
    const filter = {};
    
    if (searchFilter === "name") {
      filter["$or"] = [
        {
          firstName: { $regex: new RegExp(searchTerm, "i") },
        },
        {
          lastName: { $regex: new RegExp(searchTerm, "i") },
        },
        {
          $or: [
            { firstName: { $regex: new RegExp(getFuzzyPattern(searchTerm), "i") } },
            { lastName: { $regex: new RegExp(getFuzzyPattern(searchTerm), "i") } },
          ],
        },
      ];
    } else if (searchFilter === "bloodGroup") {
      filter.bloodgroup = searchTerm;
    } 
    else {
      filter[searchFilter] = { $regex: new RegExp(searchTerm, "i") };
    }

    const users = await User.find(filter);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Function to generate fuzzy search pattern
const getFuzzyPattern = (term) => {
  const pattern = term.split("").join(".*");
  return `.*${pattern}.*`;
};
