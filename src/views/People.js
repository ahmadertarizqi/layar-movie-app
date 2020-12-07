import React, { useEffect, useState } from 'react';
import { PeoplePoster } from 'components/Poster';
import API from 'services/movies';
import CardLayout from 'components/CardLayout';
import { Link } from 'react-router-dom';
import Loading from 'components/Loading';

export default function People() {
   const [peoples, setPeoples] = useState([]);
   const [numberPage, setNumberPage] = useState(1);
   const [isLoadMore, setLoadMore] = useState(false);

   useEffect(() => {
      const getPeoples = async () => {
         setLoadMore(true);
         const response = await API.getPeoples(numberPage);
         setPeoples(prevPeoples => [...prevPeoples, ...response.results]);
         setLoadMore(false);
      };

      getPeoples();
   }, [numberPage]);

   const loadMorePeoples = () => {
      setNumberPage(prevPage => prevPage + 1);
   };

   if(!peoples || peoples.length < 1) {
      return (
         <div className="loading-wrapper-centered">
            <Loading width={50} height={50} />
            <h4 className="has-text-white">Loading...</h4>
         </div>
      )
   }

   return (
      <div className="movies-wrapper">
         <CardLayout title="Popular People">
            <div className="columns is-multiline">
               {peoples.map(people => (
                  <div key={people.id} className="column is-2">
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
            <div style={{ textAlign: 'center' }}>
               <button className={`button ${isLoadMore ? 'is-loading' : ''}`} 
                  onClick={() => loadMorePeoples()}>
                  {isLoadMore ? 'Loading...' : 'Load More'}
               </button>
            </div>
         </CardLayout>
      </div>
   )
};