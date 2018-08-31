import React from 'react';
import MapWithADirectionsRenderer from './MapDay';

const Day = (props) => {
  const { date, places } = props.day;
  console.log('date: ', date, 'places:', places);
  const positions = places.map((place) => ({ location: place.position }));
  console.log('positions of ', date, positions);
  const route = {
    origin: positions[0],
    destination: positions[positions.length-1]
  };
  positions.splice(0, 1);
  positions.splice(positions.length-1, 1);
  route.waypoints = positions;

  return (
    <div>
      <h4>date :{date}</h4>
      <h3>Attractions:</h3>
      {places.map((place, i) => <h4 key={i}>{place.name} | {place.type}</h4>)}
      <MapWithADirectionsRenderer route={route} />

    </div>
  )
}

export default Day;