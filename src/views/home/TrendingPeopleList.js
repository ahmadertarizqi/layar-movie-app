import React from 'react';
import CardLayout from 'components/CardLayout';
import UserAvatar from 'components/UserAvatar';

export default function TrendingPeopleList({ peoples }) {
   return (
      <React.Fragment>
         <CardLayout title="Trending People">
            <div className="main-inner">
               {peoples.map(people => (
                  <UserAvatar 
                     key={people.id}
                     castName={people.name}
                     photo={people.profile_path}
                  />
               ))}
            </div>
         </CardLayout>
      </React.Fragment>
   )
};