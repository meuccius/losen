import PropTypes from 'prop-types';
import React from 'react';

import { Table } from '../primitives/Table';
import TableContainer from '../primitives/TableContainer';

export default function ApprovalAreas({ areas }) {
  if (areas === undefined || areas.length === 0) {
    return null;
  }
  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <th>FUNKSJON</th>
            <th>FAGOMRÅDE</th>
            <th>TILTAKSKLASSE</th>
          </tr>
        </thead>
        <tbody>
          {areas.map(area => (
            <tr key={area.function}>
              <td>{area.function}</td>
              <td>{area.subject_area}</td>
              <td>{area.grade}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
}

ApprovalAreas.propTypes = {
  areas: PropTypes.array.isRequired,
};
