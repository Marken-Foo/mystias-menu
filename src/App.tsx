import React, { useEffect, useState } from 'react';
import { Recipe } from '@/interfaces/DataInterfaces';
import { RECIPE_COLUMNS } from '@components/RecipeComponents';
import * as tb from '@components/table/Table';
import { Title } from '@components/Title';
import '@/App.css';

const RECIPES_URI = '/recipes.json';

interface DlcChoice {
  base: boolean;
  DLC1: boolean;
  DLC2: boolean;
  DLC3: boolean;
}

interface Dlc {
  name: string;
  label: string;
}

interface RecipeFormProps {
  dlcs: Dlc[];
  dlcVersions: DlcChoice;
  setDlcVersions: React.Dispatch<React.SetStateAction<DlcChoice>>;
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

const RecipeForm = ({ dlcs, dlcVersions, setDlcVersions }: RecipeFormProps) => {
  return (
    <>
      DLCs:
      {dlcs.map((dlc) => (
        <CheckboxWithCaption
          initialState={dlcVersions[dlc.name as keyof DlcChoice]}
          onChange={() =>
            setDlcVersions((prevState) => ({
              ...prevState,
              [dlc.name]: !prevState[dlc.name as keyof DlcChoice],
            }))
          }
          label={dlc.label}
          key={dlc.name}
        />
      ))}
    </>
  );
};

const App = () => {
  const DLCS: Dlc[] = [
    { name: 'base', label: '基础游戏' },
    { name: 'DLC1', label: 'DLC1' },
    { name: 'DLC2', label: 'DLC2' },
    { name: 'DLC3', label: 'DLC3' },
  ];

  const [dlcVersions, setDlcVersions] = useState<DlcChoice>(
    Object.fromEntries(
      DLCS.map((dlc) => [dlc.name, true])
    ) as unknown as DlcChoice
  );
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recipeColumns,] =
    useState<tb.Column<Recipe>[]>(RECIPE_COLUMNS);

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
        .filter(([, isIncluded]) => isIncluded)
        .map(([name,]) => name)
        .includes(recipe.dlc);
    },
  ];
  const rowIdFunction = (recipe: Recipe) => recipe.name;

  return (
    <div className="App">
      <Title />
      <p>Welcome to Mystia&apos;s Izakaya</p>
      <RecipeForm
        dlcs={DLCS}
        dlcVersions={dlcVersions}
        setDlcVersions={setDlcVersions}
      />
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
