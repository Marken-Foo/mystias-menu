import { Column, Data } from './TableInterfaces';

interface HeaderProps<T> {
  headerData: Column<T>[];
  sortByField: (accessor: string) => void;
}

export const TableHeader = <T extends Data>({
  headerData,
  sortByField,
}: HeaderProps<T>) => {
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
            {header.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};
