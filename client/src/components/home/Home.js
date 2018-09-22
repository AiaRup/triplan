import React, { Component } from 'react';
import './home.css';


class Home extends Component {

  autoCompleteOffers = () => {
    let input = document.getElementById("auto_complete_search")
    const autoComplete = new window.google.maps.places.Autocomplete(input)
    console.log(autoComplete)
  }

  render() {

    
    return (
      <div style={{height: '89.9vh', overflow: 'auto', backgroundImage: 'url(/images/travelBG.jpg)'}}>
        <div className="home-search-container">
          <h1 className="headlineStyle">Where Would You Like to Travel?</h1>
          <div className="search-bar-wrapper">
            <input type='text' className="search-bar" placeholder="Enter City" id="auto_complete_search" onChange={this.autoCompleteOffers}/>
            <button className="btnStyle">Get Ideas</button>
            <button className="btnStylePlan">Plan The Trip</button>
          </div>
        </div>  
      </div>
    );
  }
}

export default Home;