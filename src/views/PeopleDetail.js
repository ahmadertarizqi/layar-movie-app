import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from 'services/movies';
import { getImage } from 'utils';

export default function PeopleDetail() {
   const { peopleID } = useParams();
   const [people, setPeople] = useState({});

   useEffect(() => {
      const getMovie = async () => {
         const response = await API.getPeople(peopleID);
         setPeople(response);
         console.log(response);
      };
      getMovie();

   }, [peopleID]);

   return (
      <div className="people-detail">
         <div className="columns">
            <div className="column is-3">
               <div className="img-poster">
                  <img src={`${getImage('people') + people.profile_path}`} alt={people.name} />
               </div>
               <div className="people-info">
                  <h5 className="is-size-5">Personal Info</h5>
                  <div className="block-list">
                     Known For: <span className="value">{people.known_for_department}</span>
                  </div>
                  <div className="block-list">
                     Gender: <span className="value">{people.gender}</span>
                  </div>
                  <div className="block-list">
                     Birthday: <span className="value">{people.birthday}</span>
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
               <h3 className="text-title is-size-3" style={{ color: '#fff'}}>{people.name}</h3>
               <div className="people-biography">
                  <h5 className="is-size-5">Biography</h5>
                  <p>{people.biography}</p>
               </div>
            </div>
         </div>
      </div>
   )
};