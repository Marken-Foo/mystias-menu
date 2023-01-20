import { Data, DisplayFunctionCollection } from './TableInterfaces';

interface TableRowProps<T> {
  rowData: T;
  accessors: string[];
  displayFunctions: DisplayFunctionCollection<T>;
}

export const TableRow = <T extends Data>({
  rowData,
  accessors,
  displayFunctions,
}: TableRowProps<T>) => {
  return (
    <tr>
      {accessors.map((accessor) => {
        return <td key={accessor}>{displayFunctions[accessor](rowData)}</td>;
      })}
    </tr>
  );
};
