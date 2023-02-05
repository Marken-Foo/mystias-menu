import { Recipe } from '@/interfaces/DataInterfaces'; // types
import { TagText } from '@components/Tag'; // types

export const filterRecipeByAllTags =
  (tagList: TagText[]) =>
  (recipe: Recipe): boolean => {
    return tagList.every((tag) => recipe.tags.includes(tag));
  };

export const filterRecipeBySomeTags =
  (tagList: TagText[]) =>
  (recipe: Recipe): boolean => {
    if (tagList.length === 0) return true;
    return tagList.some((tag) => recipe.tags.includes(tag));
  };

export const filterRecipeByIncompatibleTags =
  (tagList: TagText[]) =>
  (recipe: Recipe): boolean => {
    return tagList.every((tag) => recipe.incompatibleTags.includes(tag));
  };

export const filterRecipeByUnwantedTags =
  (tagList: TagText[]) =>
  (recipe: Recipe): boolean => {
    return tagList.every((tag) => !recipe.tags.includes(tag));
  };
