import React from 'react';
import Card from './Card';

const CardList = (props) => {
  return (

    <div className="card-list">
      {props.plans.map((plan, i) => <Card plan={plan} key={i} />)}
    </div>
  );
};


export default CardList;
