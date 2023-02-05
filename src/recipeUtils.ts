import { Recipe, TranslatedName } from '@/interfaces/DataInterfaces'; // types

export const filterRecipeByAllTags =
  (tagList: TranslatedName[]) =>
  (recipe: Recipe): boolean => {
    return tagList.every((tag) => recipe.tags.includes(tag.name));
  };

export const filterRecipeBySomeTags =
  (tagList: TranslatedName[]) =>
  (recipe: Recipe): boolean => {
    if (tagList.length === 0) return true;
    return tagList.some((tag) => recipe.tags.includes(tag.name));
  };

export const filterRecipeByIncompatibleTags =
  (tagList: TranslatedName[]) =>
  (recipe: Recipe): boolean => {
    return tagList.every((tag) => recipe.incompatibleTags.includes(tag.name));
  };

export const filterRecipeByUnwantedTags =
  (tagList: TranslatedName[]) =>
  (recipe: Recipe): boolean => {
    return tagList.every((tag) => !recipe.tags.includes(tag.name));
  };
