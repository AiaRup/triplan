import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { default as LocationSearchInput } from './StandAloneSearch';
import './home.css';

class Home extends Component {

  routeToPlan = (e) => {
    e.preventDefault();
    this.props.history.push('/planing');
  }

  render() {
    return (
      <div style={{ height: '89.9vh', overflow: 'auto', backgroundImage: 'url(/images/travelBG.jpg)' }}>
        <div className="home-search-container">
          <h1 className="headlineStyle">Where Would You Like to Travel?</h1>
          <div className="search-bar-wrapper">
            <LocationSearchInput/>
            <button className="btnStyle">Get Ideas</button>
            <button className="btnStylePlan" onClick={this.routeToPlan}>Plan The Trip</button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);



