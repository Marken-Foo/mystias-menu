import { useEffect, useState } from 'react';

import { TableHeader } from './TableHeader';
import {
  Column,
  Data,
  DisplayFunctionCollection,
  SortFunction,
  SortOrder,
  SortTableFunction,
} from './TableInterfaces';
import { TableRow } from './TableRow';

export type { Column };

interface RowFilter<T> {
  (item: T): boolean;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowIdFunction: (item: T) => string;
  filterFunctions: RowFilter<T>[];
}

export const Table = <T extends Data>({
  columns,
  data,
  rowIdFunction,
  filterFunctions,
}: TableProps<T>) => {
  const [allData, setAllData] = useState<T[]>([]);
  const [displayData, setDisplayData] = useState<T[]>([]);
  const [headerData, setHeaderData] = useState<Column<T>[]>([]);
  const [displayFunctions, setDisplayFunctions] = useState<
    DisplayFunctionCollection<T>
  >({});
  const [accessors, setAccessors] = useState<string[]>([]);

  // Set data if base data set changes.
  useEffect(() => {
    setAllData(data);
    setDisplayData(data);
  }, [data]);

  // Set per-column information
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

  // Set filter information
  useEffect(() => {
    const evaluateRowFilter = (row: T) => {
      for (const filterFunction of filterFunctions) {
        if (!filterFunction(row)) return false;
      }
      return true;
    };
    const filteredData = allData.filter(evaluateRowFilter);
    setDisplayData(filteredData);
  }, [filterFunctions]);

  const sortTable: SortTableFunction<T> = (
    sortField,
    sortOrder,
    sortFunction
  ) => {
    if (sortField === '') {
      return;
    }
    const sortOrderChanger = (sortFunction: SortFunction<T>) => (a: T, b: T) =>
      (sortOrder === SortOrder.ASCENDING ? 1 : -1) * sortFunction(a, b);
    const sortedData =
      sortFunction === undefined
        ? [...displayData]
        : [...displayData].sort(sortOrderChanger(sortFunction));
    setDisplayData(sortedData);
    return;
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
