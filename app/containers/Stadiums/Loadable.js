/**
 * Asynchronously loads the component for Stadiums page
 */
import Loadable from 'react-loadable';

import { CircularProgress } from 'material-ui/Progress';

export default Loadable({
  loader: () => import('./index'),
  loading: CircularProgress,
});

