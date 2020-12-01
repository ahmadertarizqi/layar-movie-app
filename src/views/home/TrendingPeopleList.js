import React, { useState } from 'react';
import CardLayout from 'components/CardLayout';
import UserAvatar from 'components/UserAvatar';
import { Link } from 'react-router-dom';

export default function TrendingPeopleList({ peoples }) {
   const [limit] = useState(10);

   return (
      <React.Fragment>
         <CardLayout title="Trending People" className="card-is-people">
            <div className="main-inner">
               {peoples.slice(0, limit).map(people => (
                  <Link to={`/people/${people.id}`} key={people.id} className="anchor-link">
                     <UserAvatar 
                        castName={people.name}
                        photo={people.profile_path}
                        className="is-vertical-list"
                     >
                        <h6 className="text-title is-size-7">Name</h6>
                        <p className="text-value has-text-weight-semibold">{people.name ? people.name : '--'}</p>
                        <div className="divider"></div>
                        <h6 className="text-title is-size-7">Known For</h6>
                        <p className="cast-name">{people.known_for_department ? people.known_for_department : '--'}</p>
                     </UserAvatar>
                  </Link>
               ))}
            </div>

            <Link to="/peoples" className="button is-customized btn-view-all">View All People</Link>
         </CardLayout>
      </React.Fragment>
   )
};