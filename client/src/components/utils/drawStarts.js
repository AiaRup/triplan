
import React from 'react';

export default function drawStarts(stars) {
  const starsToDraw = [];
  if (!stars || stars === 'Unknown') {
    return;
  }
  if (stars % 1 === 0) {
    for (let i=0 ; i < stars; i++) {
      starsToDraw.push(<i className="fa fa-star" aria-hidden="true" style={{ color: '#FFCC00' }} key={i}></i>);
    }
  }
  else {
    for (let i=0 ; i < Math.floor(stars); i++) {
      starsToDraw.push(<i className="fa fa-star" aria-hidden="true" style={{ color: '#FFCC00' }} key={i}></i>);
    }
    starsToDraw.push(<i className="fa fa-star-half-o" aria-hidden="true" style={{ color: '#FFCC00' }} key={Math.floor(stars)}></i>);
  }
  return starsToDraw;
}