import { useEffect, useState } from 'react';
import { Recipe } from './interfaces/DataInterfaces';
import { RECIPE_COLUMNS } from './components/RecipeComponents';
import * as tb from './components/table/Table';
import { Title } from './components/Title';
import './App.css';

const RECIPES_URI = '/recipes.json';

const App = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recipeColumns, setrecipeColumns] =
    useState<tb.Column<Recipe>[]>(RECIPE_COLUMNS);

  useEffect(() => {
    const loadData = async () => {
      const res = await fetch(RECIPES_URI);
      const data: Recipe[] = await res.json();
      setRecipes(data);
    };
    loadData();
  }, []);

  const rowIdFunction = (recipe: Recipe) => recipe.name;

  return (
    <div className="App">
      <Title />
      <p>Welcome to Mystia&apos;s Izakaya</p>
      <tb.Table
        columns={recipeColumns}
        data={recipes}
        rowIdFunction={rowIdFunction}
      />
    </div>
  );
};

export default App;
