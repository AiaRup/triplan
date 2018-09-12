import React from 'react';
import { Link } from 'react-router-dom';
import MarkerIcon from '@material-ui/icons/Place';
import DayIcon from '@material-ui/icons/CalendarTodayOutlined';



const Card = (props) => {

  return (
    <div className="card">
      <Link className="watch" to={`MyTrips/${props.plan._id}`} >
        <h3>{props.plan.name[0].toUpperCase() + props.plan.name.slice(1)}</h3>
        <span style={{ marginRight:'10px' }}><MarkerIcon/> {props.plan.city}, </span>
        <span><DayIcon/> {props.plan.days.length} Days</span>
      </Link>
    </div>
  );
};



export default Card;