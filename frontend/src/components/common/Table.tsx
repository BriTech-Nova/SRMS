import React from 'react';

interface TableColumn<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  cell?: (item: T) => React.ReactNode;
  className?: string;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  keyField: keyof T;
  isLoading?: boolean;
  noDataMessage?: string;
  className?: string;
  onRowClick?: (item: T) => void;
}

function Table<T>({
  columns,
  data,
  keyField,
  isLoading = false,
  noDataMessage = 'No data available',
  className = '',
  onRowClick
}: TableProps<T>) {
  return (
    <div className={`table-container ${className}`}>
      <table className="table table-hover mb-0">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className={column.className}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                <div className="d-flex justify-content-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
                <p className="mt-2 mb-0">Loading data...</p>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                {noDataMessage}
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr 
                key={String(item[keyField])} 
                onClick={onRowClick ? () => onRowClick(item) : undefined}
                style={onRowClick ? { cursor: 'pointer' } : undefined}
              >
                {columns.map((column, columnIndex) => (
                  <td key={columnIndex} className={column.className}>
                    {column.cell
                      ? column.cell(item)
                      : typeof column.accessor === 'function'
                      ? column.accessor(item)
                      : String(item[column.accessor])}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
