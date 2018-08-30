import React, { Component } from 'react';

const Card = (props) => {

    const handleWatch = () => {
        //  to = "/MyTrips/"+ props.plan
        // maybe pass the name to app where is the routes and link,
        //by action im store save the name of trip clicked, and use this in the route
        console.log('after click watch: ', props.plan);


    }


    return (
        <div className="card">
            <h4>{props.plan.name}</h4>
            <button onClick={handleWatch}>Watch </button>
        </div>
    );

}

export default Card;