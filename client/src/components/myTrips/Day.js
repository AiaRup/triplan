import React from 'react';
import MapDay from './MapDay';
import Notes from './Notes';

const Day = (props) => {
  console.log('id day ', props.day._id);

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
      <div className="attractions">
        <h3>Date :{date}</h3>
        <h4>Attractions:</h4>
        {places.map((place, i) => {
          console.log('place in map', place, i);
          return <h5 key={i}>{place.name}  {place.category ? '(' + place.category + ')' : ''}</h5>;
        })}
      </div>
      <div className="mapDay">
        <MapDay route={route} directions={false} />
      </div>
      <div className="notes">
        <Notes index={props.index} />
      </div>
    </div>
  );
};

export default Day;