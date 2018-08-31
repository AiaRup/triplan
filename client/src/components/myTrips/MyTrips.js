import React, { Component } from 'react';
import './MyTrips.css';
import CardList from './CardList';
import OneTrip from './OneTrip';
import { observer, inject } from 'mobx-react';

// var user_plans=[{name: 'barcelona 2018'}, {name:'paris 2017'}, {name:'vienna 2016'},
// {name:'singapour 2015'},{name: 'seoul 2014'}];


@inject('store')
@observer
class MyTrips extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user_plans: ['Barcelona 2018', 'Paris 2017', 'Vienna 2016', 'Singapour 2015',
        'Seoul 2014', 'Pekin 2012', 'Tokyo 2015']
    };
  }

  // handleSubmit=(event)=>{
  //   is_filtered = true;
  //   let filter_string = event.target.value;
  //   let filtered_array = user_plans.filter( plan => plan===filter_string );

  // }

  render() {
    return (

      <div className="all">

        {/* onSubmit={this.handleSubmit} */}

        <div className='search-bar'>
          <input type='text' placeholder='search...' />
        </div>
        <CardList plans={this.state.user_plans} />
        {/* <OneTrip trip={this.props.store.oneTrip} /> */}
        <OneTrip />

      </div>
    );
  }

}


export default MyTrips;