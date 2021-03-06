import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import API from 'services/movies';
import { getImage, getGender, truncateString } from 'utils';
import { MoviePoster } from 'components/Poster';
import { FavoriteContext } from 'store/FavoriteContext';
import { PEOPLE_CONSTANT } from 'contants';
import { toast } from 'react-toastify';
import * as Icon from 'react-feather';
import Button from 'components/Button';
import Loading from 'components/Loading';

export default function PeopleDetail() {
   const { peopleID } = useParams();
   const [people, setPeople] = useState(null);
   const [isReadMoreText, setReadMoreText] = useState(false);
   const [limitText] = useState(175);

   const favoriteStore = useContext(FavoriteContext);
   const {
      state: { peopleFavorites }, 
      addToFavorite,
   } = favoriteStore;

   useEffect(() => {
      const getMovie = async () => {
         const response = await API.getPeople(peopleID);
         setPeople(response);
      };
      getMovie();

   }, [peopleID]);

   const addToFavoriteHandler = (payload) => {
      const peopleArr = [...peopleFavorites];
      const findIdx = peopleArr.findIndex(people => people.id === payload.id);
      if(findIdx === -1) {
         addToFavorite(PEOPLE_CONSTANT, payload);
         toast.info("Person added to favorite list",{
            position: "top-right",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
         });
      } else {
         toast.info("Person is already in favorite list",{
            position: "top-right",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
         });
      }
   };

   if(!people) {
      return (
         <div className="loading-wrapper-centered">
            <Loading width={50} height={50} />
            <h4 className="has-text-white">Loading...</h4>
         </div>
      )
   }

   return (
      <div className="people-detail">
         <div className="people-detail-head">
            <div className="columns">
               <div className="column is-3">
                  <div className="img-poster">
                     <img src={`${getImage('people') + people.profile_path}`} alt={people.name} />
                  </div>
                  <div className="people-info mt-4">
                     <h5 className="is-size-5 mb-3">Personal Info</h5>
                     <div className="block-list">
                        Known For: <span className="value">{people.known_for_department}</span>
                     </div>
                     <div className="block-list">
                        Gender: <span className="value">{getGender(people.gender)}</span>
                     </div>
                     <div className="block-list">
                        Birthday: <span className="value">{dayjs(people.birthday).format("DD MMM YYYY")}</span>
                     </div>
                     <div className="block-list">
                        Place of Birth: <span className="value">{people.place_of_birth}</span>
                     </div>
                     <div className="block-list">
                        Also Known As: 
                        <ul>
                           {people.also_known_as && 
                              people.also_known_as.map((value, idx) => (
                                 <li key={idx} className="value">{value}</li>
                              ))
                           }
                        </ul>
                     </div>
                  </div>
               </div>
               <div className="column is-9">
                  <div className="m-flex space-between">
                     <h3 className="text-title is-size-3 mb-3" style={{ color: '#fff'}}>{people.name}</h3>
                     <Button onClick={() => addToFavoriteHandler(people)}>
                        <Icon.Heart color="#fff" className="mr-2" /> Favorites
                     </Button>
                  </div>

                  <div className="people-biography">
                     <h5 className="is-size-5">Biography</h5>
                     <p>
                        {!isReadMoreText 
                           ? truncateString(people.biography, limitText, ".....  ") 
                           : people.biography 
                        }

                        {people.biography.split(" ").length > limitText
                           ? <button className="" 
                                 onClick={() => setReadMoreText(!isReadMoreText)}>
                                 {isReadMoreText ? "Read Less" : "Read More"}
                              </button>
                           : null
                        }
                     </p>
                  </div>

                  <br />

                  <div className="block-section-biography">
                     <h5 className="is-size-5 mb-3">Starred In</h5>
                     <div className="columns is-multiline is-mobile">
                        {people.movie_credits ? 
                           people.movie_credits.cast.map(val => (
                              <div className="column is-half-mobile is-one-quarter-desktop" key={val.id}>
                                 <MoviePoster 
                                    detailId={val.id}
                                    poster={val.poster_path}
                                    title={val.title}
                                    releaseDate={val.release_date}
                                    rating={val.vote_average}
                                 />
                              </div>
                           )) : <div>Loading</div>
                        }
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
};