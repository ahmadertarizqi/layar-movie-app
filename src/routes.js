// import React from 'react';
import Favorites from "views/Favorites";
import MovieDetail from "views/movies/MovieDetail";
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
            name: 'popular',
            path: '/movies/popular',
            exact: true,
            component: MoviesPopular
         },
         {
            name: 'nowplaying',
            path: '/movies/nowplaying',
            exact: true,
            component: MoviesNowPlaying
         }
      ]
   },
   {
      name: 'movie detail',
      path: '/movie/:movieID',
      component: MovieDetail
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