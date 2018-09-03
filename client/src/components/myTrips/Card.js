import React from 'react';
import { Link } from 'react-router-dom';


const Card = (props) => {

  return (
    <div className="card">
      {/* <h3>{props.plan.name}</h3> */}
      <h3>{props.plan.name[0].toUpperCase() + props.plan.name.slice(1)}</h3>
      <Link className="watch" to={`MyTrips/${props.plan.name}`} >
        Watch
      </Link>
    </div>
  );
};



export default Card;