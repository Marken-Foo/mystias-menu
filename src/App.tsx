import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { Recipe } from '@/interfaces/DataInterfaces'; // types
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

const LANGUAGES: { [index: string]: string } = {
  zh: '🇨🇳 中文',
  en: '🇬🇧 English',
};

const LanguageDropdown = ({ language, changeLanguage }) => {
  const { t } = useTranslation();
  return (
    <>
      <label htmlFor="language-select">{t('language')}</label>{' '}
      <select
        id="language-select"
        value={language}
        onChange={(event) => changeLanguage(event.target.value)}
      >
        {Object.entries(LANGUAGES).map(([value, label]) => {
          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </select>
    </>
  );
};

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
  const changeLanguage = (lng) => {
    setLanguage(lng);
    i18n.changeLanguage(lng);
  };

  const DLCS: Dlc[] = [
    { name: 'base', label: '基础游戏' },
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
  const [recipeColumns] = useState<tb.Column<Recipe>[]>(RECIPE_COLUMNS);
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

  const filterRecipeByAllTags = (recipe: Recipe) => {
    return selectedFoodTags.every((tag) => recipe.tags.includes(tag));
  };

  const filterRecipeBySomeTag = (recipe: Recipe) => {
    if (selectedFoodTags.length === 0) return true;
    return selectedFoodTags.some((tag) => recipe.tags.includes(tag));
  };

  const filterRecipeByIncompatibleTags = (recipe: Recipe) => {
    return selectedIncompatibleFoodTags.every((tag) =>
      recipe.incompatibleTags.includes(tag)
    );
  };

  const filterRecipeByUnwantedTags = (recipe: Recipe) => {
    return unwantedFoodTags.every((tag) => !recipe.tags.includes(tag));
  };

  const filterByTagFunctions = {
    [SelectMode.ALL]: filterRecipeByAllTags,
    [SelectMode.AT_LEAST_ONE]: filterRecipeBySomeTag,
  };

  const filterFunctions = [
    filterRecipeByDlc,
    filterByTagFunctions[selectFoodTagsMode],
    filterRecipeByIncompatibleTags,
    filterRecipeByUnwantedTags,
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
