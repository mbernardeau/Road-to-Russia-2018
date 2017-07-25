/**
 * Asynchronously loads the component for Matches page
 */
import Loadable from 'react-loadable';

import CircularProgress from 'material-ui/CircularProgress';

export default Loadable({
  loader: () => import('./index'),
  loading: CircularProgress,
});

