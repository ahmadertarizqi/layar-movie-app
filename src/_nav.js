import React from 'react';
import * as Icon from 'react-feather';

const navigation = [
   {
      name: 'Browse',
      icon: <Icon.Grid />,
      link: '/browse'
   },
   {
      name: 'Movies',
      icon: <Icon.Film />,
      link: '/movies'
   },
   {
      name: 'People',
      icon: <Icon.Users />,
      link: '/people'
   },
   {
      name: 'Favorites',
      icon: <Icon.Heart />,
      link: '/favorites'
   },
];

export default navigation;