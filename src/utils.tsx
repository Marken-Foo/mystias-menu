import { FullTag } from './interfaces/DataInterfaces';

enum Locale {
  EN = 'en',
  ZH = 'zh',
}

interface Stringable {
  toString: () => string;
}

// sortFunctionOnField takes a function as an argument, and returns
// a new sorting function, which is defaultSortFunction with its
// arguments wrapped in the provided function.
// Example: sortFunctionOnField(getNameOfFruit)(fruit1, fruit2)
export const sortFunctionOnField =
  <T extends object>(func: (arg: T) => Stringable) =>
  (a: T, b: T) =>
    defaultSortFunction(func(a), func(b));

export const defaultSortFunction = <T extends Stringable>(
  a: T,
  b: T,
  locale: Locale = Locale.ZH
): number => {
  return a.toString().localeCompare(b.toString(), locale, {
    numeric: true,
  });
};

// Returns a function that can translate a FullTag[], given a reference
// array of all translated FullTag[] possible.
export const makeTagListTranslator =
  (allTags: FullTag[]) =>
  (selectedTags: FullTag[]): FullTag[] => {
    // Create lookup for .defaultName -> (translated) .name
    const translationMap: Map<string, string> = new Map();
    allTags.forEach((tag: FullTag): void => {
      translationMap.set(tag.defaultName, tag.name);
    });
    // Return translated tag array using lookup
    return selectedTags.map(
      (tag: FullTag): FullTag => ({
        ...tag,
        name: translationMap.get(tag.defaultName) || 'notFound',
      })
    );
  };
