/**
 * Asynchronously loads the component for Matches page
 */
import React from 'react';
import Loadable from 'react-loadable';

import { CircularProgress } from 'material-ui/Progress';

export default Loadable({
  loader: () => import('./index'),
  loading: () => <CircularProgress />,
});

