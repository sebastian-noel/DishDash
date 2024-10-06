import React, { useState } from 'react';
import './SearchBar.css'; // Import the CSS file
import axios from 'axios'; // Import axios for API requests
import dishDashLogo from './assets/dishDashLogo.png'; // Correct path for the logo

function SearchBar() {
  const [query, setQuery] = useState('');
  const [terms, setTerms] = useState([]);
  const [recipes, setRecipes] = useState([]); // State to store returned recipes
  const [suggestions, setSuggestions] = useState([]); // State to store suggestions
  const [error, setError] = useState(null); // State to handle errors

  // Preloaded top 50 NER items (common ingredients)
  const topNERItems = [
    'salt', 'sugar', 'flour', 'eggs', 'butter', 'onion', 'milk', 'vanilla',
    'water', 'margarine', 'pepper', 'brown sugar', 'egg', 'baking powder',
    'cream cheese', 'cinnamon', 'sour cream', 'nuts', 'celery', 'pineapple',
    'pecans', 'Cheddar cheese', 'tomatoes', 'garlic', 'baking soda', 'oil',
    'onions', 'lemon juice', 'mayonnaise', 'soda', 'vinegar', 'green pepper',
    'ground beef', 'shortening', 'chicken', 'potatoes', 'Worcestershire sauce',
    'carrots', 'cream of mushroom soup', 'rice', 'parsley', 'mushrooms',
    'cream of chicken soup', 'powdered sugar', 'Parmesan cheese', 'oleo',
    'nutmeg', 'bacon', 'raisins', 'cocoa'
  ];

  // Handle input change
  const handleInputChange = (event) => {
    const input = event.target.value;
    setQuery(input);

    // Filter suggestions based on input
    if (input.length > 0) {
      const filteredSuggestions = topNERItems
        .filter(item => item.toLowerCase().startsWith(input.toLowerCase())) // Match items starting with input
        .slice(0, 3); // Limit to top 3 suggestions
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // Handle adding a term (ingredient)
  const handleAddTerm = async (term) => {
    if (!terms.includes(term)) {
      const updatedTerms = [...terms, term];
      setTerms(updatedTerms);
      setQuery(''); // Clear the input after adding
      setSuggestions([]); // Clear suggestions

      // Trigger a new recipe search automatically after adding a suggestion
      await fetchRecipes(updatedTerms);
    }
  };

  // Handle form submission and fetch recipes
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Only add the query to terms if it is valid
    if (query.trim() && !terms.includes(query.trim())) {
      const updatedTerms = [...terms, query.trim()];
      setTerms(updatedTerms);
      setQuery(''); // Clear input field after adding
      setSuggestions([]); // Clear suggestions

      // Trigger a new recipe search with the updated terms
      await fetchRecipes(updatedTerms);
    }
  };

  // Function to fetch recipes from the backend
  const fetchRecipes = async (ingredients) => {
    try {
      // Make the API call to the backend to fetch recipes
      const response = await axios.post('http://localhost:5000/api/recipes/searchByIngredients', {
        ingredients
      });

      // Update the recipes state with the API response
      setRecipes(response.data);
      setError(null); // Clear any existing errors
    } catch (err) {
      console.error('Error fetching recipes:', err);
      setError('Failed to fetch recipes. Please try again.');
      setRecipes([]); // Reset recipes on error
    }
  };

  // Handle removing a term from the array
  const handleRemove = async (termToRemove) => {
    const updatedTerms = terms.filter((term) => term !== termToRemove);
    setTerms(updatedTerms);

    // Trigger a new recipe search after removing the term
    await fetchRecipes(updatedTerms);
  };

  return (
    <div className="search-bar-wrapper">
      {/* Add the logo here */}
      <img src={dishDashLogo} alt="DishDash Logo" className="logo" />

      {/* Search input form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Enter Items in your fridge..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {/* Display the search terms as colored buttons (chips) */}
      <div className="terms-container">
        {terms.map((term, index) => (
          <div key={index} className="term-chip" onClick={() => handleRemove(term)}>
            {term} &#x2715;
          </div>
        ))}
      </div>

      {/* Suggested ingredients (in green chips) */}
      <div className="suggestions-container">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="suggestion-chip"
            onClick={() => handleAddTerm(suggestion)}
          >
            {suggestion}
          </div>
        ))}
      </div>

      {/* Show error if any */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display the recipes returned by the backend */}
      <div className="recipes-container">
        {recipes.length > 0 ? (
          <ul>
            {recipes.map((recipe) => (
              <li key={recipe._id}>
                <h3>{recipe.title}</h3>
                <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
                <p><strong>Instructions:</strong> {recipe.directions.join('. ')}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No recipes found. Try adding more ingredients!</p>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
