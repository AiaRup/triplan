import React from 'react';
import { Link } from 'react-router-dom';


  
const Card = (props) => {


   return (
            <div className = "card">

                <h4>  {props.name} </h4>

               <Link to={`/MyTrips/${props.name}`} > watch </Link>

            </div>
    
    );
    
//     const handleWatch = () => {
//         // maybe pass the name to app where is the routes and link,
//         //by action im store save the name of trip clicked, and use this in the route
//     }


//     return (
//         <div className="card">
//             <h4>  {props.plan} </h4>
//             <button onClick={this.handleWatch}>Watch </button>
//         </div>
//     );

}


export default Card