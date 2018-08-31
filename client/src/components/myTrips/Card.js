import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Card = (props) => {

    const handleWatch = () => {
        // maybe pass the name to app where is the routes and link,
        //by action im store save the name of trip clicked, and use this in the route
        console.log('after click watch: ', props.plan);
        // axios.get(`/MyTrips/${props.plan.id}`)
        //     .then(({ data }) => {
        //         console.log('data from server:', data);
        //         let structure = {
        //             // name: data.
        //         };
        //     }).catch(error => {
        //         console.log('Error fetching and parsing data', error);
        //     });
    }

    return (
        <div className="card">
            {/* <h4>  {props.plan_name} </h4> */}
            <h4>  {props.plan.name} </h4>
            {/* <Link to={`/MyTrips/${props.plan_name}`} > watch </Link> */}
            <Link to={`/MyTrips/${props.plan.name}`} > watch </Link>
        </div>

        //     return (
        //         <div className="card">
        //             <h4>  {props.plan.name} </h4>
        //             <button onClick={handleWatch}>Watch </button>
        //         </div>
    );
}


export default Card