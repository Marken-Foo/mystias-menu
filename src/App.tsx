import React, { useEffect, useState } from 'react';
import { Recipe } from '@/interfaces/DataInterfaces';
import { RECIPE_COLUMNS } from '@components/RecipeComponents';
import * as tb from '@components/table/Table';
import { Title } from '@components/Title';
import '@/App.css';

const RECIPES_URI = '/recipes.json';

const CheckboxWithCaption = ({
  state,
  stateSetter,
  label,
}: {
  state: boolean;
  stateSetter: React.Dispatch<React.SetStateAction<boolean>>;
  label: string;
}) => {
  return (
    <span>
      {label}
      <input
        type="checkbox"
        defaultChecked={state}
        onChange={() => stateSetter((prevState) => !prevState)}
      />
    </span>
  );
};

const RecipeForm = ({ setDlcVersions }) => {
  const [isBaseGame, setIsBaseGame] = useState(true);
  const [isDlc1, setIsDlc1] = useState(true);
  const [isDlc2, setIsDlc2] = useState(true);

  useEffect(() => {
    setDlcVersions([isBaseGame, isDlc1, isDlc2, true, true]);
  }, [isBaseGame, isDlc1, isDlc2]);

  return (
    <>
      DLCs:
      <CheckboxWithCaption
        state={isBaseGame}
        stateSetter={setIsBaseGame}
        label={'Base game'}
      />
      <CheckboxWithCaption
        state={isDlc1}
        stateSetter={setIsDlc1}
        label={'DLC 1'}
      />
      <CheckboxWithCaption
        state={isDlc2}
        stateSetter={setIsDlc2}
        label={'DLC 2'}
      />
    </>
  );
};

const App = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recipeColumns, setrecipeColumns] =
    useState<tb.Column<Recipe>[]>(RECIPE_COLUMNS);
  const [dlcVersions, setDlcVersions] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const res = await fetch(RECIPES_URI);
      const data: Recipe[] = await res.json();
      setRecipes(data);
    };
    loadData();
  }, []);

  const dlcValues = ['base', 'DLC1', 'DLC2', 'DLC2.5', 'DLC3'];
  const rowIdFunction = (recipe: Recipe) => recipe.name;
  const filterFunctions = [
    (recipe: Recipe) => dlcVersions
      .map((bool, idx) => [bool, idx])
      .filter((arr) => arr[0])
      .map((arr) => dlcValues[arr[1]])
      .includes(recipe.dlc)
  ];

  return (
    <div className="App">
      <Title />
      <p>Welcome to Mystia&apos;s Izakaya</p>
      <RecipeForm setDlcVersions={setDlcVersions} />
      <tb.Table
        columns={recipeColumns}
        data={recipes}
        rowIdFunction={rowIdFunction}
        filterFunctions={filterFunctions}
      />
    </div>
  );
};

export default App;
