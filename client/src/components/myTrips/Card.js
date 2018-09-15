import React from 'react';
import { Link } from 'react-router-dom';
import MarkerIcon from '@material-ui/icons/Place';
import DayIcon from '@material-ui/icons/CalendarTodayOutlined';
import EditIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/DeleteForeverTwoTone';



const Card = (props) => {
  const handleDeleteTrip = () => {
    console.log('delete trip id: ', props.plan._id);

  }
  return (
    <div className="card">
      <div className="icons-container">
        <EditIcon />
        <span onClick={handleDeleteTrip}>
          <DeleteIcon>
          </DeleteIcon>
        </span>
      </div>
      <Link className="watch" to={`MyTrips/${props.plan._id}`} >
        <h3>{props.plan.name[0].toUpperCase() + props.plan.name.slice(1)}</h3>
        <span style={{ marginRight: '10px' }}><MarkerIcon /> {props.plan.city}, </span>
        <span><DayIcon /> {props.plan.days.length} Days</span>
      </Link>
    </div>
  );
};



export default Card;