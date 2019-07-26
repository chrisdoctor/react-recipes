import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.css';

const App = () => {
  const APP_ID = 'b2e2f9f7';
  const APP_KEY = '4c4b91b500ae86dda89e5d3783b9b24a';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (query !== '') {
      getRecipes();
    }
  }, [query]);

  const getRecipes = async() => {
    console.log('Query=' + query);
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
    console.log('search = ', search);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    console.log('setquery =', search);
    //setSearch('');
  }

  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className='recipe-card'>
        {recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
      
    </div>
  );
}

export default App;
