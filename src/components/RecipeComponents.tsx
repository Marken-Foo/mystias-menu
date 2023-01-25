import { Tag, TagType } from '@/components/Tag';
import { Recipe, ShortIngredient } from '@/interfaces/DataInterfaces'; // types
import { UnlockTypes } from '@/interfaces/DataInterfaces';
import { sortFunctionOnField } from '@/utils';
import { GameAssetIcon } from '@components/GameAssetIcon';
import { Ingredient } from '@components/Ingredient';
import { Column } from '@components/table/Table';

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

const IngredientDisplay = ({
  ingredients,
}: {
  ingredients: ShortIngredient[];
}) => {
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

const recipeSourceDisplay = (recipe: Recipe) => {
  switch (recipe.source.type) {
    case UnlockTypes.BOND:
      return `【羁绊】\n${recipe.source.character} ${recipe.source.bondLevel} 级`;
    case UnlockTypes.DEFAULT:
      return '初始';
    case UnlockTypes.LEVEL:
      return `主等级 ${recipe.source.level}`;
    case UnlockTypes.MAINQUEST:
    case UnlockTypes.SIDEQUEST:
      return `【探索】\n${recipe.source.quest}`;
    case UnlockTypes.SHOP:
      return `【商店】\n${recipe.source.shop}`;
    case UnlockTypes.OTHER:
      return recipe.source.source;
    default:
      return '';
  }
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
    sortFunction: sortFunctionOnField((recipe) => recipe.name),
  },
  {
    accessor: 'tool',
    label: '道具',
    displayFunction: (recipe) => <ToolDisplay name={recipe.tool} />,
    isSortable: true,
    sortFunction: sortFunctionOnField((recipe) => recipe.tool),
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
          <Tag type={TagType.FOOD} text={tag} key={tag} />
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
          <Tag type={TagType.BAD} text={tag} key={tag} />
        ))}
      </>
    ),
  },
  {
    accessor: 'cookingTime',
    label: '烹饪时间',
    displayFunction: (recipe) => recipe.cookingTime,
    isSortable: true,
    sortFunction: sortFunctionOnField((recipe) => recipe.cookingTime),
  },
  {
    accessor: 'price',
    label: '售价（円）',
    displayFunction: (recipe) => recipe.price,
    isSortable: true,
    sortFunction: sortFunctionOnField((recipe) => recipe.price),
  },
  {
    accessor: 'source',
    label: '解锁方式',
    displayFunction: recipeSourceDisplay,
  },
];
