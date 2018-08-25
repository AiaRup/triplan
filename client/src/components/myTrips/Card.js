import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import OneTrip from './OneTrip';


const Card = (props) => {


   return (
            <div className = "card">
                <h4>  {props.plan} </h4>
                 {/* <Router >  */}
                   <Link to = {`/MyTrips/${props.plan}`}> watch </Link>
                   {/* <hr /> */}

                   {/* <Route  path = {`/MyTrips/${props.plan}`}  component ={OneTrip}/>  */}
                   {/* <Route  path = "/MyTrips/Paris2017"  component ={OneTrip}/>  */}
                   {/* <Route/> */}

                 {/* </Router> */}

              


            </div>
    
);
    
}

export default Card;