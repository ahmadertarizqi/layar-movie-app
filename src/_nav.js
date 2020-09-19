import React from 'react';
import * as Icon from 'react-feather';

const navigation = [
   {
      name: 'Movies',
      icon: <Icon.Film />,
      link: '/movies'
   },
   {
      name: 'Tv Shows',
      icon: <Icon.Tv />,
      link: '/tvshows'
   },
   {
      name: 'Favorites',
      icon: <Icon.Heart />,
      link: '/favorites'
   },
];

export default navigation;