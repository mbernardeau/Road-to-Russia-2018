import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardMedia,
  CardTitle,
} from 'material-ui/Card';


const Stadium = ({ stadium }) => (
  <Card style={styles.card}>
    <CardTitle
      title={stadium.name}
      subtitle={stadium.city}
    />
    {stadium.photo &&
      <CardMedia
        overlay={<CardTitle title={stadium.name} subtitle={stadium.photo.credit} />}
      >
        <img src={stadium.photo.url} alt={stadium.name} />
      </CardMedia>
    }
  </Card>
);

const styles = {
  card: {
    arginTop: 15,
    marginBottom: 15,
    width: 400,
  },
};

Stadium.propTypes = {
  stadium: PropTypes.shape({
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    photo: PropTypes.shape({
      url: PropTypes.string.isRequired,
      credit: PropTypes.string,
    }),
  }),
};

export default Stadium;
