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

  // console.log('route', route);

  const getLetter = (index) => {
    const startLetter = 65;
    return String.fromCharCode(startLetter + index);
  }


  return (
    <div className="wrapper-day-map">
      <div className="day-date-map"><span className="date-in-day-map">{date}</span> <span className="city-in-day-map">{props.city}</span></div>

      <div className="day-content-map-view">

        <div id="map-canvas">
          <MapDay route={route} directions={false} />
        </div>
        <div className="route-directions">
          {places.map((place, i) => {
            return (
              <div key={i} className="wrapper-place-direction">
                <span className="circle-att">{getLetter(i)}</span>
                <p>{place.name}</p>
                <span style={{ color: '#999', marginLeft: '5px', display: 'block' }}>#{place.category}</span>
              </div>
            );
          })}

        </div>
      </div>

    </div>


  );
};

export default DayMapView;