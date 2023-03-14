import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#333", color: "#fff", padding: "50px", marginTop: "50px" }}>
      <h2>The Red Owl: Connecting IUTIANS</h2>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "50px" }}>
        <div className="footer-section-about-us">
          <h3>About Us</h3>
          <a href="https://www.iutoic-dhaka.edu/" className="footer-link-smaller">Aim</a>
          <a href="https://www.iutoic-dhaka.edu/" className="footer-link-smaller">Vision</a>
          <a href="https://www.iutoic-dhaka.edu/" className="footer-link-smaller">Testimonials</a>
        </div>
        <div className="footer-section-contact-us">
          <h3>Contact Us</h3>
          <a href="https://www.google.com/maps/place/Islamic+University+of+Technology/@23.948102,90.37926,15z/data=!4m6!3m5!1s0x3755c4abf8334fb1:0xbb003124c3dedc91!8m2!3d23.948102!4d90.37926!16zL20vMGNtd2Qz"
            className="footer-link-smaller">BoardBazar</a>
        </div>
        <div className="footer-section-social-media">
          <h3>Social Media</h3>
          <a href="https://www.facebook.com/Official.IUT.OIC/"
            className="footer-link-smaller">
            <i className="fab fa-facebook-f"></i><span>Facebook</span></a>
          <a href="https://www.instagram.com/iut.oic/?hl=en"
            className="footer-link-smaller">
            <i className="fab fa-instagram"></i><span>Instagram</span></a>
          <a href="https://twitter.com/iutoic?lang=en"
            className="footer-link-smaller">
            <i className="fab fa-twitter"></i><span>Twitter</span></a>
          <a href="https://www.youtube.com/channel/UCjSG7A30JqtFXEgxsaXrwgw"
            className="footer-link-smaller">
            <i className="fab fa-youtube"></i><span>Youtube</span></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


