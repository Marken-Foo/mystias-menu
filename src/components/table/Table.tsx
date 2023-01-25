import { useEffect, useState } from 'react';

import { TableHeader } from './TableHeader';
import {
  Column,
  Data,
  DisplayFunctionCollection,
  SortFunction,
} from './TableInterfaces';
import { EmptyRow, TableRow } from './TableRow';

export type { Column };

interface RowFilter<T> {
  (item: T): boolean;
}

export enum SortOrder {
  ASCENDING = 'asc',
  DESCENDING = 'desc',
}

interface SortTableFunction<T> {
  (accessor: string, order: SortOrder, dataToSort: T[]): void;
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
  // States for sorting
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState(SortOrder.ASCENDING);

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
    // sort the table with the new data
    sortTable(sortField, sortOrder, filteredData);
  }, [allData, filterFunctions]);

  const sortByField = (accessor: string) => {
    const order =
      accessor === sortField && sortOrder === SortOrder.ASCENDING
        ? SortOrder.DESCENDING
        : SortOrder.ASCENDING;
    setSortField(accessor);
    setSortOrder(order);
    sortTable(accessor, order, displayData);
  };

  const sortTable: SortTableFunction<T> = (accessor, sortOrder, dataToSort) => {
    if (accessor === '') {
      return;
    }
    const sortCol = headerData.find((col) => col.accessor === accessor);
    const sortFunction = sortCol?.sortFunction;
    const sortOrderChanger = (sortFunction: SortFunction<T>) => (a: T, b: T) =>
      (sortOrder === SortOrder.ASCENDING ? 1 : -1) * sortFunction(a, b);
    const sortedData =
      sortFunction === undefined
        ? [...dataToSort]
        : [...dataToSort].sort(sortOrderChanger(sortFunction));
    setDisplayData(sortedData);
    return;
  };

  return (
    <table>
      <TableHeader
        headerData={headerData}
        sortByField={sortByField}
        sortField={sortField}
        sortOrder={sortOrder}
      />
      <tbody>
        {displayData.length === 0 ? (
          <EmptyRow accessors={accessors} />
        ) : (
          displayData.map((row) => (
            <TableRow
              rowData={row}
              accessors={accessors}
              displayFunctions={displayFunctions}
              key={rowIdFunction(row)}
            />
          ))
        )}
      </tbody>
    </table>
  );
};
