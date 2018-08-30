import React, { Component } from 'react';
import './MyTrips.css';
import CardList from './CardList';
import OneTrip from './OneTrip';
// import { observer, inject } from 'mobx-react';


// @inject('store')
// @observer
class MyTrips extends Component {

  constructor(props) {
    super(props);
  }

  user_plans = [{ name: 'barcelona 2018' }, { name: 'paris 2017' }, { name: 'vienna 2016' },
  { name: 'singapour 2015' }, { name: 'seoul 2014' }];


  render() {

    return (
      <div className="all">
        <div className='search-bar'>
          <input type='text' placeholder='search...' />
        </div>
        <CardList plans={this.user_plans} />
        {/* <OneTrip trip={this.props.store.oneTrip} /> */}
        <OneTrip />
      </div>
    );
  }

}


export default MyTrips;