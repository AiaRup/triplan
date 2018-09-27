import React from 'react';
import { Link } from 'react-router-dom';
import MarkerIcon from '@material-ui/icons/Place';
import DayIcon from '@material-ui/icons/CalendarTodayOutlined';
// import EditIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import { observer, inject } from 'mobx-react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
// import red from '@material-ui/core/colors/red';
// import purple from '@material-ui/core/colors/purple';
// const primary = red[500]; // #F44336
// const primary = purple.A200;

function Transition(props) {
  return <Slide direction="up" {...props} />;
}


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
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

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
        this.handleClose(); // close the dialog after delete sucsess
      }).catch(function (error) {
        console.log(error);
      });
  };

  render() {

    return (
      <div className="card">
        <div className="icons-container">
          {/* <EditIcon onClick={this.editTrip} /> */}
          {/* <DeleteIcon onClick={this.handleDeleteTrip} /> */}
          <DeleteIcon onClick={this.handleClickOpen} />
        </div>

        <Link className="watch" to={`MyTrips/${this.props.plan._id}`} >
          <h3>{this.props.plan.name[0].toUpperCase() + this.props.plan.name.slice(1)}</h3>
          <span style={{ marginRight: '10px' }}><MarkerIcon /> {this.props.plan.city}, </span>
          {this.props.plan.days.length === 1 ?
            <span><DayIcon /> {this.props.plan.days.length} Day</span> :
            <span><DayIcon /> {this.props.plan.days.length} Days</span>}
        </Link>

        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {`Are you sure you want to delete "${this.props.plan.name}"?`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              This operation cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleDeleteTrip} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Card;

