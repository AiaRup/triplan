import React, { Component } from 'react';
import axios from 'axios';
import './MyTrips.css';
import CardList from './CardList';
import SearchTrip from './SearchTrip';
import { observer, inject } from 'mobx-react';
import { PulseLoader } from 'react-spinners';
import { css } from 'react-emotion';

const override = css`
    display: block;
    margin: 20px auto;
`;
@inject('store')
@observer
class MyTrips extends Component {

  state = {
    isLoading: true
  }

  componentDidMount = () => {
    // if there is no id in store
    // if (!this.props.store.user_id) {
    const userId = localStorage.getItem('oktaID');
    if (userId !== null) {
      // get user id from mongo
      axios.get(`/api/users/users/${userId}`)
        .then((response) => {
          // console.log('response', response);
          // set user trips
          if (response.data.length !== 0) {
            let plans = response.data[0].plans;
            this.props.store.savePlans(plans);
            this.props.store.saveFilterPlans(plans);
            // do not show loading gif
            this.setState({ isLoading: false });
          }
        }).catch(error => {
          console.log('Error fetching and parsing user trips', error);
        });
    }
  }
  // }


  searchTrips = (query) => {
    this.props.store.saveQuery(query);
    let trips = this.props.store.plansArray.filter((trip) => {
      return trip.name.toLowerCase().includes(query.toLowerCase());
    });
    this.props.store.saveFilterPlans(trips);
  }

  render() {
    return (
      <div className="all">
        <SearchTrip searchTrips={this.searchTrips} />
        <div className='sweet-loading'>
          <PulseLoader
            className={override}
            sizeUnit={'px'}
            size={20}
            color={'#f50057'}
            loading={this.state.isLoading}
          />
        </div>
        {this.state.isLoading ? null : <CardList plans={this.props.store.filter_plans} />}
      </div>
    );
  }

}


export default MyTrips;

