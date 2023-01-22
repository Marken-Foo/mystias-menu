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
        return (
          <td className="tableCell" key={accessor}>
            {displayFunctions[accessor](rowData)}
          </td>
        );
      })}
    </tr>
  );
};

export const EmptyRow = ({ accessors }: { accessors: string[] }) => (
  <tr>
    {accessors.map((accessor) => (
      <td className="tableCell" key={accessor}>
        ---
      </td>
    ))}
  </tr>
);
