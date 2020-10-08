// import React from 'react';
import Favorites from "views/Favorites";
import MovieDetail from "views/MovieDetail";
import MoviesCategory from "views/MoviesCategory";
import MoviesContainer from "views/MoviesContainer";
import Tvshows from "views/Tvshows";

const routes = [
   {
      name: 'movies',
      path: '/movies',
      component: MoviesContainer,
      routes: [
         {
            name: 'movies category',
            path: '/movies/:movieCategory',
            exact: true,
            component: MoviesCategory
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