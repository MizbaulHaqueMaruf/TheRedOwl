import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';

const Search = () => {
  const [section, setSection] = useState('');
  const [query, setQuery] = useState('');

  const handleSectionChange = (event) => {
    setSection(event.target.value);
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <form>
      <div className="search-wrapper">
        <select value={section} onChange={handleSectionChange}>
          <option value="">Name</option>
          <option value="batch_number">Batch Number</option>
          <option value="skills">Skills</option>
          <option value="research_interest">Research Interest</option>
          <option value="institute_name">Institute Name</option>
          <option value="company_name">Company Name</option>
        </select>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={query}
            onChange={handleQueryChange}
          />
        </div>
        <button className="search-btn">
          <BsSearch />
        </button>
      </div>
    </form>
  );
};

export default Search;
