
import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';

export default function drawStarts(stars) {
  const starsToDraw = [];
  if (stars % 1 === 0) {
    for (let i=0 ; i < stars; i++) {
      starsToDraw.push(<StarIcon key={i}/>);
    }
  }
  else {
    for (let i=0 ; i < Math.floor(stars); i++) {
      starsToDraw.push(<StarIcon key={i}/>);
    }
    starsToDraw.push(<StarHalfIcon key={Math.floor(stars)}/>);
  }
  return starsToDraw;
}