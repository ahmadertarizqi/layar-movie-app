import React from 'react';
import PropTypes, { object } from 'prop-types';

export default function TabMenu({ menuTabs, activeMenuTab, onChangeTabs }) {
   const renderMenuTabs = menuTabs.map(menu => {
      const { dataKey, label } = menu.props
      const isActive = (dataKey === activeMenuTab) ? 'is-active' : '';
      return (
         <li key={dataKey} 
            className={isActive}
            onClick={() => onChangeTabs(dataKey)}
         >
            <button>{label}</button>
         </li>
      );
   });

   return <ul>{renderMenuTabs}</ul>
};

TabMenu.propTypes = {
   menuTabs: PropTypes.arrayOf(object),
   activeMenuTab: PropTypes.number.isRequired,
   onChangeTabs: PropTypes.func.isRequired
};