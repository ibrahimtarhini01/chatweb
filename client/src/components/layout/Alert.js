import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div
      className={` alert alert-${alert.alertType} rounded-0 `}
      key={alert.id}
    >
      {alert.message}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alerts,
});

export default connect(mapStateToProps)(Alert);
