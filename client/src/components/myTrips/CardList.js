import React from 'react';
import Card from './Card';

const CardList = (props) => {

  return (
    <div className="card-list">
      {
        props.plans.length > 0 ? props.plans.map((plan, i) => <Card plan={plan} key={i} />)
          :
          <h2> No Trips were Found. </h2>
      }
    </div>
  );
};


export default CardList;
