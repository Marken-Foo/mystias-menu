import { GameAssetIcon } from '@components/GameAssetIcon';
import { Ingredient } from '@components/Ingredient';
import { BadTag, NeutralTag } from '@components/Tags';
import { Column } from '@components/table/Table';
import { Recipe } from '@/interfaces/DataInterfaces';
import { sortFunctionOnField } from '@/utils';

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

const IngredientDisplay = ({ ingredients }: { ingredients: any[] }) => {
  return (
    <>
      {ingredients.map((ingredient) => (
        <Ingredient
          name={ingredient.name}
          imageSource={`/images/ingredients/${ingredient.name}.png`}
          key={ingredient.name}
        />
      ))}
    </>
  );
};

export const RECIPE_COLUMNS: Column<Recipe>[] = [
  {
    accessor: 'icon',
    label: '料理',
    displayFunction: (recipe) => <RecipeIconDisplay name={recipe.name} />,
  },
  {
    accessor: 'name',
    label: '名称',
    displayFunction: (recipe) => recipe.name,
    isSortable: true,
    sortFunction: sortFunctionOnField((recipe) => recipe.name)
  },
  {
    accessor: 'tool',
    label: '道具',
    displayFunction: (recipe) => <ToolDisplay name={recipe.tool} />,
    isSortable: true,
    sortFunction: sortFunctionOnField((recipe) => recipe.tool)
  },
  {
    accessor: 'ingredients',
    label: '食材',
    displayFunction: (recipe) => (
      <IngredientDisplay ingredients={recipe.ingredients} />
    ),
  },
  {
    accessor: 'tags',
    label: '正特性',
    displayFunction: (recipe) => (
      <>
        {recipe.tags.map((tag: string) => (
          <NeutralTag text={tag} key={tag} />
        ))}
      </>
    ),
  },
  {
    accessor: 'incompatibleTags',
    label: '负特性',
    displayFunction: (recipe) => (
      <>
        {recipe.incompatibleTags.map((tag: string) => (
          <BadTag text={tag} key={tag} />
        ))}
      </>
    ),
  },
  {
    accessor: 'cookingTime',
    label: '烹饪时间',
    displayFunction: (recipe) => recipe.cookingTime,
    isSortable: true,
    sortFunction: sortFunctionOnField((recipe) => recipe.cookingTime)
  },
  {
    accessor: 'price',
    label: '售价（円）',
    displayFunction: (recipe) => recipe.price,
    isSortable: true,
    sortFunction: sortFunctionOnField((recipe) => recipe.price)
  },
];
