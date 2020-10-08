import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TabMenu from './TabMenu';
import TabPanel from './TabPanel';
import './Tabs.scss';

function Tabs({ children, position, defaultActiveTab }) {
   const [activeMenuTab, setActiveMenuTab] = useState(defaultActiveTab);

   return (
      <div className="main-tab-wrapper">
         <div className={`tabs ${position}`}>
            <TabMenu 
               menuTabs={children} 
               activeMenuTab={activeMenuTab}
               onChangeTabs={setActiveMenuTab}
            />
         </div>
         {children[activeMenuTab]}
      </div>
   )
};

export default { Tabs, TabPanel };

Tabs.propTypes = {
   children: PropTypes.node.isRequired,
   defaultActiveTab: PropTypes.number.isRequired,
   position: PropTypes.oneOf(['is-centered', 'is-right']),  
};

// default align position is left
Tabs.defaultProps = {
   position: ''
};

/* usage example */
/* <Tabs defaultActiveTab={0}>
      <TabPanel label="Photos" dataKey={0}>{renderPhotos()}</TabPanel>
      <TabPanel label="Videos" dataKey={1}>{renderVideos()}</TabPanel>
      <TabPanel label="Tab 3" dataKey={2}>Tab 3</TabPanel>
   </Tabs> */