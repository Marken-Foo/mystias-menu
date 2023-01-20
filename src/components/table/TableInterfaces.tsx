export interface Column<T> {
  accessor: string;
  label: string;
  displayFunction?: DisplayFunction<T>;
  isSortable?: boolean;
  sortFunction?: SortFunction<T>;
  filterFunctions?: ((item: T) => boolean)[];
}

export interface Data {
  [key: string]: any;
}

interface DisplayFunction<T> {
  (item: T): JSX.Element | string | number;
}

export interface DisplayFunctionCollection<T> {
  [key: string]: DisplayFunction<T>;
}

export interface SortFunction<T> {
  (a: T, b: T): number;
}

export enum SortOrder {
  ASCENDING = 'asc',
  DESCENDING = 'desc',
}

export interface SortTableFunction<T> {
  (accessor: string, order: SortOrder, sortFunction?: SortFunction<T>): void;
}
