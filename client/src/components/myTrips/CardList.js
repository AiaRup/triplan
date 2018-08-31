import React from 'react';
import Card from './Card';

const CardList = (props)=> {
 return (

 
    <div className = "card-list">

 {props.plan_names.map( (plan_name,index) => <Card plan_name={plan_name} key={index}/> )}
{/*       
      {props.plans.map( (plan, index) =>
       return (
           if( index%3==0)
              <div {class="row"}>

           else if (index%3==2)
            </div>
  
           <Card>

       )  

       <div className="card-list">
            {props.plans.map((plan, i) => <Card plan={plan} key={i} />)}
        </div>
 */}

    </div>
        );
    }


export default CardList;
