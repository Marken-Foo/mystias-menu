import { useEffect, useState } from 'react';

import { TableHeader } from './TableHeader';
import {
  Column,
  Data,
  DisplayFunction,
  SortFunction,
  SortOrders,
  SortValueGetter,
} from './TableInterfaces';

interface DisplayFunctionCollection<T> {
  [key: string]: DisplayFunction<T>;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowIdFunction: (item: T) => string;
}

interface TableRowProps<T> {
  rowData: T;
  accessors: string[];
  displayFunctions: DisplayFunctionCollection<T>;
}

const TableRow = <T extends Data>({
  rowData,
  accessors,
  displayFunctions,
}: TableRowProps<T>) => {
  // console.log('display functions:', displayFunctions);
  // console.log('accessors:', accessors);
  return (
    <tr>
      {accessors.map((accessor) => {
        return <td key={accessor}>{displayFunctions[accessor](rowData)}</td>;
      })}
    </tr>
  );
};

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
    sortOrder: string,
    sortValueGetter: SortValueGetter<T> | null = null,
    sortFunction: SortFunction<T> | null = null
  ) => {
    if (sortField === '') {
      return;
    }
    if (sortValueGetter === null) {
      const sortedData =
        sortFunction === null
          ? [...displayData]
          : [...displayData].sort(sortFunction);
      setDisplayData(sortedData);
    } else {
      const defaultSortFunction = (a: T, b: T): number => {
        return (
          (sortOrder === SortOrders.ASCENDING ? 1 : -1) *
          sortValueGetter(a)
            .toString()
            .localeCompare(sortValueGetter(b).toString(), 'zh', {
              numeric: true,
            })
        );
      };
      const sortedData = [...displayData].sort(defaultSortFunction);
      setDisplayData(sortedData);
    }
  };

  if (displayData.length === 0) {
    return <>No table data</>;
  }
  // console.log('Passing accessors from table:', accessors);
  // console.log('Passing displayFunctions from table:', displayFunctions);
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
