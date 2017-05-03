import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import {
  firebaseConnect,
} from 'react-redux-firebase';

@firebaseConnect()
export default class Flag extends Component {
  static propTypes = {
    firebase: PropTypes.shape({
      storage: PropTypes.func.isRequired,
    }),
    country: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      url: null,
    };
  }

  componentDidMount() {
    this.storageRef = this.props.firebase.storage().ref();
    this.getUrl(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.getUrl(nextProps);
  }

  getUrl = (props) => {
    const { country } = props;

    if (country) {
      this.storageRef.child(`flags/${country}.svg`).getDownloadURL().then((url) => {
        this.setState({
          url,
        });
      });
    }
  }

  render() {
    const { url } = this.state;
    const { country, className, style } = this.props;

    return <img src={url} alt={country} className={className} style={style} />;
  }
}
