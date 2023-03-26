import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { DlcChoice, filterByDlc, loadDlcs } from '@/dlcUtils';
import { Recipe, FullTag } from '@/interfaces/DataInterfaces'; // types
import {
  filterByAllTags,
  filterByIncompatibleTags,
  filterBySomeTags,
  filterByUnwantedTags,
  SelectMode,
} from '@/tagFilterFunctions';
import { makeTagListTranslator } from '@/utils';
import { LanguageDropdown } from '@components/LanguageDropdown';
import { load_recipe_columns } from '@components/RecipeComponents';
import { RecipeForm } from '@components/RecipeForm';
import { Title } from '@components/Title';
import * as tb from '@components/table/Table';
import '@/App.css';

const getRecipesUri = (lng: string) =>
  `${import.meta.env.VITE_GET_RECIPES_URI}?lang=${lng}`;
const getFoodTagsUri = (lng: string) =>
  `${import.meta.env.VITE_GET_FOOD_TAGS_URI}?lang=${lng}`;

const App = () => {
  const [language, setLanguage] = useState('zh');
  const { t, i18n } = useTranslation();
  const changeLanguage = async (lng: string): Promise<void> => {
    setLanguage(lng);
    await i18n.changeLanguage(lng);
    setRecipeColumns(() => load_recipe_columns());
  };

  const DLCS = loadDlcs();
  const [dlcVersions, setDlcVersions] = useState<DlcChoice>(
    Object.fromEntries(
      DLCS.map((dlc) => [dlc.name, true])
    ) as unknown as DlcChoice
  );
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recipeColumns, setRecipeColumns] = useState<tb.Column<Recipe>[]>(
    load_recipe_columns()
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
      const foodTagsTranslator = makeTagListTranslator(foodTags);
      setSelectedFoodTags(foodTagsTranslator);
      setSelectedIncompatibleFoodTags(foodTagsTranslator);
      setUnwantedFoodTags(foodTagsTranslator);
    };
    updateTags();
  }, [language]);

  const filterByTagFunctions = {
    [SelectMode.ALL]: filterByAllTags(selectedFoodTags),
    [SelectMode.AT_LEAST_ONE]: filterBySomeTags(selectedFoodTags),
  };

  const filterFunctions = [
    filterByDlc(dlcVersions),
    filterByTagFunctions[selectFoodTagsMode],
    filterByIncompatibleTags(selectedIncompatibleFoodTags),
    filterByUnwantedTags(unwantedFoodTags),
  ];
  const rowIdFunction = (recipe: Recipe) => recipe.defaultName;

  return (
    <div className="App">
      <Title text={t('title')} />
      <LanguageDropdown language={language} changeLanguage={changeLanguage} />
      <Link to={`/drinks`}>drinks page</Link>
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
