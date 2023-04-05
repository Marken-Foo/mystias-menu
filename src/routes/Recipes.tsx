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
import { load_recipe_columns } from '@components/RecipeComponents';
import { RecipeForm } from '@components/RecipeForm';
import * as tb from '@components/table/Table';
import '@/routes/Recipes.css';

const getRecipesUri = (lng: string) =>
  `${import.meta.env.VITE_GET_RECIPES_URI}?lang=${lng}`;
const getFoodTagsUri = (lng: string) =>
  `${import.meta.env.VITE_GET_FOOD_TAGS_URI}?lang=${lng}`;

export const Recipes = () => {
  const { i18n } = useTranslation();

  const DLCS = loadDlcs();
  const [dlcVersions, setDlcVersions] = useState<DlcChoice>(
    Object.fromEntries(
      DLCS.map((dlc) => [dlc.name, true])
    ) as unknown as DlcChoice
  );
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recipeColumns,] = useState<tb.Column<Recipe>[]>(
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
      const res = await fetch(getRecipesUri(i18n.language));
      const data: Recipe[] = await res.json();
      setRecipes(data);
    };
    loadData();
  }, [i18n.language]);

  // Load tags
  useEffect(() => {
    const loadFoodTags = async () => {
      const res = await fetch(getFoodTagsUri(i18n.language));
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
  }, [i18n.language]);

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
    <>
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
    </>
  );
};
