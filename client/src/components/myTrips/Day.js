import React from 'react';
import MapDay from './MapDay';
import Notes from './Notes';

const Day = (props) => {
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

  const updateDirections = (ans) => {
    // directions = ans;
  }
  return (
    <div className="day">
      <h3>Date :{date}</h3>
      <h4>Attractions:</h4>
      {places.map((place, i) => {
        console.log('place in map', place, i);
        return <h5 key={i}>{place.name}  {place.category ? '(' + place.category + ')' : ''}</h5>;
      })}
      <MapDay route={route} directions={false} />
      <Notes index={props.index} />
    </div>
  );
};

export default Day;