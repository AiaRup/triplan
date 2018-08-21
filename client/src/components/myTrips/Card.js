import React, { Component } from 'react';

const Card = (props) => {

 const handleClick= ()=>{
    //  to = "/MyTrips/"+ props.plan
 }





  return (
            <div className = "card">
                <h4>  {props.plan} </h4>
                <button onClick={this.handleClick}>Watch </button>
            </div>
       );
    
}

export default Card;