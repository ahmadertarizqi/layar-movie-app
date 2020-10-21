import React from 'react';
import * as Icon from 'react-feather';

const navigation = [
   {
      name: 'Home',
      icon: <Icon.Home />,
      link: '/home'
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