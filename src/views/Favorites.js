import React, { useContext } from 'react';
import { FavoriteContext } from 'store/FavoriteContext';
import { Link } from 'react-router-dom';
import CardLayout from 'components/CardLayout';
import { MoviePoster, PeoplePoster } from 'components/Poster';
import * as Icon from 'react-feather';
import { MOVIE_CONSTANT, PEOPLE_CONSTANT } from 'contants';
import { toast } from 'react-toastify';

function Favorites() {
   const favorites = useContext(FavoriteContext);
   const { 
      state: { movieFavorites, peopleFavorites },
      deleteFromFavorite
   } = favorites;

   return (
      <div>
         <CardLayout title={`Movie Favorites [${movieFavorites.length}]`}>
            {!movieFavorites.length < 1 ? 
               <div className="columns is-multiline">
                  {movieFavorites.map(movie => (
                     <div className="column is-one-fifth" key={movie.id}>
                        <MoviePoster 
                           detailId={movie.id}
                           poster={movie.poster_path}
                           title={movie.title}
                           releaseDate={movie.release_date}
                           rating={movie.rating}
                        />
                        <button 
                           onClick={() => {
                              deleteFromFavorite(MOVIE_CONSTANT, movie.id);
                              toast.info("Movie removed from favorite list",{
                                 position: "top-right",
                                 autoClose: 2500,
                                 hideProgressBar: false,
                                 closeOnClick: true,
                                 pauseOnHover: true,
                                 draggable: true,
                                 progress: undefined,
                              });
                           }}
                           className="button is-small is-info is-outlined mt-3"
                        >Delete</button>
                     </div>
                  ))}
               </div>
               : 
               <h3 className="is-size-5">
                  ====== <Icon.Meh /> Movie List is Empty ======
               </h3>
            }
         </CardLayout>

         <hr style={{ height: '1px', backgroundColor: '#fff3' }} />

         <CardLayout title={`People Favorites [${peopleFavorites.length}]`}>
            {!peopleFavorites.length < 1 ?
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
                        <button 
                           onClick={() => {
                              deleteFromFavorite(PEOPLE_CONSTANT, people.id);
                              toast.info("Person removed from favorite list",{
                                 position: "top-right",
                                 autoClose: 2500,
                                 hideProgressBar: false,
                                 closeOnClick: true,
                                 pauseOnHover: true,
                                 draggable: true,
                                 progress: undefined,
                              });
                           }}
                           className="button is-small is-info is-outlined mt-3"
                        > Delete </button>
                     </div>
                  ))}
               </div>
               :
               <h3 className="is-size-5">
                  ====== <Icon.Meh /> People List is Empty ======
               </h3>
            }
         </CardLayout>
      </div>
   )
}

export default Favorites;