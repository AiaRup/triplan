import React, { Component } from 'react';
import './MyTrips.css';
import CardList from './CardList';
import OneTrip from './OneTrip';
import SearchTrip from './SearchTrip';
// import { observer, inject } from 'mobx-react';


// @inject('store')
// @observer
class MyTrips extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user_plans: [{ name: 'barcelona 2018' }, { name: 'paris 2017' }, { name: 'vienna 2016' },
      { name: 'singapour 2015' }, { name: 'seoul 2014' }],
      filter_plans: [{ name: 'barcelona 2018' }, { name: 'paris 2017' }, { name: 'vienna 2016' },
      { name: 'singapour 2015' }, { name: 'seoul 2014' }],
    }
  }

  user_plans = [{ name: 'barcelona 2018' }, { name: 'paris 2017' }, { name: 'vienna 2016' },
  { name: 'singapour 2015' }, { name: 'seoul 2014' }];

  componentDidMount() {
    // const trips = [] // get all the trips from the server  / props
    // this.setState({  user_plans: trips,  filter_plans: trips})
  }

  searchTrips = (query) => {
    // console.log("Our App knows the query: " + query)
    let trips = this.state.user_plans.filter((trip) => {
      return trip.name.includes(query)
      // || trip.body.includes(query)
    });
    console.log(trips);
    this.setState({ filter_plans: trips });

  }

  render() {

    return (
      <div className="all">
        <SearchTrip searchTrips={this.searchTrips} />
        <CardList plans={this.state.filter_plans} />
        {/* <OneTrip trip={this.props.store.oneTrip} /> */}
        <OneTrip />
      </div>
    );
  }

}


export default MyTrips;