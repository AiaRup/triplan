import React from 'react';
import MapDay from './MapDay';
import './dayMapView.css';

const DayMapView = (props) => {

  const { date, places } = props.day;
  // console.log('date: ', date, 'places:', places);
  const positions = places.map((place) => ({ location: place.position }));
  // console.log('positions of ', date, positions);
  const route = {
    origin: positions[0],
    destination: positions[positions.length - 1]
  };

  positions.splice(0, 1);
  positions.splice(positions.length - 1, 1);
  route.waypoints = positions;

  console.log('route', route);


  return (
    <div className="wrapper-day-map">
      <div className="day-date-map"><span className="date-in-day-map">{date}</span> <span>{props.city}</span></div>

      <div className="day-content-map-view">
        <MapDay route={route} directions={false} />
      </div>

    </div>


  );
};

export default DayMapView;