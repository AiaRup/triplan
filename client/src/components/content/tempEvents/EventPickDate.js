import React from 'react';
import { observer, inject } from 'mobx-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import './datePickerCss.css';
 

@inject(allStores => ({
  EventStartDate: allStores.store.EventStartDate,
  tempEventCalander: allStores.store.tempEventCalander,
  EventEndDate: allStores.store.EventEndDate
}))
@observer
class EventPickDate extends React.Component {

  render() {
    const lastDateIndex = this.props.tempEventCalander.length-1;

    return (
    <div className='date-pick-container'>
      <div className='from-event-date'>
      From:
        <DatePicker
            selected={moment(this.props.tempEventCalander[0].startDate)}
            selectsStart
            startDate={this.props.tempEventCalander[0]}
            onChange={(event)=>this.props.EventStartDate(event)}
            className='eventDatePicker'
        />
      </div>

      <div className='to-event-date'>
      To:
        <DatePicker
            selected={moment(this.props.tempEventCalander[lastDateIndex].endDate)}
            selectsEnd
            endDate={this.props.tempEventCalander[lastDateIndex]}
            onChange={(event)=>this.props.EventEndDate(event, lastDateIndex)}
            className='eventDatePicker'
        />
      </div>
    </div>)
  }
};

export default EventPickDate;
