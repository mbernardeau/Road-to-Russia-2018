import React from 'react';
import PropTypes from 'prop-types';

import {
  TableCell,
  TableRow,
} from 'material-ui/Table';

import GroupStatus from './GroupStatus';

const empty = {};

const GroupRow = ({ group, uid }) => (
  <TableRow>
    <TableCell>
      <b>{group.name}</b>
    </TableCell>
    <TableCell>
      <GroupStatus status={(group.members || empty)[uid]} />
    </TableCell>
  </TableRow>
);


GroupRow.propTypes = {
  group: PropTypes.shape({
    name: PropTypes.string.isRequired,
    members: PropTypes.objectOf(
      PropTypes.string,
    ),
  }).isRequired,
  uid: PropTypes.string.isRequired,
};

export default GroupRow;
