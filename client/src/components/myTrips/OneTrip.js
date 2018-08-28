import React  from 'react';
// // import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

const OneTrip = (props) => {
    
    return (
        <div>

         <h2>  {props.plan} </h2> 
        

        {/* {props.plan.days.map(
            (index, day) => 
         

         {<div class="container">
            <div class="row">
                <div class="col-md-4">{day.places} </div>
                <div class="col-md-4">Notes</div>
                <div class="col-md-4"> Map </div>
            </div>
        </div>}
        )}  */}

        </div>
    )
 }

 export default OneTrip;
