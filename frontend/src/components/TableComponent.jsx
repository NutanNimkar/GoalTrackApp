import React from 'react';
import { Table} from 'react-bootstrap';
import './TableComponent.css';

const TableComponent = ({ columns, data, onEdit, onDelete, onToggleStatus }) => {
  return (
    <Table className="custom-table" bordered hover>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, rowIndex) => (
          <tr key={item._id || rowIndex}>
            {columns.map((column, colIndex) => (
              <td key={colIndex}>
                {column.renderCell ? column.renderCell(item, rowIndex) : item[column.field]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableComponent;
