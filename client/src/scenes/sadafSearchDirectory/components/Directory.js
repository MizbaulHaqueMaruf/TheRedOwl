import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Pagination, Row } from 'react-bootstrap';
import Amar from '../20230306_144219.jpg';
import woman1 from '../christina-wocintechchat-com-c-mgSuxqpzA-unsplash.jpg';
import woman2 from '../immo-wegmann-rReG42Hkqo4-unsplash.jpg';
import Man3 from '../linkedin-sales-solutions-NpyF7rjqmq4-unsplash.jpg';
import Man1 from "../male-indian-programmer-working-desktop-computer-white-desk-office.jpg";
import Man2 from '../man-analysing-binary-code-virtual-screen.jpg';
import ManorWoman from '../vince-fleming-_THUISs23CI-unsplash.jpg';
import './Directory.css'; // assuming you have created the CSS file for styling
const directoryData = [
  { 
    name: 'John Das',
    image: Man1, // placeholder image
    company: 'ABC Inc',
    institute: 'IUT',
    year: '2019',
    skills: ['React', 'Node.js'],
    research: 'Machine Learning',
    location: 'New York'
  },
  {
    name: 'Jane Smith',
    image: woman1, // placeholder image
    company: 'XYZ Corp',
    institute: 'Stanford',
    year: '2020',
    skills: ['Python', 'Java'],
    research: 'Artificial Intelligence',
    location: 'San Francisco'
  },
  {
    name: 'Bob Johnson',
    image: Amar,  // placeholder image
    company: 'PQR Ltd',
    institute: 'MIT',
    year: '2018',
    skills: ['C++', 'OpenGL'],
    research: 'Computer Graphics',
    location: 'Boston'
  },
  {
    name: 'Alice Lee',
    image: 'https://via.placeholder.com/150', // placeholder image
    company: 'LMN LLC',
    institute: 'Harvard',
    year: '2017',
    skills: ['Ruby', 'Rails'],
    research: 'Web Development',
    location: 'Cambridge'
  },
  {
    name: 'David Kim',
    image: Man2, // placeholder image
    company: 'EFG Co',
    institute: 'Caltech',
    year: '2019',
    skills: ['JavaScript', 'Vue.js'],
    research: 'Frontend Development',
    location: 'Los Angeles'
  },
  {
    name: 'Samantha Lee',
    image: Man3, // placeholder image
    company: 'JKL Inc',
    institute: 'UC Berkeley',
    year: '2021',
    skills: ['PHP', 'WordPress'],
    research: 'Content Management',
    location: 'Berkeley'
  },
  {
    name: 'Tom Wilson',
    image: woman2, // placeholder image
    company: 'STU Corp',
    institute: 'Oxford',
    year: '2016',
    skills: ['Scala', 'Spark'],
    research: 'Big Data',
    location: 'London'
  },
  {
    name: 'Emily Chen',
    image: 'https://via.placeholder.com/150', // placeholder image
    company: 'VWX Ltd',
    institute: 'Yale',
    year: '2022',
    skills: ['Swift', 'iOS'],
    research: 'Mobile Development',
    location: 'New Haven'
  },
  {
    name: 'Jack Wang',
    image: 'https://via.placeholder.com/150', // placeholder image
    company: 'YZA Inc',
    institute: 'Princeton',
    year: '2020',
    skills: ['Python', 'Django'],
    research: 'Backend Development',
    location: 'Princeton'
  },
  {
    name: 'Karen Kim',
    image: 'https://via.placeholder.com/150', // placeholder image
    company: 'ABC Inc',
    institute: 'Stanford',
    year: '2019',
    skills: ['React', 'Node.js'],
    research: 'Machine Learning',
    location: 'San Francisco'
  },
  {
    name: 'Linda Nguyen',
    image: 'https://via.placeholder.com/150', // placeholder image
    company: 'GHI Inc',
    institute: 'UC San Diego',
    year: '2021',
    skills: ['JavaScript', 'React Native'],
    research: 'Mobile App Development',
    location: 'San Diego'
  },
  {
    name: 'Kevin Lee',
    image: ManorWoman, // placeholder image
    company: 'JKL Ltd',
    institute: 'Cornell',
    year: '2022',
    skills: ['Python', 'Flask'],
    research: 'Web Development',
    location: 'Ithaca'
  },
  {
    name: 'Rachel Kim',
    image: 'https://via.placeholder.com/150', // placeholder image
    company: 'MNO Co',
    institute: 'UCLA',
    year: '2019',
    skills: ['PHP', 'Laravel'],
    research: 'Backend Development',
    location: 'Los Angeles'
  },
  {
    name: 'Henry Wu',
    image: 'https://via.placeholder.com/150', // placeholder image
    company: 'PQR Inc',
    institute: 'University of Toronto',
    year: '2020',
    skills: ['C++', 'OpenCV'],
    research: 'Computer Vision',
    location: 'Toronto'
  },
  {
    name: 'Emma Chen',
    image: 'https://via.placeholder.com/150', // placeholder image
    company: 'STU Ltd',
    institute: 'Harvard',
    year: '2017',
    skills: ['Ruby', 'Rails'],
    research: 'Web Development',
    location: 'Cambridge'
  },
  {
    name: 'David Park',
    image: 'https://via.placeholder.com/150', // placeholder image
    company: 'VWX Co',
    institute: 'UC Berkeley',
    year: '2021',
    skills: ['Python', 'Django'],
    research: 'Backend Development',
    location: 'Berkeley'
  },
  {
    name: 'Sophie Kim',
    image: 'https://via.placeholder.com/150', // placeholder image
    company: 'YZA Ltd',
    institute: 'Stanford',
    year: '2019',
    skills: ['React', 'Node.js'],
    research: 'Machine Learning',
    location: 'San Francisco'
  },
  {
    name: 'Alex Lee',
    image: 'https://via.placeholder.com/150', // placeholder image
    company: 'ABC Inc',
    institute: 'MIT',
    year: '2018',
    skills: ['Python', 'PyTorch'],
    research: 'Artificial Intelligence',
    location: 'Boston'
  },
  {
    name: 'Olivia Chen',
    image: 'https://via.placeholder.com/150', // placeholder image
    company: 'DEF Corp',
    institute: 'Yale',
    year: '2022',
    skills: ['Swift', 'iOS'],
    research: 'Mobile Development',
    location: 'New Haven'
  },  
  // ... more directory data objects
];



