import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Day from './Day'


@inject(allStores => ({
  daysArray: allStores.store.daysArray,
  addDay: allStores.store.addDay
}))
@observer
class DayList extends Component {
  render() {
    return (
      <div className="day-list-container">
        <button className="btn btn-primary btn-sm" onClick={this.props.addDay}>Add Day</button>

        <div className="day-list-wrapper">
          
          <ul className="day-list">
              {this.props.daysArray.map((day, index) => <li key={day.id}><Day index={index} day={day}/></li>)}
          </ul> 

        </div>
      </div>
    );
  }
};

export default DayList;