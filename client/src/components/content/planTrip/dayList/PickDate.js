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

  
  render() {

    return <DatePicker
        selected={moment(this.props.daysArray[this.props.dayIndex].date)}
        onChange={(event)=>this.props.chooseDate(this.props.dayIndex, event)}
    />;
  }
}

export default PickDate;
