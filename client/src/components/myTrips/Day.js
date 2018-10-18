import React from 'react';
import drawStarts from '../utils/drawStarts';

const Day = (props) => {
  return (
    <React.Fragment>
      <div className="day-date">{props.day.date}</div>
      {/* <div className="day-date">{moment(props.day.date).format('ddd, MMM D')}</div> */}
      {props.day.places.map((place, i) => {
        if (i % 2 === 0) {
          return (<div className="container-att left-att" key={i}>
            <div className="content-att">
              <div className="img-att-trip">
                {place.photo && <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=130&maxheight=130&photoreference=${place.photo}&key=AIzaSyCl5mAkzOiDZ8dnZjdankkW92-MYxmjNw0`} alt='' />}
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
              {place.photo && <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=130&maxheight=130&photoreference=${place.photo}&key=AIzaSyCl5mAkzOiDZ8dnZjdankkW92-MYxmjNw0`} alt='' />}
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
  );
};

export default Day;