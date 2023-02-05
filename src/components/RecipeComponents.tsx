import { Tag, TagType } from '@/components/Tag';
import {
  Recipe,
  TranslatedName,
  UnlockTypes,
} from '@/interfaces/DataInterfaces'; // types
import { sortFunctionOnField } from '@/utils';
import { GameAssetIcon } from '@components/GameAssetIcon';
import { Ingredient } from '@components/Ingredient';
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
    label: 'recipeHeader',
    displayFunction: (recipe) => (
      <RecipeIconDisplay name={recipe.name} imageName={recipe.defaultName} />
    ),
  },
  {
    accessor: 'name',
    label: 'recipeNameHeader',
    displayFunction: (recipe) => recipe.name,
    isSortable: true,
    sortFunction: sortFunctionOnField((recipe) => recipe.name),
  },
  {
    accessor: 'tool',
    label: 'recipeToolHeader',
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
    label: 'recipeIngredientsHeader',
    displayFunction: (recipe) => (
      <IngredientsDisplay ingredients={recipe.ingredients} />
    ),
  },
  {
    accessor: 'tags',
    label: 'recipeTagsHeader',
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
    label: 'recipeIncompatibleTagsHeader',
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
    label: 'recipeCookingTimeHeader',
    displayFunction: (recipe) => recipe.cookingTime,
    isSortable: true,
    sortFunction: sortFunctionOnField((recipe) => recipe.cookingTime),
  },
  {
    accessor: 'price',
    label: 'recipePriceHeader',
    displayFunction: (recipe) => recipe.price,
    isSortable: true,
    sortFunction: sortFunctionOnField((recipe) => recipe.price),
  },
  {
    accessor: 'source',
    label: 'recipeSourceHeader',
    displayFunction: recipeSourceDisplay,
  },
];
