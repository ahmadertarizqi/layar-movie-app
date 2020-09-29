import React from 'react';
import PropTypes from 'prop-types';

export default function TabPanel({ children }) {
   return (
      <div className="tabpanel-wrapper">{children}</div>
   )
};

TabPanel.propTypes = {
   label: PropTypes.string.isRequired,
   dataKey: PropTypes.number.isRequired
};