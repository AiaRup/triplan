import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import AddIcon from '@material-ui/icons/Add';
import { Button } from '@material-ui/core';
import { UncontrolledTooltip } from 'reactstrap';

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
          <Button variant="fab" id="Tooltip" color="secondary" mini aria-label="Add" onClick={this.props.addDay}>
            <AddIcon />
          </Button>
          <UncontrolledTooltip placement="bottom" target="Tooltip"> Add 1 day to your trip
          </UncontrolledTooltip >
          <h5> Days of your Trip </h5>
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

