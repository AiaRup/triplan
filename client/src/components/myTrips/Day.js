import React from 'react';
import drawStarts from '../utils/drawStarts';

import moment from 'moment';

import MapDay from './MapDay';
import Notes from './Notes';
import pin from '../../images/pin.png';

const Day = (props) => {
  console.log('day', props.day);

  // const { date, places } = props.day;
  // // console.log('date: ', date, 'places:', places);
  // const positions = places.map((place) => ({ location: place.position }));
  // // console.log('positions of ', date, positions);
  // const route = {
  //   origin: positions[0],
  //   destination: positions[positions.length - 1]
  // };

  // positions.splice(0, 1);
  // positions.splice(positions.length - 1, 1);
  // route.waypoints = positions;

  // console.log('route', route);

  // const updateDirections = (ans) => {
  //   // directions = ans;
  // }
  return (
    <React.Fragment>
      <div className="day-date">{props.day.date}</div>
      {/* <div className="day-date">{moment(props.day.date).format('ddd, MMM D')}</div> */}
      {props.day.places.map((place, i) => {
        if (i % 2 === 0) {
          return (<div className="container-att left-att" key={i}>
            <div className="content-att">
              <div className="img-att-trip">
                {/* {place.photo && <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=130&maxheight=130&photoreference=${place.photo}&key=AIzaSyCl5mAkzOiDZ8dnZjdankkW92-MYxmjNw0`} alt='' />} */}
              </div>
              <h5>{place.name}</h5>
              <p>{place.address}</p>
              <p>{place.phone}</p>
              <p>{drawStarts(place.rating)} <span style={{ color: '#999', marginLeft: '5px' }}>#{place.category}</span></p>
              <p>{place.duration}</p>
            </div>
          </div>);
        }
        return (<div className="container-att right-att" key={i}>
          <div className="content-att">
            <div className="img-att-trip">
              {/* {place.photo && <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=130&maxheight=130&photoreference=${place.photo}&key=AIzaSyCl5mAkzOiDZ8dnZjdankkW92-MYxmjNw0`} alt='' />} */}
            </div>
            <h5>{place.name}</h5>
            <p>{place.address}</p>
            <p>{place.phone}</p>
            <p>{drawStarts(place.rating)} <span style={{ color: '#999', marginLeft: '5px' }}>#{place.category}</span></p>
            <p>{place.duration}</p>
          </div>
        </div>);
      })
      }

    </React.Fragment>


    // <div className="day-trip">
    //   <div className="attractions">
    //     <h3>{date}</h3>
    //     <ul className="list-attractions">
    //       {places.map((place, i) => {
    //         console.log('place in map', place, i);
    //         return <h5 key={i}> <i className="fa fa-circle"></i> {place.name} {place.category ? '(' + place.category + ')' : ''} </h5>;
    //       })}
    //     </ul>

    //   </div>
    //   <div className="mapDay">
    //     <MapDay route={route} directions={false} />
    //   </div>
    //   <div className="notes">
    //     <img src={pin} alt="pin icon" className="pin-note" />
    //     <Notes index={props.index} />
    //   </div>
    // </div>

  );
};

export default Day;