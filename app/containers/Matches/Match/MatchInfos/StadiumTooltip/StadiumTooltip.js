import React from 'react';

import PropTypes from 'prop-types';

const StadiumTooltip = ({ stadium }) => (
  <div style={styles.container}>
    <div style={styles.textContainer}>
      <div style={styles.stadiumText}>
        { stadium.name }
      </div>
      <div style={styles.stadiumText}>•</div>
      <div style={styles.stadiumText}>
        { stadium.city }
      </div>
    </div>
    {stadium.photo && <img style={styles.img} src={stadium.photo.url} alt={stadium.name} />}
    <div style={styles.textContainer}>
      <div>Capacité</div>
      <div>{stadium.capacity.toLocaleString('fr')} places</div>
    </div>
  </div>
);

const styles = {
  container: {
    width: 200,
  },

  textContainer: {
    display: 'flex',
    color: 'white',
    textShadow: '0 1px 0 rgba(0,0,0,.2)',
    justifyContent: 'space-around',
  },

  stadiumText: {
    textAlign: 'center',
  },

  img: {
    width: '100%',
  },
};

StadiumTooltip.propTypes = {
  stadium: PropTypes.shape({
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    photo: PropTypes.shape({
      url: PropTypes.string.isRequired,
      credit: PropTypes.string,
    }),
    capacity: PropTypes.number.isRequired,
  }).isRequired,
};


export default StadiumTooltip;
