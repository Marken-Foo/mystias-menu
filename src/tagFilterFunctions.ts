import { TranslatedName } from '@/interfaces/DataInterfaces'; // types

interface FilterableByTag {
  tags: string[];
}

interface FilterableByIncompatibleTag extends FilterableByTag {
  incompatibleTags: string[];
}

export const filterByAllTags =
  (tagList: TranslatedName[]) =>
  <T extends FilterableByTag>(item: T): boolean => {
    return tagList.every((tag) => item.tags.includes(tag.name));
  };

export const filterBySomeTags =
  (tagList: TranslatedName[]) =>
  <T extends FilterableByTag>(item: T): boolean => {
    if (tagList.length === 0) return true;
    return tagList.some((tag) => item.tags.includes(tag.name));
  };

export const filterByIncompatibleTags =
  (tagList: TranslatedName[]) =>
  <T extends FilterableByIncompatibleTag>(item: T): boolean => {
    return tagList.every((tag) => item.incompatibleTags.includes(tag.name));
  };

export const filterByUnwantedTags =
  (tagList: TranslatedName[]) =>
  <T extends FilterableByTag>(item: T): boolean => {
    return tagList.every((tag) => !item.tags.includes(tag.name));
  };
