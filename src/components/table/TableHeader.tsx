import { useState } from 'react';

import {
  Column,
  Data,
  SortFunction,
  SortOrders,
  SortValueGetter,
} from './TableInterfaces';

interface HeaderProps<T> {
  headerData: Column<T>[];
  sortTable: SortTableFunction<T>;
}

interface SortTableFunction<T> {
  (
    accessor: string,
    order: SortOrders,
    sortValueGetter?: SortValueGetter<T>,
    sortFunction?: SortFunction<T>
  ): void;
}

export const TableHeader = <T extends Data>({
  headerData,
  sortTable,
}: HeaderProps<T>) => {
  const [sortField, setSortField] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>(SortOrders.ASCENDING);

  const sortByField = (accessor: string) => {
    const order =
      accessor === sortField && sortOrder === SortOrders.ASCENDING
        ? SortOrders.DESCENDING
        : SortOrders.ASCENDING;
    setSortField(accessor);
    setSortOrder(order);
    const sortCol = headerData.find((col) => col.accessor === accessor);
    const sortValueGetter = sortCol?.sortValueGetter;
    sortTable(accessor, order, sortValueGetter);
  };

  return (
    <thead>
      <tr>
        {headerData.map((header: Column<T>) => (
          <th
            key={header.accessor}
            onClick={
              header.isSortable === true
                ? () => sortByField(header.accessor)
                : undefined
            }
            className={'tableHeader'}
          >
            {header.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};
