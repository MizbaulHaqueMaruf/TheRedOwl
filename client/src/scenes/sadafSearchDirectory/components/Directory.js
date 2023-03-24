import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Amar from "../20230306_144219.jpg";
import Anan from "../anan.jpg";
import Man1 from "../mukit.jpg";
import woman2 from "../nibir.jpg";
import Ridun from "../ridun.jpg";
import ManorWoman from "../siam.jpg";
import Man2 from "../tamzid.jpg";
import woman1 from "../zerin.jpg";
import Navbar from "scenes/navbar";
import "./Directory.css"; // assuming you have created the CSS file for styling
const directoryData = [
  {
    name: "Mukit Mahdin",
    image: Man1, // placeholder image
    company: "ABC Inc",
    institute: "IUT",
    year: "2019",
    skills: ["React", "Node.js"],
    research: "Machine Learning",
    location: "New York",
  },
  {
    name: "Zannatul Ferdous",
    image: woman1, // placeholder image
    company: "XYZ Corp",
    institute: "Stanford",
    year: "2020",
    skills: ["Python", "Java"],
    research: "Artificial Intelligence",
    location: "San Francisco",
  },
  {
    name: "Samin Sadaf",
    image: Amar, // placeholder image
    company: "PQR Ltd",
    institute: "MIT",
    year: "2018",
    skills: ["C++", "OpenGL"],
    research: "Computer Graphics",
    location: "Boston",
  },
  {
    name: "Mahfuj Anan",
    image: Anan, // placeholder image
    company: "LMN LLC",
    institute: "Harvard",
    year: "2017",
    skills: ["Ruby", "Rails"],
    research: "Web Development",
    location: "Cambridge",
  },
  {
    name: "Tamzid Bakht",
    image: Man2, // placeholder image
    company: "EFG Co",
    institute: "Caltech",
    year: "2019",
    skills: ["JavaScript", "Vue.js"],
    research: "Frontend Development",
    location: "Los Angeles",
  },
  {
    name: "Nibir Kabir",
    image: woman2, // placeholder image
    company: "STU Corp",
    institute: "Oxford",
    year: "2016",
    skills: ["Scala", "Spark"],
    research: "Big Data",
    location: "London",
  },
  {
    name: "Ridun",
    image: Ridun, // placeholder image
    company: "VWX Ltd",
    institute: "Yale",
    year: "2022",
    skills: ["Swift", "iOS"],
    research: "Mobile Development",
    location: "New Haven",
  },
  {
    name: "Siam Sindeed Khan",
    image: ManorWoman, // placeholder image
    company: "JKL Ltd",
    institute: "Cornell",
    year: "2022",
    skills: ["Python", "Flask"],
    research: "Web Development",
    location: "Ithaca",
  },
  // ... more directory data objects
];

function Directory() {
  const [searchFilter, setSearchFilter] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(directoryData);
  const [activePage, setActivePage] = useState(1);
  const pageSize = 20;

  const handleSearch = (e) => {
    e.preventDefault();
    // filter the directory data based on search term and selected filter
    const filtered = directoryData.filter((person) => {
      if (searchFilter === "skills") {
        return person[searchFilter].some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      return person[searchFilter]
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
    setFilteredData(filtered);
    setActivePage(1);
  };

  const renderCards = () => {
    const startIndex = (activePage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, filteredData.length);
    const cards = [];
    for (let i = startIndex; i < endIndex; i++) {
      cards.push(
        <Col key={i} xs={12} sm={6} md={4} lg={3} className="mb-3">
          <Card>
            <Card.Img
              className="card-img-top"
              variant="top"
              src={filteredData[i].image}
            />
            <Card.Body className="card-body">
              <Card.Title className="card-title">
                {filteredData[i].name}
              </Card.Title>
              <Card.Link href="#" className="card-link">
                View Profile
              </Card.Link>
            </Card.Body>
          </Card>
        </Col>
      );
    }
    return cards;
  };

  return (
    <div>
      <Navbar />
      <div className="directory-page">
        <Container>
          <Form onSubmit={handleSearch}>
            <div className="form-container">
              <Col md={4}>
                <Form.Select
                  className="form-select"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                >
                  <option value="name">Name</option>
                  <option value="company">Company</option>
                  <option value="institute">Institute</option>
                  <option value="year">Year</option>
                  <option value="skills">Skills</option>
                  <option value="research">Research</option>
                  <option value="location">Location</option>
                </Form.Select>
              </Col>
              <Col md={4}>
                <Form.Control
                  className="form-control"
                  type="text"
                  placeholder={`Search by ${searchFilter}`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Col>
              <Col md={4}>
                <Button className="search-btn" type="submit">
                  Search
                </Button>
              </Col>
            </div>
          </Form>
          <Row className="card-row">{renderCards()}</Row>
        </Container>
      </div>
    </div>
  );
}
export default Directory;
