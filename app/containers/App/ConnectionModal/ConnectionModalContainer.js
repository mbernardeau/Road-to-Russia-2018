import { connect } from 'react-redux';
import { authenticate } from '../../../redux/actions/auth';
import ConnectionModal from './ConnectionModal';

const mapDispatchToProps = (dispatch) => ({
  authenticate: (provider) => dispatch(authenticate(provider)),
});

export default connect(
  undefined,
  mapDispatchToProps,
)(ConnectionModal);