function Directory() {
  const [searchFilter, setSearchFilter] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(directoryData);
  const [activePage, setActivePage] = useState(1);
  const pageSize = 20;
  const totalPages = Math.ceil(filteredData.length / pageSize);

  const handleSearch = (e) => {
    e.preventDefault();
    // filter the directory data based on search term and selected filter
    const filtered = directoryData.filter((person) => {
      if (searchFilter === 'skills') {
        return person[searchFilter].some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      }
      return person[searchFilter].toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredData(filtered);
    setActivePage(1);
  }

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  }

  const renderCards = () => {
    const startIndex = (activePage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, filteredData.length);
    const cards = [];
    for (let i = startIndex; i < endIndex; i++) {
      cards.push(
        <Col key={i} xs={12} sm={6} md={4} lg={3} className="mb-3">
          <Card>
            <Card.Img className="card-img-top" variant="top" src={filteredData[i].image} />
            <Card.Body className="card-body">
              <Card.Title className="card-title">{filteredData[i].name}</Card.Title>
              <Card.Link href="#" className="card-link">View Profile</Card.Link>
            </Card.Body>
          </Card>
        </Col>
      );
    }
    return cards;
  }

  return (
    <div className="directory-page">
      <Container>
        <Form onSubmit={handleSearch}>
          <div className="form-container">
            <Col md={4}>
              <Form.Select className="form-select" value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)}>
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
              <Form.Control className="form-control" type="text" placeholder={`Search by ${searchFilter}`} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </Col>
            <Col md={4}>
          <Button className="search-btn" type="submit">Search</Button>
        </Col>
      </div>
    </Form>
    <Row className="card-row">
      {renderCards()}
    </Row>
    <div className="pagination-container">
  <Pagination className="pagination" size="lg">
    <Pagination.First disabled={activePage === 1} onClick={() => handlePageChange(1)} />
    <Pagination.Prev disabled={activePage === 1} onClick={() => handlePageChange(activePage - 1)} />
    {[...Array(totalPages).keys()].map((pageNumber) => (
      <Pagination.Item key={pageNumber + 1} active={pageNumber + 1 === activePage} onClick={() => handlePageChange(pageNumber + 1)}>{pageNumber + 1}</Pagination.Item>
    ))}
    <Pagination.Next disabled={activePage === totalPages || activePage >= totalPages} onClick={() => handlePageChange(activePage + 1)} />
    <Pagination.Last disabled={activePage === totalPages} onClick={() => handlePageChange(totalPages)} />
  </Pagination>
</div>

  </Container>
</div>
  );
}
export default Directory;






