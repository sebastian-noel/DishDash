import React, { useState } from 'react';
import Header from './components/Header'; 
import SearchBar from './components/SearchBar';
import './styles.css';

function App() {
  const [searchQuery, setSearchQuery] = useState(''); // Track the search query

  // Handle search input
  const handleSearch = (query) => {
    setSearchQuery(query); // Update the search query when a search is made
  };

  return(
    <div>
      <Header title="Welcome to DishDash!" subtitle="What's in your Fridge?" /> {/* This uses the Header component */}
      <SearchBar onSearch={handleSearch} /> {/* Add SearchBar */}
      
      {/* Display the search query below */}
      {searchQuery && <p>Searching for: <strong>{searchQuery}</strong></p>}
    </div>
  );
}

export default App;