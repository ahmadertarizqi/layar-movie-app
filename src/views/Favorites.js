import React, { useContext } from 'react';
import { FavoriteContext } from 'store/FavoriteContext';
import { Link } from 'react-router-dom';
import CardLayout from 'components/CardLayout';
import { MoviePoster, PeoplePoster } from 'components/Poster';

function Favorites() {
   const favorites = useContext(FavoriteContext);
   const { 
      state: { movieFavorites, peopleFavorites }
   } = favorites;

   return (
      <div>
         <CardLayout title={`Movie Favorites [${movieFavorites.length}]`}>
            <div className="columns is-multiline">
               {movieFavorites.map(movie => (
                  <div className="column is-one-fifth" key={movie.id}>
                     <MoviePoster 
                        detailId={movie.id}
                        poster={movie.poster_path}
                        title={movie.title}
                        releaseDate={movie.release_date}
                        rating={movie.vote_average}
                     />
                  </div>
               ))}
            </div>
         </CardLayout>

         <CardLayout title={`People Favorites [${peopleFavorites.length}]`}>
            <div className="columns is-multiline">
               {peopleFavorites.map(people => (
                  <div className="column is-2" key={people.id}>
                     <Link to={`/people/${people.id}`} className="anchor-link">
                        <PeoplePoster 
                           peopleID={people.id}
                           profileImage={people.profile_path}
                           name={people.name}
                        />
                     </Link>
                  </div>
               ))}
            </div>
         </CardLayout>
      </div>
   )
}

export default Favorites;