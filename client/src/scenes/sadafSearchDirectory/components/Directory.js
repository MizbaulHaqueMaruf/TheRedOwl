import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "scenes/navbar";
import "./Directory.css";

function Directory() {
  // Initialize state variables
  const [searchFilter, setSearchFilter] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const pageSize = 25;

  // Fetch data from API endpoint when component mounts or search parameters change
  useEffect(() => {
    axios
      .get("http://localhost:3001/search", {
        params: { searchFilter, searchTerm }
      })
      .then((response) => {
        setFilteredData(response.data);
        setActivePage(1);
      })
      .catch((error) => console.log(error));
  }, [searchFilter, searchTerm]);

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:3001/search", {
        params: { searchFilter, searchTerm }
      })
      .then((response) => {
        setFilteredData(response.data);
        setActivePage(1);
      })
      .catch((error) => console.log(error));
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredData.length / pageSize);

  // Handle page navigation
  const handlePageChange = (page) => {
    setActivePage(page);
  };

 // ...
// Render the directory cards
const renderCards = () => {
  const startIndex = (activePage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredData.length);
  const cards = [];

  for (let i = startIndex; i < endIndex; i++) {
    const profileLink = `/profile/${filteredData[i]._id}`;
    const picturePath = filteredData[i].picturePath;
    cards.push(
      <Col key={i} xs={12} sm={6} md={4} lg={3} className="mb-3">
        <Card>
          {picturePath && (
            <Card.Img
              className="card-img-top"
              variant="top"
              src={`http://localhost:3001/assets/${picturePath}`}
            />
          )}
          <Card.Body className="card-body">
            <Card.Title className="card-title">
              {filteredData[i].firstName + " " + filteredData[i].lastName}
            </Card.Title>
            <Card.Link as={Link} to={profileLink} className="card-link">
              View Profile
            </Card.Link>
          </Card.Body>
        </Card>
      </Col>
    );
  }

  return (
    <Row className="justify-content-center">
      <div className="card-container">{cards}</div>
    </Row>
  );
};


// ...


  // Render the pagination
  const renderPagination = () => {
    const pageButtons = [];
    for (let page = 1; page <= totalPages; page++) {
      pageButtons.push(
        <Button
          key={page}
          variant="outline-primary"
          className={`pagination-button ${page === activePage ? "active" : ""}`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Button>
      );
    }
    return pageButtons;
  };

  return (
    <div>
      <Navbar />
      <div className="directory-page">
        <Container>
          <Form onSubmit={handleSearch}>
            <div className="form-container" align="center">
              <Col md={4}>
                <Form.Select
                  className="form-select"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                >
                  <option value="name" align="center">Name</option>
                  <option value="experience.company" align="center">Company</option>
                  <option value="education.institute" align="center">Institute</option>
                  <option value="bloodGroup" align="center">Blood Group</option>
                  <option value="researchInterests.interest" align="center">Research</option>
                  <option value="skills.skill" align="center">Skill</option>
                </Form.Select>
              </Col>
              <Col md={4}>
                <Form.Control
                  className="form-control"
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Col>
              <Col md={4}>
                <Button type="submit" variant="primary" className="form-button">
                  Search
                </Button>
              </Col>
            </div>
          </Form>
          <div className="profile-count" align='center'>
            Number of profiles matches the criteria: {filteredData.length}
          </div>
          <Row className="justify-content-center">{renderCards()}</Row>
          <div className="pagination" align= "center">{renderPagination()}</div>
        </Container>
      </div>
    </div>
  );
}

export default Directory;
