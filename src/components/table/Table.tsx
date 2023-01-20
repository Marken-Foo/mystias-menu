import { useEffect, useState } from 'react';

import { TableHeader } from './TableHeader';
import {
  Column,
  Data,
  DisplayFunctionCollection,
  SortFunction,
  SortOrder,
} from './TableInterfaces';
import { TableRow } from './TableRow';

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowIdFunction: (item: T) => string;
}

export const Table = <T extends Data>({
  columns,
  data,
  rowIdFunction,
}: TableProps<T>) => {
  const [allData, setAllData] = useState<T[]>([]);
  const [displayData, setDisplayData] = useState<T[]>([]);
  const [headerData, setHeaderData] = useState<Column<T>[]>([]);
  const [displayFunctions, setDisplayFunctions] = useState<
    DisplayFunctionCollection<T>
  >({});
  const [accessors, setAccessors] = useState<string[]>([]);

  useEffect(() => {
    setAllData(data);
    setDisplayData(data);
  }, [data]);

  useEffect(() => {
    setHeaderData(columns);
    const accessors = columns.map((col) => col.accessor);
    setAccessors(accessors);
    const displayFunctionInputs = Object.fromEntries(
      columns.map((col) => [col.accessor, col.displayFunction])
    );
    if (displayFunctionInputs !== undefined) {
      setDisplayFunctions(
        displayFunctionInputs as DisplayFunctionCollection<T>
      );
    }
  }, [columns]);

  const sortTable = (
    sortField: string,
    sortOrder: SortOrder,
    sortFunction: SortFunction<T> | null = null
  ) => {
    if (sortField === '') {
      return;
    }
    const sortOrderChanger = (sortFunction: SortFunction<T>) => (a: T, b: T) =>
      (sortOrder === SortOrder.ASCENDING ? 1 : -1) * sortFunction(a, b);
    const sortedData =
      sortFunction === null
        ? [...displayData]
        : [...displayData].sort(sortOrderChanger(sortFunction));
    setDisplayData(sortedData);
  };

  if (displayData.length === 0) {
    return <>No table data</>;
  }
  return (
    <table>
      <TableHeader headerData={headerData} sortTable={sortTable} />
      <tbody>
        {displayData.map((row) => (
          <TableRow
            rowData={row}
            accessors={accessors}
            displayFunctions={displayFunctions}
            key={rowIdFunction(row)}
          />
        ))}
      </tbody>
    </table>
  );
};

export type { Column };
