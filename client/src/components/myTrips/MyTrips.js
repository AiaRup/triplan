import React, {Component} from 'react';
import axios from 'axios';
import  './MyTrips.css';
import CardList from './CardList';
import { observer, inject } from 'mobx-react';
import OneTrip from './OneTrip';
import store from '../../store/tripStore';


// var user_plans=[{name: 'barcelona 2018'}, {name:'paris 2017'}, {name:'vienna 2016'},
// {name:'singapour 2015'},{name: 'seoul 2014'}];


// @inject(allStores => ({
//    user_id: allStores.store.user_id
// }))
@inject('store') 
@observer
class MyTrips extends Component {
  constructor(props){
    super(props);
    this.state = { user_plans:[],
                   plan_names: []}
  }

  // handleSubmit=(event)=>{
  //   is_filtered = true;
  //   let filter_string = event.target.value;
  //   let filtered_array = user_plans.filter( plan => plan===filter_string );

  // }

componentDidMount = () => {
  let u_id = this.props.store.user_id;
  console.log('user id: '+ u_id);
  axios.get(`api/users/users_trips/${u_id}`)
   .then (response=>{     
       let plans = response.data;
       console.log("got response! ");
        console.log(response);
      //  console.log('type:' + typeof plans )
        // console.log('plans:' + plans.constructor===Array)

      //  this.setState( {user_plans: plans});
        this.setState( (state, props) => {
         return {user_plans:plans}
        });
       // console.log( this.state.user_plans);

       let names= plans.map(plan => plan.name);
      // console.log ('names')
      // console.log(names)

      this.setState( (state, props) => {
        return {plan_names : names}
      });
       // console.log  ('plan_names in MyTrips.js')
      //console.log (this.state.plan_names);
   })
   .catch(error => {
      console.log('Error fetching and parsing data', error);
  });
}
  

render(){
    return (

      <div className="all">

        {/* onSubmit={this.handleSubmit} */}
          
        <div className='search-bar'>
              <input  type='text' placeholder='search .....'  />
        </div>


         <CardList plan_names={this.state.plan_names} /> 

        {/* <OneTrip trip={this.props.store.oneTrip} /> */}
        {/* <OneTrip /> */}

      </div>
    );
  }

}



export default MyTrips;