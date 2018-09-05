import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
// import InlineEdit from 'react-inline-editing';

import Day from './Day';
import './dayList.css';



@inject(allStores => ({
  daysArray: allStores.store.daysArray,
  addDay: allStores.store.addDay,
  tripName : allStores.store.tripName,
  saveTripName : allStores.store.saveTripName
}))
@observer
class DayList extends Component {


  render() {
    return (
      <div className="day-list-container">
        <div className="header-days">
          {/* <InlineEdit inputClassName="inlineInput" labelClassName="inlineEdit" text={this.props.tripName} onFocusOut={(data) => {
            this.props.saveTripName(data);
          }} />
          <i className="fa fa-pencil" aria-hidden="true"></i> */}
          <h5>
            Days of your Trip
          </h5>
          


          <button className="btn btn-secondary btn-sm add-day" onClick={this.props.addDay} data-toggle="tooltip" data-placement="top" title="Add one day">+</button>
        </div>
        <div className="day-list-wrapper">

          <ul className="day-list">
            {this.props.daysArray.map((day, index) => <li key={day.id}><Day index={index} day={day}/></li>)}
          </ul>

        </div>
      </div>
    );
  }
}

export default DayList;