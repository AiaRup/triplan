import React, { Component, Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import Day from './Day';
/*=====================================================
Display Trip
=======================================================*/
@inject('store')
@observer
export default class OneTrip extends Component {

  render() {
    const { name, days } = this.props.plan;
    console.log('id trip ', this.props.plan._id);

    return (
      <Fragment>
        <div className="trip-header">
          {/* <h1> Name Trip: {name}</h1> */}
          <h1>{name}</h1>
          <h2> Day Details: </h2>
        </div>
        <div className="day-list-trip">
          {days.map((day, i) =>
            <Day day={day} index={i} key={i} />
          )}
        </div>
      </Fragment>
    );
  }
}
