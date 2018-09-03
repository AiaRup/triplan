import React from 'react';
import { Link } from 'react-router-dom';


const Card = (props) => {

  return (
    <div className="card">
      <h4>{props.plan.name}</h4>
      <Link to={`MyTrips/${props.plan.name}`} > Watch </Link>
    </div>
  );
};



export default Card;