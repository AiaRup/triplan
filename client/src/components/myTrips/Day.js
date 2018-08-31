import React from 'react';
import MapWithADirectionsRenderer from './MapDay';
import Notes from './Notes';

const Day = (props) => {
  const { date, places } = props.day;
  console.log('date: ', date, 'places:', places);
  const positions = places.map((place) => ({ location: place.position }));
  // console.log('positions of ', date, positions);
  const route = {
    origin: positions[0],
    destination: positions[positions.length - 1]
  };
  positions.splice(0, 1);
  positions.splice(positions.length - 1, 1);
  route.waypoints = positions;

  return (
    <div className="day">
      <h3>Date :{date}</h3>
      <h4>Attractions:</h4>
      {places.map((place, i) =>
        <h5 key={i}>{place.name} | {place.type}</h5>)}
      <MapWithADirectionsRenderer route={route} />
      <Notes index={props.index} />
    </div>
  )
}

export default Day;