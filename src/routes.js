// import React from 'react';
import Browse from "views/Browse";
import Favorites from "views/Favorites";
import MovieDetail from "views/MovieDetail";
import MoviesCategory from "views/MoviesCategory";
import MoviesContainer from "views/MoviesContainer";
import Tvshows from "views/Tvshows";

const routes = [
   {
      name: 'Browse',
      path: '/browse',
      component: Browse
   },
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
      name: 'people',
      path: '/people',
      component: Tvshows
   },
   {
      name: 'favorites',
      path: '/favorites',
      component: Favorites
   }
];

export default routes;