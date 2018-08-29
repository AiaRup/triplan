import React from 'react';
import  './MyTrips.css';
import CardList from './CardList';

// var user_plans=[{name: 'barcelona 2018'}, {name:'paris 2017'}, {name:'vienna 2016'}, 
// {name:'singapour 2015'},{name: 'seoul 2014'}];


const MyTrips = (props) => {

   

// handleSubmit=(event)=>{
//   is_filtered = true;
//   let filter_string = event.target.value;
//   let filtered_array = user_plans.filter( plan => plan===filter_string );

// }

    return (

      <div className="all">

          {/* onSubmit={this.handleSubmit} */}
          
   <div className='search-bar'>
        <input  type='text' placeholder='search...'  />
   </div>
       {/* let user_plans= props.user_plans; */}
      {/* {let plan_names = props.user_plans.map ( plan => plan.name)} */}

        <CardList plan_names={props.user_plans.map ( plan => plan.name)} />


      </div>
    );
}




export default MyTrips;