import React, { useEffect, useState } from 'react';
import { PeoplePoster } from 'components/Poster';
import API from 'services/movies';
import CardLayout from 'components/CardLayout';

export default function People() {
   const [peoples, setPeoples] = useState([]);

   useEffect(() => {
      const getPeoples = async () => {
         const response = await API.getPeople();
         setPeoples(response.results);
      };

      getPeoples();
   }, []);

   return (
      <div className="movies-wrapper">
         <CardLayout title="Popular People">
            <div className="columns is-multiline">
               {peoples.map(people => (
                  <div key={people.id} className="column is-2">
                     <PeoplePoster 
                        peopleID={people.id}
                        profileImage={people.profile_path}
                        name={people.name}
                     />
                  </div>
               ))}
            </div>
         </CardLayout>
      </div>
   )
};