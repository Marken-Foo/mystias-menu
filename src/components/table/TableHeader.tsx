import { Column, Data } from './TableInterfaces';

export enum SortOrder {
  ASCENDING = 'asc',
  DESCENDING = 'desc',
}

interface HeaderProps<T> {
  headerData: Column<T>[];
  sortByField: (accessor: string) => void;
  sortField: string;
  sortOrder: SortOrder;
}

export const TableHeader = <T extends Data>({
  headerData,
  sortByField,
  sortField,
  sortOrder,
}: HeaderProps<T>) => {
  const getSortIcon = (header: Column<T>) => {
    if (!header.isSortable) return '';
    else if (header.accessor !== sortField) return '⬘';
    else if (sortOrder === SortOrder.ASCENDING) return '⏷';
    else if (sortOrder === SortOrder.DESCENDING) return '⏶';
    else return '';
  };
  return (
    <thead>
      <tr>
        {headerData.map((header: Column<T>) => (
          <th
            key={header.accessor}
            onClick={
              header.isSortable ? () => sortByField(header.accessor) : undefined
            }
            className={
              header.isSortable ? 'clickable tableHeader' : 'tableHeader'
            }
          >
            {header.label}{getSortIcon(header)}
          </th>
        ))}
      </tr>
    </thead>
  );
};
