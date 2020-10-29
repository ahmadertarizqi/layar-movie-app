// import React from 'react';
import Home from "views/home/HomeContainer";
import Favorites from "views/Favorites";
import MovieDetail from "views/movies/MovieDetail";
import MoviesCategory from "views/movies/MoviesCategory";
import MoviesContainer from "views/movies/MoviesContainer";
import People from "views/People";
import Genres from "views/Genres";

const routes = [
   {
      name: 'Home',
      path: '/home',
      component: Home
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
      component: People
   },
   {
      name: 'Genres',
      path: '/genres/:genreID',
      component: Genres
   },
   {
      name: 'favorites',
      path: '/favorites',
      component: Favorites
   }
];

export default routes;