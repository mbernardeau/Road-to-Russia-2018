import React from 'react';

import PropTypes from 'prop-types';

const textContainerStyles = {
  display: 'flex',
  color: 'white',
  textShadow: '0 1px 0 rgba(0,0,0,.2)',
  justifyContent: 'space-around',
};

const StadiumTooltip = ({ stadium }) => (
  <div style={{ width: 200 }}>
    <div style={textContainerStyles}>
      <div style={{ textAlign: 'center' }}>
        { stadium.name }
      </div>
      <div style={{ textAlign: 'center' }}>•</div>
      <div style={{ textAlign: 'center' }}>
        { stadium.city }
      </div>
    </div>
    {stadium.photo && <img style={{ width: '100%' }} src={stadium.photo.url} alt={stadium.name} />}
    <div style={textContainerStyles}>
      <div>Capacité</div>
      <div>{stadium.capacity.toLocaleString('fr')} places</div>
    </div>
  </div>
);

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
