import {
  Recipe,
  TranslatedName,
  UnlockTypes,
} from '@/interfaces/DataInterfaces'; // types
import { sortFunctionOnField } from '@/utils';
import { GameAssetIcon } from '@components/GameAssetIcon';
import { Ingredient } from '@components/Ingredient';
import { Tag, TagType } from '@components/Tag';
import { Column } from '@components/table/Table';

interface RecipeIconDisplayProps {
  name: string;
  imageName: string;
}

const RecipeIconDisplay = ({ name, imageName }: RecipeIconDisplayProps) => (
  <GameAssetIcon src={`/images/recipes/${imageName}.png`} name={name} />
);

interface ToolDisplayProps {
  name: string;
  imageName: string;
}

const ToolDisplay = ({ name, imageName }: ToolDisplayProps) => {
  return <GameAssetIcon src={`/images/tools/${imageName}.png`} name={name} />;
};

interface IngredientsDisplayProps {
  ingredients: TranslatedName[];
}

const IngredientsDisplay = ({ ingredients }: IngredientsDisplayProps) => {
  return (
    <>
      {ingredients.map((ingredient) => (
        <Ingredient
          name={ingredient.name}
          imageSource={`/images/ingredients/${ingredient.defaultName}.png`}
          key={ingredient.defaultName}
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
    label: 'recipeHeaders.dish',
    displayFunction: (recipe) => (
      <RecipeIconDisplay name={recipe.name} imageName={recipe.defaultName} />
    ),
  },
  {
    accessor: 'name',
    label: 'recipeHeaders.name',
    displayFunction: (recipe) => recipe.name,
    isSortable: true,
    sortFunction: sortFunctionOnField((recipe) => recipe.name),
  },
  {
    accessor: 'tool',
    label: 'recipeHeaders.tool',
    displayFunction: (recipe) => (
      <ToolDisplay
        name={recipe.tool.name}
        imageName={recipe.tool.defaultName}
      />
    ),
    isSortable: true,
    sortFunction: sortFunctionOnField((recipe) => recipe.tool.name),
  },
  {
    accessor: 'ingredients',
    label: 'recipeHeaders.ingredients',
    displayFunction: (recipe) => (
      <IngredientsDisplay ingredients={recipe.ingredients} />
    ),
  },
  {
    accessor: 'tags',
    label: 'recipeHeaders.tags',
    displayFunction: (recipe) => (
      <>
        {recipe.tags.map((tag: string) => (
          <>
            <Tag type={TagType.FOOD} text={tag} key={tag} />{' '}
          </>
        ))}
      </>
    ),
  },
  {
    accessor: 'incompatibleTags',
    label: 'recipeHeaders.incompatibleTags',
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
    label: 'recipeHeaders.cookingTime',
    displayFunction: (recipe) => recipe.cookingTime,
    isSortable: true,
    sortFunction: sortFunctionOnField((recipe) => recipe.cookingTime),
  },
  {
    accessor: 'price',
    label: 'recipeHeaders.price',
    displayFunction: (recipe) => recipe.price,
    isSortable: true,
    sortFunction: sortFunctionOnField((recipe) => recipe.price),
  },
  {
    accessor: 'source',
    label: 'recipeHeaders.source',
    displayFunction: recipeSourceDisplay,
  },
];
