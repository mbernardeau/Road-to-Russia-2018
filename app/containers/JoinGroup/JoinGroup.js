import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';

const dataSourceConfig = {
  text: 'name',
  value: 'id',
};

const createDataSource = (groups) => _.map(groups, (value, key) => ({
  [dataSourceConfig.text]: value.name,
  [dataSourceConfig.value]: key,
}));


class JoinGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectionValid: false,
    };
  }

  handleNewRequest = (chosenRequest, index) => {
    if (index !== -1) {
      this.setState({
        selectionValid: true,
        selected: chosenRequest,
      });
    } else if (this.state.selectionValid) {
      this.setState({
        selectionValid: false,
      });
    }
  }

  applyInGroup = () => {
    if (this.state.selectionValid) {
      this.props.applyInGroup(this.props.uid, this.state.selected);
    }
  }

  render() {
    const groups = createDataSource(this.props.groups);

    return (
      <div style={styles.container}>
        <h2>Rejoindre un groupe</h2>
        <div style={styles.fields}>
          <AutoComplete
            floatingLabelText="Nom du groupe"
            dataSource={groups}
            filter={AutoComplete.fuzzyFilter}
            dataSourceConfig={dataSourceConfig}
            onNewRequest={this.handleNewRequest}
          />
          <RaisedButton disabled={!this.state.selectionValid} onClick={this.applyInGroup} label="Envoyer la demande" primary />
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    textAlign: 'center',
  },

  fields: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};

JoinGroup.propTypes = {
  groups: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ),
  applyInGroup: PropTypes.func.isRequired,
  uid: PropTypes.string.isRequired,
};

export default JoinGroup;
