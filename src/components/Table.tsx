import { useEffect, useState } from 'react';

export interface RowComparator {
  (a: Row, b: Row): number;
}

export interface Column {
  accessor: string;
  label: string;
  isSortable?: boolean;
  sortFunction?: RowComparator;
}

export interface Cell {
  data: any;
  display?: JSX.Element | string | number;
}

export interface Row {
  id: string;
  cellInfo: {[index: string]: Cell};
}

export const makeCell = (
  data: any,
  display?: JSX.Element | string | number
): Cell => {
  return { data: data, display: display };
};

interface HeaderProps {
  headerData: Column[];
  sortTable: (
    accessor: string,
    order: string,
    sortFunction?: RowComparator
  ) => void;
}

interface TableProps {
  columns: Column[];
  data: Row[];
}

enum SortOrders {
  ASCENDING = 'asc',
  DESCENDING = 'desc',
}

const TableHeader = ({ headerData, sortTable }: HeaderProps) => {
  const [sortField, setSortField] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>(SortOrders.ASCENDING);

  const sortByField = (accessor: string) => {
    const order: string =
      accessor === sortField && sortOrder === SortOrders.ASCENDING
        ? SortOrders.DESCENDING
        : SortOrders.ASCENDING;
    setSortField(accessor);
    setSortOrder(order);
    sortTable(accessor, order);
  };

  return (
    <thead>
      <tr>
        {headerData.map((header: Column) => (
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

const TableRow = ({
  rowData,
  headerData,
}: {
  rowData: Row;
  headerData: Column[];
}) => {
  return (
    <tr>
      {headerData.map((header: Column) => (
        <td key={header.label} className={'tableCell'}>
          {rowData.cellInfo[header.accessor].display === undefined
            ? rowData.cellInfo[header.accessor].data
            : rowData.cellInfo[header.accessor].display}
        </td>
      ))}
    </tr>
  );
};

export const Table = ({ columns, data }: TableProps) => {
  console.log('Columns in table:', columns);
  const [displayData, setDisplayData] = useState<Row[]>([]);
  const [headerData, setHeaderData] = useState<Column[]>([]);

  useEffect(() => {
    setDisplayData(data);
    setHeaderData(columns);
  }, [columns, data]);

  const sortTable = (
    sortField: string,
    sortOrder: string,
    sortFunction: RowComparator | null = null
  ) => {
    if (sortField === '') {
      return;
    }
    const defaultSortFunction = (a: Row, b: Row): number => {
      return (
        (sortOrder === SortOrders.ASCENDING ? 1 : -1) *
        a.cellInfo[sortField].data
          .toString()
          .localeCompare(b.cellInfo[sortField].data.toString(), 'zh', {
            numeric: true,
          })
      );
    };
    const sortedData =
      sortFunction === null
        ? [...displayData].sort(defaultSortFunction)
        : [...displayData].sort(sortFunction);
    setDisplayData(sortedData);
  };

  if (displayData.length > 0) {
    return (
      <table>
        <TableHeader headerData={headerData} sortTable={sortTable} />
        <tbody>
          {displayData.map((row) => (
            <TableRow
              rowData={row}
              headerData={headerData}
              key={row.id}
            />
          ))}
        </tbody>
      </table>
    );
  }
  return <>No table data</>;
};
