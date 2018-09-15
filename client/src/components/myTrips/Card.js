import React from 'react';
import { Link } from 'react-router-dom';
import MarkerIcon from '@material-ui/icons/Place';
import DayIcon from '@material-ui/icons/CalendarTodayOutlined';
import EditIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/DeleteForeverTwoTone';



const Card = (props) => {

  return (
    <div className="card">
      <Link className="watch" to={`MyTrips/${props.plan._id}`} >
        <div className="icons-container"><EditIcon/><DeleteIcon></DeleteIcon></div>
        <h3>{props.plan.name[0].toUpperCase() + props.plan.name.slice(1)}</h3>
        <span style={{ marginRight:'10px' }}><MarkerIcon/> {props.plan.city}, </span>
        <span><DayIcon/> {props.plan.days.length} Days</span>
      </Link>
    </div>
  );
};



export default Card;