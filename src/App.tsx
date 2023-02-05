import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { Recipe, FullTag } from '@/interfaces/DataInterfaces'; // types
import {
  filterRecipeByAllTags,
  filterRecipeByIncompatibleTags,
  filterRecipeBySomeTags,
  filterRecipeByUnwantedTags,
} from '@/recipeUtils';
import { LanguageDropdown } from '@components/LanguageDropdown';
import { RECIPE_COLUMNS } from '@components/RecipeComponents';
import { RecipeForm } from '@components/RecipeForm';
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

const translateTagList =
  (allTags: FullTag[]) =>
  (selectedTags: FullTag[]): FullTag[] => {
    const translationMap: Map<string, string> = new Map();
    allTags.forEach((tag: FullTag): void => {
      translationMap.set(tag.defaultName, tag.name);
    });
    return selectedTags.map(
      (tag: FullTag): FullTag => ({
        ...tag,
        name: translationMap.get(tag.defaultName) || 'notFound',
      })
    );
  };

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
  const [foodTags, setFoodTags] = useState<FullTag[]>([]);
  const [selectedFoodTags, setSelectedFoodTags] = useState<FullTag[]>([]);
  const [selectFoodTagsMode, setSelectFoodTagsMode] = useState<SelectMode>(
    SelectMode.ALL
  );
  const [selectedIncompatibleFoodTags, setSelectedIncompatibleFoodTags] =
    useState<FullTag[]>([]);
  const [unwantedFoodTags, setUnwantedFoodTags] = useState<FullTag[]>([]);

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
      const data = (await res.json()) as FullTag[];
      setFoodTags(data);
      return data;
    };
    const updateTags = async () => {
      const foodTags = await loadFoodTags();
      const foodTagsTranslator = translateTagList(foodTags);
      setSelectedFoodTags(foodTagsTranslator);
      setSelectedIncompatibleFoodTags(foodTagsTranslator);
      setUnwantedFoodTags(foodTagsTranslator);
    };
    updateTags();
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
      <Title text={t('title')} />
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
