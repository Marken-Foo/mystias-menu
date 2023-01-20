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
