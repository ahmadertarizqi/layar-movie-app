// import React from 'react';
import Favorites from "views/Favorites";
import MoviesContainer from "views/movies/MoviesContainer";
import MoviesNowPlaying from "views/movies/MoviesNowPlaying";
import MoviesPopular from "views/movies/MoviesPopular";
import Tvshows from "views/Tvshows";

const routes = [
   {
      name: 'movies',
      path: '/movies',
      component: MoviesContainer,
      routes: [
         {
            name: 'nowplaying',
            path: '/movies/nowplaying',
            exact: true,
            component: MoviesNowPlaying
         },
         {
            name: 'popular',
            path: '/movies/popular',
            exact: true,
            component: MoviesPopular
         }
      ]
   },
   {
      name: 'tvshows',
      path: '/tvshows',
      component: Tvshows
   },
   {
      name: 'favorites',
      path: '/favorites',
      component: Favorites
   }
];

export default routes;