import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import Address from "./Components/Address";
import BasicInfo from "./Components/Basic_info";
import Contact from "./Components/Contact";
import Education from "./Components/Education";
import Experience from "./Components/Experience";
import Intro from "./Components/Intro";
import Research from "./Components/Research";
import Skills from "./Components/Skills";
import "./Profile.css";

function Profile() {
  const { userId } = useParams();
  return (
    <div className="Profile">
      <Navbar />
      <BasicInfo user_id={userId} />
      <div className="grid-container">
        <div className="left-panel">
          <Intro user_id={userId} />
        </div>
        <div className="right-panel">
          <Contact user_id={userId} />
        </div>
      </div>
      <Experience user_id={userId} />
      <Education user_id={userId} /> 
      <Research user_id={userId} />
      <Skills user_id={userId} />
      <Address user_id={userId} />
    </div>
  );
}

export default Profile;
