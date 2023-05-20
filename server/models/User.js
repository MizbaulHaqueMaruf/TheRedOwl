import mongoose from "mongoose";
// Define the education schema
const researchSchema = new mongoose.Schema({
    interest:{
      type:String,
      required:true
    }
});
const skillSchema = new mongoose.Schema({
    skill:{
      type:String,
      required:true
    }
});
const educationSchema = new mongoose.Schema({
  institute: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    required: true
  },
  years: {
    type: String,
    required: true
  }
});
/// socialMedia Schema
const SocialMediaSchema= new mongoose.Schema(
  {
      MessengerLink:{
              type: String
      },
      YoutubeLink:{
              type: String
      },
      LinkedInLink:{
              type: String
      },
      GoogleScholarLink:{
              type: String
      },
      TwitterLink:{
              type: String
      }
  }
);
// Define the experience schema
const experienceSchema = new mongoose.Schema({
  position: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  years: {
    type: String,
    required: true
  },
  location:{
    type: String,
    required:true
  }
});
const UserSchema = new mongoose.Schema(
 {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    intro:{
      type: String
    }
    ,
    description:{
      type: String
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    year:{
      type: Number
    },
    researchInterests:{
      type:[researchSchema],
      default:[]
    },
    skills:{
      type:[skillSchema],
      default:[]
    },
    education: {
      type: [educationSchema],
      default: [],
    },
    experience: {
      type: [experienceSchema],
      default: [],
    },
    bloodgroup: String, 
    socialMedia: SocialMediaSchema,
    // friends: {
    //   type: Array,
    //   default: [],
    // },
    role: String,
    studentId: String,
    address:String, 
    // viewedProfile: Number,
    // impressions: Number,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
