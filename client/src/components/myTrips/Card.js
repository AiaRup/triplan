import React from 'react';
import { Link } from 'react-router-dom';
import MarkerIcon from '@material-ui/icons/Place';
import DayIcon from '@material-ui/icons/CalendarTodayOutlined';
import EditIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/DeleteForeverTwoTone';
import { observer, inject } from 'mobx-react';

@inject(allStores => ({
  daysArray: allStores.store.daysArray,
  tripId: allStores.store.tripIdToEdit,
  saveTripId: allStores.store.saveTripId,
  updateDaysInStore: allStores.store.updateDaysWhenEditTrip
}))
@observer
class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  handleDeleteTrip = () => {
    console.log('delete trip id: ', this.props.plan._id);
  };

  editTrip = () => {
    console.log('delete trip id: ', this.props.plan._id);
    this.props.saveTripId(this.props.plan._id);
    //!check if there is a trip that wasn't save yet

    console.log('plan', this.props.plan.days);
    this.props.updateDaysInStore(this.props.plan.days);

  };

  render() {
    return (
      <div className="card">
        <div className="icons-container">
          <EditIcon onClick={this.editTrip}/>
          <span onClick={this.handleDeleteTrip}>
            <DeleteIcon/>
          </span>
        </div>
        <Link className="watch" to={`MyTrips/${this.props.plan._id}`} >
          <h3>{this.props.plan.name[0].toUpperCase() + this.props.plan.name.slice(1)}</h3>
          <span style={{ marginRight: '10px' }}><MarkerIcon /> {this.props.plan.city}, </span>
          <span><DayIcon /> {this.props.plan.days.length} Days</span>
        </Link>
      </div>
    );
  }
}



export default Card;