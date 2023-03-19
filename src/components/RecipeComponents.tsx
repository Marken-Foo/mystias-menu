import { t } from 'i18next';

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
      return `${t('recipeSource.bond.title')}\n${t(
        'recipeSource.bond.characterAndLevel',
        {
          character: recipe.source.character,
          level: recipe.source.bondLevel,
        }
      )}`;
    case UnlockTypes.DEFAULT:
      return t('recipeSource.default');
    case UnlockTypes.LEVEL:
      return t('recipeSource.level', { level: recipe.source.level });
    case UnlockTypes.MAINQUEST:
    case UnlockTypes.SIDEQUEST:
      return `${t('recipeSource.sidequest.title')}\n${recipe.source.quest}`;
    case UnlockTypes.SHOP:
      return `${t('recipeSource.shop.title')}\n${recipe.source.shop}`;
    case UnlockTypes.OTHER:
      return recipe.source.source;
    default:
      return '';
  }
};

export const load_recipe_columns: () => Column<Recipe>[] = () => [
  {
    accessor: 'icon',
    label: t('recipeHeaders.dish'),
    displayFunction: (recipe) => (
      <RecipeIconDisplay name={recipe.name} imageName={recipe.defaultName} />
    ),
  },
  {
    accessor: 'name',
    label: t('recipeHeaders.name'),
    displayFunction: (recipe) => recipe.name,
    isSortable: true,
    sortFunction: sortFunctionOnField((recipe) => recipe.name),
  },
  {
    accessor: 'tool',
    label: t('recipeHeaders.tool'),
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
    label: t('recipeHeaders.ingredients'),
    displayFunction: (recipe) => (
      <IngredientsDisplay ingredients={recipe.ingredients} />
    ),
  },
  {
    accessor: 'tags',
    label: t('recipeHeaders.tags'),
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
    label: t('recipeHeaders.incompatibleTags'),
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
    label: t('recipeHeaders.cookingTime'),
    displayFunction: (recipe) => recipe.cookingTime,
    isSortable: true,
    sortFunction: sortFunctionOnField((recipe) => recipe.cookingTime),
  },
  {
    accessor: 'price',
    label: t('recipeHeaders.price'),
    displayFunction: (recipe) => recipe.price,
    isSortable: true,
    sortFunction: sortFunctionOnField((recipe) => recipe.price),
  },
  {
    accessor: 'source',
    label: t('recipeHeaders.source'),
    displayFunction: recipeSourceDisplay,
  },
];
