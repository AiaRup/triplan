import React from 'react';
import Card from './Card';

const CardList = (props)=> {
 return (

 
    <div className = "card-list">

      {props.plans.map( plan => <Card plan={plan}/> )}

{/*       
      {props.plans.map( (plan, index) =>
       return (
           if( index%3==0)
              <div {class="row"}>

           else if (index%3==2)
            </div>
  
           <Card>

       )  
 */}

    </div>
        );
    }


export default CardList;
