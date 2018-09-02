import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import axios from 'axios';

@inject('store')
@observer
class Card extends Component {

    handleWatch = () => {
      //  to = "/MyTrips/"+ props.plan
      // maybe pass the name to app where is the routes and link,
      //by action im store save the name of trip clicked, and use this in the route
      const idPlan = this.props.plan.id;
      const idUser = this.props.store.user_id;

      axios.get(`/api/users/${idUser}/myTrips/${idPlan}`).then((tripResul) => {

      });


    };

    render() {

      return (
        <div className="card">
          <h4>  {this.props.plan} </h4>
          <button onClick={this.handleWatch}>Watch </button>
        </div>
      );
    }
}


export default Card;