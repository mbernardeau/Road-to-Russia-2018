import { connect } from 'react-redux';
import ConnectionWidget from './ConnectionWidget';

const mapStateToProps = (state) => ({
  user: state.get('auth').user,
});

export default connect(
  mapStateToProps,
)(ConnectionWidget);
