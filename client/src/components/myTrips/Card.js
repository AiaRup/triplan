// import React from 'react';
// import { Link } from 'react-router-dom';
// import MarkerIcon from '@material-ui/icons/Place';
// import DayIcon from '@material-ui/icons/CalendarTodayOutlined';
// import EditIcon from '@material-ui/icons/EditOutlined';
// import DeleteIcon from '@material-ui/icons/DeleteForeverTwoTone';
// import axios from 'axios';



// const Card = (props) => {
//   const handleDeleteTrip = () => {
//     const userId= props.
//     console.log('delete trip id: ', props.plan._id);
//     axios.delete(`cities/${postId}/comments/${commentId}`)
//     .then(() => {
//       let newArray = this.state.cities.map((city, index) => {
//         if (index === indexPost) {
//           let commentsArr = city.comments.filter((comment, index) => index !== indexComment);
//           city.comments = commentsArr;
//           return city;
//         }
//         else return city;
//       });

//       this.setState({ cities: newArray }); })
//     .catch(function (error) {
//       console.log(error);
// });
//   }
//   return (
//     <div className="card">
//       <div className="icons-container">
//         <EditIcon />
//         <span onClick={handleDeleteTrip}>
//           <DeleteIcon>
//           </DeleteIcon>
//         </span>
//       </div>
//       <Link className="watch" to={`MyTrips/${props.plan._id}`} >
//         <h3>{props.plan.name[0].toUpperCase() + props.plan.name.slice(1)}</h3>
//         <span style={{ marginRight: '10px' }}><MarkerIcon /> {props.plan.city}, </span>
//         <span><DayIcon /> {props.plan.days.length} Days</span>
//       </Link>
//     </div>
//   );
// };



// export default Card;


import React from 'react';
import { Link } from 'react-router-dom';
import MarkerIcon from '@material-ui/icons/Place';
import DayIcon from '@material-ui/icons/CalendarTodayOutlined';
import EditIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/DeleteForeverTwoTone';
import axios from 'axios';
import { observer, inject } from 'mobx-react';


@inject(allStores => ({
  plansArray: allStores.store.plansArray,
  user_id: allStores.store.user_id,
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
    const userId = this.props.user_id;
    const tripId = this.props.plan._id;
    // console.log('delete trip id');
    axios.delete(`api/users/users/${userId}/myTrips/${tripId}`)
      .then((data) => {
        console.log('data from axiox after delete trip ', data);

        // let newArray = this.state.cities.map((city, index) => {
        //   if (index === indexPost) {
        //     let commentsArr = city.comments.filter((comment, index) => index !== indexComment);
        //     city.comments = commentsArr;
        //     return city;
        //   }
        //   else return city;
        // });

        // this.setState({ cities: newArray });

      }).catch(function (error) {
        console.log(error);
      });
  };

  // editTrip = () => {
  //   console.log('delete trip id: ', this.props.plan._id);
  //   this.props.saveTripId(this.props.plan._id);
  //   //!check if there is a trip that wasn't save yet    console.log('plan', this.props.plan.days);
  //   this.props.updateDaysInStore(this.props.plan.days);
  // };

  render() {

    return (
      <div className="card">
        <div className="icons-container">
          <EditIcon onClick={this.editTrip} />
          <DeleteIcon onClick={this.handleDeleteTrip} />
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

