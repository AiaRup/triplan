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
