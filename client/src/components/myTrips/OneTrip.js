// import React  from 'react';
// // // import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

// const OneTrip = (props) => {
    
//     return (
//         <div>

//          <h2>  {props.plan} </h2> 
        

//         {/* {props.plan.days.map(
//             (index, day) => 
         

//          {<div class="container">
//             <div class="row">
//                 <div class="col-md-4">{day.places} </div>
//                 <div class="col-md-4">Notes</div>
//                 <div class="col-md-4"> Map </div>
//             </div>
//         </div>}
//         )}  */}

//         </div>
//     )
//  }

import React, { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react';
import Day from './Day';

/*=====================================================
Display Trip
=======================================================*/

@inject('store')
@observer
export default class OneTrip extends Component {

  render() {
    // const { name, days } = this.props.store.oneTrip;
    // const plans= this.props.store.plansArray;
    const { name, days } = this.props.plan;

    return (
      <Fragment>
        <div className="trip-header">
          <h1> Name Trip: {name}</h1>
          <h2> Day Details:</h2>
        </div>
        <div className="day-list">
          {days.map((day, i) =>
            <Day day={day} index={i} key={i} />
          )}
        </div>
      </Fragment>
    )
  }
}
