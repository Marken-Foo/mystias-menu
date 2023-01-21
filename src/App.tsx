import React, { useEffect, useState } from 'react';
import { Recipe } from '@/interfaces/DataInterfaces';
import { RECIPE_COLUMNS } from '@components/RecipeComponents';
import * as tb from '@components/table/Table';
import { Title } from '@components/Title';
import '@/App.css';

const RECIPES_URI = '/recipes.json';
const DLC_VALUES = {
  isBase: 'base',
  isDlc1: 'DLC1',
  isDlc2: 'DLC2',
  isDlc3: 'DLC3',
};

interface DlcChoice {
  isBase: boolean;
  isDlc1: boolean;
  isDlc2: boolean;
  isDlc3: boolean;
}

const CheckboxWithCaption = ({
  initialState,
  onChange,
  label,
}: {
  initialState: boolean;
  onChange: () => void;
  label: string;
}) => {
  return (
    <span>
      {label}
      <input type="checkbox" checked={initialState} onChange={onChange} />
    </span>
  );
};

const RecipeForm = ({ setDlcVersions }) => {
  const [dlcChoice, setDlcChoice] = useState<DlcChoice>({
    isBase: true,
    isDlc1: true,
    isDlc2: true,
    isDlc3: true,
  });

  useEffect(() => {
    setDlcVersions(dlcChoice);
  }, [dlcChoice]);

  const dlcLabels = {
    isBase: 'Base game',
    isDlc1: 'DLC1',
    isDlc2: 'DLC2',
    isDlc3: 'DLC3',
  };

  return (
    <>
      DLCs:
      {Object.entries(dlcLabels).map(([key, label]) => (
        <CheckboxWithCaption
          initialState={dlcChoice[key as keyof DlcChoice]}
          onChange={() =>
            setDlcChoice((prevState) => ({
              ...prevState,
              [key]: !prevState[key as keyof DlcChoice],
            }))
          }
          label={label}
          key={key}
        />
      ))}
    </>
  );
};

const App = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recipeColumns, setrecipeColumns] =
    useState<tb.Column<Recipe>[]>(RECIPE_COLUMNS);
  const [dlcVersions, setDlcVersions] = useState({});

  useEffect(() => {
    const loadData = async () => {
      const res = await fetch(RECIPES_URI);
      const data: Recipe[] = await res.json();
      setRecipes(data);
    };
    loadData();
  }, []);

  const filterFunctions = [
    (recipe: Recipe) => {
      return Object.entries(dlcVersions)
        .filter((arr) => arr[1])
        .map((arr) => DLC_VALUES[arr[0] as keyof typeof DLC_VALUES])
        .includes(recipe.dlc);
    },
  ];
  const rowIdFunction = (recipe: Recipe) => recipe.name;

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
