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
    let sortDays = days.sort((a, b) => {
      let x = a.date;
      let y = b.date;
      return ((x < y) ? -1 : ((x > y) ? 1 : 0))
    })
    return (
      <Fragment>
        <div className="trip-header">
          {/* <h1> Name Trip: {name}</h1> */}
          <h1 className="line-on-sides">{name[0].toUpperCase() + name.slice(1)}</h1>
        </div>
        <div className="day-list-trip">
          {/* {days.map((day, i) => */}
          {sortDays.map((day, i) =>
            <Day day={day} index={i} key={i} />
          )}
        </div>
      </Fragment>
    );
  }
}
