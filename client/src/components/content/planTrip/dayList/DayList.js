import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import InlineEdit from 'react-inline-editing';

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
          <InlineEdit inputClassName="inlineInput" labelClassName="inlineEdit" text={this.props.tripName} onFocusOut={(data) => {
            this.props.saveTripName(data);
          }} />
          <button className="btn btn-primary btn-sm add-day" onClick={this.props.addDay}>Add Day</button>
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