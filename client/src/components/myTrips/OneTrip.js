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
    const { name, days } = this.props.store.oneTrip;
    // const { name, days } = this.props.trip;

    return (
      <Fragment>
        {/* {days} */}
        {/* <h2> Name Trip: {this.props.trip.name}</h2>
        Your route-
        {this.props.trip.days.map((day, i) =>
          <Day day={day} key={i} />
        )} */}
        <h2> Name Trip: {name}</h2>
        Your route-
        {days.map((day, i) =>
          <Day day={day} key={i} />
        )}
      </Fragment>
    )
  }
}
