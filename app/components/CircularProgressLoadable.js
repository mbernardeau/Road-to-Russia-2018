import React from 'react';
import Loadable from 'react-loadable';
import { CircularProgress } from 'material-ui/Progress';

export default (opts) => Loadable({
  loading: () => <CircularProgress />,
  ...opts,
});

