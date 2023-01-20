export interface Column<T> {
  accessor: string;
  label: string;
  displayFunction?: DisplayFunction<T>;
  isSortable?: boolean;
  sortValueGetter?: SortValueGetter<T>;
  sortFunction?: SortFunction<T>;
  filterFunctions?: ((item: T) => boolean)[];
}

export interface Data {
  [key: string]: any;
}

export interface DisplayFunction<T> {
  (item: T): JSX.Element | string | number;
}

export interface SortFunction<T> {
  (a: T, b: T): number;
}

export enum SortOrders {
  ASCENDING = 'asc',
  DESCENDING = 'desc',
}

export interface SortValueGetter<T> {
  (item: T): string | number;
}

