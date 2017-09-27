/**
 * Asynchronously loads the component for HomePage
 */
import Loadable from 'react-loadable';
import { CircularProgress } from 'material-ui/Progress';

export default Loadable({
  loader: () => import('./index'),
  loading: CircularProgress,
});
