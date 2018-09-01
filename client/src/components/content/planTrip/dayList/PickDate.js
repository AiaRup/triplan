import React from 'react';
import { observer, inject } from 'mobx-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

@inject(allStores => ({
  chooseDate: allStores.store.chooseDate,
  daysArray: allStores.store.daysArray
}))
@observer
class PickDate extends React.Component {
  constructor() {
    super();
    this.state = {
      startDate: moment(new Date())
    };
  }

  handleChange = (date) => {
    this.setState({
      startDate: date
    });
    let formatedDate = moment(`/Date(${Date.parse(date)})/`).format('DD/MM/YYYY');
    this.props.chooseDate(this.props.dayIndex, formatedDate);
    console.log('date in state date', date);

  }

  render() {
    return <DatePicker
      selected={this.state.startDate}
      onChange={this.handleChange.bind(this)}
      minDate={moment()}
      dateFormat="DD/MM/YYYY"

    />;
  }
}

export default PickDate;
