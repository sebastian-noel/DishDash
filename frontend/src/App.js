import React from 'react';
import RecipeSearch from './RecipeSearch.js';
import './App.css'; // Make sure you have this file for global styles

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>DishDash Recipe Finder</h1>
      </header>
      <main>
        <RecipeSearch />
      </main>
      <footer>
        <p>© 2024 DishDash. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;