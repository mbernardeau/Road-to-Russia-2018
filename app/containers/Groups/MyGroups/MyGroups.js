import React from 'react';
import PropTypes from 'prop-types';

import {
  map,
} from 'lodash';

import Card from 'material-ui/Card';
import Table, { TableBody } from 'material-ui/Table';

import GroupRow from './GroupRow';

const MyGroups = ({ groups }) => (
  <Card style={styles.container}>
    <h2>Mes groupes</h2>
    <Table>
      <TableBody>
        {map(groups, (g, key) => (
          <GroupRow group={g} key={key} />
        ))}
      </TableBody>
    </Table>
  </Card>
);


const styles = {
  container: {
    width: '90%',
  },
};

MyGroups.propTypes = {
  groups: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ),
};

export default MyGroups;
