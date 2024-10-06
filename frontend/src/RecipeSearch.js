import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

const ingredients = [
  'Chicken', 'Beef', 'Pork', 'Fish', 'Tomato', 'Onion', 'Garlic', 'Pasta',
  'Rice', 'Potato', 'Carrot', 'Broccoli', 'Cheese', 'Egg', 'Milk', 'Butter'
];

const RecipeCard = ({ recipe, index }) => (
  <div 
    className="bg-white rounded-lg shadow-md p-4 transition-all duration-300 hover:shadow-lg"
    style={{
      animation: `fadeScaleIn 300ms ease-out ${index * 50}ms both`
    }}
  >
    <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
    <p className="text-gray-600 mb-2">Ingredients: {recipe.ingredients.join(', ')}</p>
    <p className="text-gray-600">Instructions: {recipe.instructions}</p>
  </div>
);

const RecipeSearch = () => {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (search.length > 0) {
      const filtered = ingredients.filter(ing => 
        ing.toLowerCase().startsWith(search.toLowerCase()) &&
        !selectedIngredients.includes(ing)
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setTimeout(() => setSuggestions([]), 300);
    }
  }, [search, selectedIngredients]);

  const toggleIngredient = (ingredient) => {
    setSelectedIngredients(prev => 
      prev.includes(ingredient)
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    );
    setSearch('');
  };

  const searchRecipes = async () => {
    if (selectedIngredients.length === 0) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/recipes/searchByIngredients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients: selectedIngredients }),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching recipes:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <div className="w-32 h-32 mx-auto mb-4 bg-white rounded-full flex items-center justify-center text-3xl font-bold text-gray-800 shadow-md">
            LOGO
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Recipe Finder</h1>
          <p className="text-gray-600">Discover delicious recipes with your favorite ingredients!</p>
        </div>
        <div className="relative mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ingredients..."
            className="w-full px-4 py-2 rounded-full bg-white text-gray-800 placeholder-gray-500 border-2 border-gray-300 focus:outline-none focus:border-blue-500 transition duration-300 shadow-sm"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
        <div className={`mt-2 bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 ${showSuggestions ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
          <ul>
            {suggestions.map((suggestion, index) => (
              <li
                key={suggestion}
                className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer transition duration-200"
                onClick={() => toggleIngredient(suggestion)}
                style={{
                  animation: `fadeSlideIn 300ms ease-out ${index * 50}ms both`
                }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
        {selectedIngredients.length > 0 && (
          <div className="mt-4 mb-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Selected Ingredients:</h2>
            <div className="flex flex-wrap gap-2">
              {selectedIngredients.map((ingredient, index) => (
                <span
                  key={ingredient}
                  className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm flex items-center gap-1 cursor-pointer hover:bg-blue-600 transition duration-200"
                  onClick={() => toggleIngredient(ingredient)}
                  style={{
                    animation: `fadeScaleIn 300ms ease-out ${index * 50}ms both`
                  }}
                >
                  {ingredient}
                  <X size={14} />
                </span>
              ))}
            </div>
          </div>
        )}
        <button
          onClick={searchRecipes}
          className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition duration-200 mb-8"
          disabled={selectedIngredients.length === 0 || isLoading}
        >
          {isLoading ? 'Searching...' : 'Search Recipes'}
        </button>
        {searchResults.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {searchResults.map((recipe, index) => (
              <RecipeCard key={recipe._id} recipe={recipe} index={index} />
            ))}
          </div>
        )}
      </div>
      <style jsx>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeScaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default RecipeSearch;