import React from 'react';
import { Link } from 'react-router-dom';
import MarkerIcon from '@material-ui/icons/Place';
import DayIcon from '@material-ui/icons/CalendarTodayOutlined';
// import EditIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/DeleteForeverTwoTone';
import axios from 'axios';
import { observer, inject } from 'mobx-react';


@inject(allStores => ({
  query: allStores.store.query,
  saveFilterPlans: allStores.store.saveFilterPlans,
  savePlans: allStores.store.savePlans,
  plansArray: allStores.store.plansArray,
  user_id: allStores.store.user_id,
  daysArray: allStores.store.daysArray,
  tripId: allStores.store.tripIdToEdit,
  saveTripId: allStores.store.saveTripId,
  updateDaysInStore: allStores.store.updateDaysWhenEditTrip
}))
@observer
class Card extends React.Component {

  handleDeleteTrip = () => {
    const userId = this.props.user_id;
    const tripId = this.props.plan._id;
    axios.delete(`api/users/users/${userId}/myTrips/${tripId}`)
      .then((user) => {
        console.log('plans from axiox after delete trip ', user.data.plans);
        this.props.savePlans(user.data.plans);
        const query = this.props.query;
        let trips = this.props.plansArray.filter((trip) => {
          return trip.name.toLowerCase().includes(query.toLowerCase());
        });
        this.props.saveFilterPlans(trips);
      }).catch(function (error) {
        console.log(error);
      });
  };

  // editTrip = () => {
  //   console.log('delete trip id: ', this.props.plan._id);
  //   this.props.saveTripId(this.props.plan._id);
  //   //check if there is a trip that wasn't save yet    console.log('plan', this.props.plan.days);
  //   this.props.updateDaysInStore(this.props.plan.days);
  // };

  render() {

    return (
      <div className="card">
        <div className="icons-container">
          {/* <EditIcon onClick={this.editTrip} /> */}
          <DeleteIcon onClick={this.handleDeleteTrip} />
        </div>

        <Link className="watch" to={`MyTrips/${this.props.plan._id}`} >
          <h3>{this.props.plan.name[0].toUpperCase() + this.props.plan.name.slice(1)}</h3>
          <span style={{ marginRight: '10px' }}><MarkerIcon /> {this.props.plan.city}, </span>
          {this.props.plan.days.length === 1 ?
            <span><DayIcon /> {this.props.plan.days.length} Day</span> :
            <span><DayIcon /> {this.props.plan.days.length} Days</span> }
        </Link>
      </div>
    );
  }
}

export default Card;

