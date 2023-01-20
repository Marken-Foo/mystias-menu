import { useEffect, useState } from 'react';
import { Recipe } from './interfaces/DataInterfaces';
import {
  makeRecipeRow,
  RECIPE_COLUMNS,
  RecipeRow,
} from './components/RecipeComponents';
import * as tb from './components/Table';
import { Title } from './components/Title';
import './App.css';

const RECIPES_URI = '/recipes.json';

const App = () => {
  const [recipeComponents, setRecipeComponents] = useState<RecipeRow[]>([]);
  const [recipeColumns, setrecipeColumns] =
    useState<tb.Column[]>(RECIPE_COLUMNS);

  useEffect(() => {
    const loadData = async () => {
      const res = await fetch(RECIPES_URI);
      const data: Recipe[] = await res.json();
      makeComponents(data);
    };
    const makeComponents = (recipes: Recipe[]) => {
      const components = recipes.map(makeRecipeRow);
      setRecipeComponents(components);
    };
    loadData();
  }, []);

  return (
    <div className="App">
      <Title />
      <p>Welcome to Mystia&apos;s Izakaya</p>
      <tb.Table columns={recipeColumns} data={recipeComponents} />
    </div>
  );
};

export default App;
