import React from 'react';
import { Link } from 'react-router-dom';


  
const Card = (props) => {



   return (
            <div className = "card">

                <h4>  {props.plan_name} </h4>

               <Link to={`/MyTrips/${props.plan_name}`} > watch </Link>

            </div>
    
    );
    
}

export default Card;

