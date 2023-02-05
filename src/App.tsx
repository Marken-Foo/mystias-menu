import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { Recipe } from '@/interfaces/DataInterfaces'; // types
import {
  filterRecipeByAllTags,
  filterRecipeByIncompatibleTags,
  filterRecipeBySomeTags,
  filterRecipeByUnwantedTags,
} from '@/recipeUtils';
import { LanguageDropdown } from '@components/LanguageDropdown';
import { RECIPE_COLUMNS } from '@components/RecipeComponents';
import { RecipeForm } from '@components/RecipeForm';
import { TagText } from '@components/Tag'; // types
import { Title } from '@components/Title';
import * as tb from '@components/table/Table';
import '@/App.css';

const getRecipesUri = (lng: string) =>
  `http://localhost:8080/recipes?lang=${lng}`;
const getFoodTagsUri = (lng: string) =>
  `http://localhost:8080/tags/food?lang=${lng}`;

export interface DlcChoice {
  base: boolean;
  DLC1: boolean;
  DLC2: boolean;
  DLC3: boolean;
}

export interface Dlc {
  name: string;
  label: string;
}

export enum SelectMode {
  ALL = 'all',
  AT_LEAST_ONE = 'some',
}

const App = () => {
  const [language, setLanguage] = useState('zh');
  const { t, i18n } = useTranslation();
  const changeLanguage = async (lng: string): Promise<void> => {
    setLanguage(lng);
    await i18n.changeLanguage(lng);
    setRecipeColumns(() =>
      RECIPE_COLUMNS.map((col) => ({ ...col, label: t(col.label) }))
    );
  };

  const DLCS: Dlc[] = [
    { name: 'base', label: t('baseGame') },
    { name: 'DLC1', label: 'DLC1' },
    { name: 'DLC2', label: 'DLC2' },
    { name: 'DLC3', label: 'DLC3' },
  ];

  const [dlcVersions, setDlcVersions] = useState<DlcChoice>(
    Object.fromEntries(
      DLCS.map((dlc) => [dlc.name, true])
    ) as unknown as DlcChoice // Need to ensure DLCS and DlcChoice in sync
  );
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recipeColumns, setRecipeColumns] = useState<tb.Column<Recipe>[]>(
    RECIPE_COLUMNS.map((col) => {
      return { ...col, label: t(col.label) };
    })
  );
  const [foodTags, setFoodTags] = useState<TagText[]>([]);
  const [selectedFoodTags, setSelectedFoodTags] = useState<TagText[]>([]);
  const [selectFoodTagsMode, setSelectFoodTagsMode] = useState<SelectMode>(
    SelectMode.ALL
  );
  const [selectedIncompatibleFoodTags, setSelectedIncompatibleFoodTags] =
    useState<TagText[]>([]);
  const [unwantedFoodTags, setUnwantedFoodTags] = useState<TagText[]>([]);

  // Load recipes
  useEffect(() => {
    const loadData = async () => {
      const res = await fetch(getRecipesUri(language));
      const data: Recipe[] = await res.json();
      setRecipes(data);
    };
    loadData();
  }, [language]);

  // Load tags
  useEffect(() => {
    const loadFoodTags = async () => {
      const res = await fetch(getFoodTagsUri(language));
      const data = (await res.json()) as TagText[];
      setFoodTags(data);
    };
    loadFoodTags();
  }, [language]);

  const filterRecipeByDlc = (recipe: Recipe) => {
    return Object.entries(dlcVersions)
      .filter(([, isIncluded]) => isIncluded)
      .map(([name]) => name)
      .includes(recipe.dlc);
  };

  const filterByTagFunctions = {
    [SelectMode.ALL]: filterRecipeByAllTags(selectedFoodTags),
    [SelectMode.AT_LEAST_ONE]: filterRecipeBySomeTags(selectedFoodTags),
  };

  const filterFunctions = [
    filterRecipeByDlc,
    filterByTagFunctions[selectFoodTagsMode],
    filterRecipeByIncompatibleTags(selectedIncompatibleFoodTags),
    filterRecipeByUnwantedTags(unwantedFoodTags),
  ];
  const rowIdFunction = (recipe: Recipe) => recipe.defaultName;

  return (
    <div className="App">
      <Title text={'夜雀料理'} />
      <p>Welcome to Mystia&apos;s Izakaya</p>
      <LanguageDropdown language={language} changeLanguage={changeLanguage} />
      <RecipeForm
        dlcs={DLCS}
        dlcVersions={dlcVersions}
        setDlcVersions={setDlcVersions}
        tags={foodTags}
        selectedTags={selectedFoodTags}
        setSelectedTags={setSelectedFoodTags}
        selectMode={selectFoodTagsMode}
        setSelectMode={setSelectFoodTagsMode}
        selectedIncompatibleTags={selectedIncompatibleFoodTags}
        setSelectedIncompatibleTags={setSelectedIncompatibleFoodTags}
        unwantedTags={unwantedFoodTags}
        setUnwantedTags={setUnwantedFoodTags}
      />
      <p>---</p>
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
