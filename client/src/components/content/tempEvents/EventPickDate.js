import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import { observer, inject } from 'mobx-react';
import 'react-datepicker/dist/react-datepicker.css';
import './datePickerCss.css';

@inject(allStores => ({
  EventStartDate: allStores.store.EventStartDate,
  tempEventCalander: allStores.store.tempEventCalander,
  EventEndDate: allStores.store.EventEndDate,
  updateEventCategory: allStores.store.updateEventCategory
}))
@observer

export default class DateRange extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      startDate: moment(new Date()),
      endDate: moment(new Date()),
      value: []
    };
  }

  handleSelectChange = (value) => {
    console.log('You have selected: ', value);
    this.setState({ value });
    this.props.updateEventCategory(value);
  }

  options = [
    { value: 'observances', label: 'observances' },
    { value: 'conferences', label: 'conferences' },
    { value: 'politics', label: 'politics' },
    { value: 'expos', label: 'expos' },
    { value: 'concerts', label: 'concerts' },
    { value: 'festivals', label: 'festivals' },
    { value: 'performing-arts', label: 'performing-arts' },
    { value: 'sports', label: 'sports' },
    { value: 'community', label: 'community' }
  ];

  handleChange = ({ startDate, endDate }) => {
    startDate = startDate || this.state.startDate;
    endDate = endDate || this.state.endDate;

    if (startDate.isAfter(endDate)) {
      endDate = startDate;
    }

    this.setState({ startDate, endDate });
    let formatedStart = moment(`/Date(${Date.parse(startDate)})/`).format('YYYY/MM/DD');
    // let formatedStart = moment(`/Date(${Date.parse(startDate)})/`).format('DD/MM/YYYY');
    let formatedEnd = moment(`/Date(${Date.parse(endDate)})/`).format('YYYY/MM/DD');
    // let formatedEnd = moment(`/Date(${Date.parse(endDate)})/`).format('DD/MM/YYYY');
    this.props.EventStartDate(formatedStart);
    this.props.EventEndDate(formatedEnd);
  }

  handleChangeStart = (startDate) => this.handleChange({ startDate })

  handleChangeEnd = (endDate) => this.handleChange({ endDate })

  render () {
    return (
      <div className='date-pick-container'>
        <div className='from-event-date'>
      From:
          <DatePicker
            selected={this.state.startDate}
            selectsStart
            startDate={this.state.startDate}
            onChange={this.handleChangeStart}
            minDate={moment()}
            maxDate={moment().add(6, 'months')}
            dateFormat="DD/MM/YYYY" />
        </div>
        <div className='to-event-date'>
       To:
          <DatePicker
            selected={this.state.endDate}
            selectsEnd
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeEnd}
            minDate={moment()}
            maxDate={moment().add(6, 'months')}
            dateFormat="DD/MM/YYYY" />
        </div>
        <div>
          <Select
            isMulti
            joinValues
            value={this.state.value}
            placeholder="Search Event Category"
            options={this.options}
            onChange={this.handleSelectChange}
            components={makeAnimated()}
            closeMenuOnSelect={false}/>
        </div>
      </div>);
  }
}
