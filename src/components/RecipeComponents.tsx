import { GameAssetIcon } from '../components/GameAssetIcon';
import { Ingredient } from '../components/Ingredient';
import { BadTag, NeutralTag } from '../components/Tags';
import * as tb from '../components/Table';
import { Recipe } from '../interfaces/DataInterfaces';

const RecipeIconDisplay = ({ name }: { name: string }) => (
  <GameAssetIcon src={`/images/recipes/${name}.png`} name={name} />
);

const ToolDisplay = ({ name }: { name: string }) => {
  return (
    <>
      <GameAssetIcon src={`/images/tools/${name}.png`} name={name} />
      <br />
      <div>{name}</div>
    </>
  );
};

export interface RecipeRow extends tb.Row {
  id: string;
  cellInfo: {
    [index: string]: tb.Cell;
    icon: tb.Cell;
    name: tb.Cell;
    tool: tb.Cell;
    ingredients: tb.Cell;
    tags: tb.Cell;
    incompatibleTags: tb.Cell;
    cookingTime: tb.Cell;
    price: tb.Cell;
  };
}

export const makeRecipeRow = (recipe: Recipe): RecipeRow => {
  const ingredients = recipe.ingredients.map((ingredient) => ingredient.name);
  return {
    id: recipe.name,
    cellInfo: {
      icon: tb.makeCell(recipe.name, <RecipeIconDisplay name={recipe.name} />),
      name: tb.makeCell(recipe.name),
      tool: tb.makeCell(recipe.tool, <ToolDisplay name={recipe.tool} />),
      ingredients: tb.makeCell(
        ingredients,
        <>
          {ingredients.map((ingredient) => (
            <Ingredient
              name={ingredient}
              imageSource={`/images/ingredients/${ingredient}.png`}
              key={ingredient}
            />
          ))}
        </>
      ),
      tags: tb.makeCell(
        recipe.tags,
        <>
          {recipe.tags.map((tag: string) => (
            <NeutralTag text={tag} key={tag} />
          ))}
        </>
      ),
      incompatibleTags: tb.makeCell(
        recipe.incompatibleTags,
        <>
          {recipe.incompatibleTags.map((tag: string) => (
            <BadTag text={tag} key={tag} />
          ))}
        </>
      ),
      cookingTime: tb.makeCell(recipe.cookingTime),
      price: tb.makeCell(recipe.price),
    },
  };
};

export const RECIPE_COLUMNS: tb.Column[] = [
  { accessor: 'icon', label: '料理' },
  { accessor: 'name', label: '名称', isSortable: true },
  { accessor: 'tool', label: '道具', isSortable: true },
  { accessor: 'ingredients', label: '食材' },
  { accessor: 'tags', label: '正特性' },
  { accessor: 'incompatibleTags', label: '负特性' },
  { accessor: 'cookingTime', label: '烹饪时间', isSortable: true },
  { accessor: 'price', label: '售价（円）', isSortable: true },
];
