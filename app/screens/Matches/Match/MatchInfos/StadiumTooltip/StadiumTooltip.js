import React from 'react'

import PropTypes from 'prop-types'

const StadiumTooltip = ({ name, photo, city, capacity }) => (
  <div style={styles.container}>
    <div style={styles.textContainer}>
      <div style={styles.stadiumText}>{name}</div>
      <div style={styles.stadiumText}>•</div>
      <div style={styles.stadiumText}>{city}</div>
    </div>
    {photo && <img style={styles.img} src={photo.url} alt={name} />}
    <div style={styles.textContainer}>
      <div>Capacité</div>
      <div>{capacity.toLocaleString('fr')} places</div>
    </div>
  </div>
)

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
}

StadiumTooltip.defaultProps = {
  capacity: 0,
  name: '',
  city: '',
}

StadiumTooltip.propTypes = {
  name: PropTypes.string,
  city: PropTypes.string,
  photo: PropTypes.shape({
    url: PropTypes.string.isRequired,
    credit: PropTypes.string,
  }),
  capacity: PropTypes.number,
}

export default StadiumTooltip
