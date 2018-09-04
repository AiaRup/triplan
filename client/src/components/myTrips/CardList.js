import React from 'react';
import Card from './Card';

const CardList = (props)=> {
    
//console.log('plan_names in CardList.js')
//console.log(props.plan_names)
 


 return (
      
     
     <div className = "card-list">

     {props.plan_names.map( 
     (one_name, index)=> <Card key={index} name={one_name}/>
     )}   

    </div>

 );

}



{/*  
    //    return (
    //        if( index%3==0)
    //           <div {class="row"}>

    //        else if (index%3==2)
    //         </div>
  
    //        <Card>

    //    )  

    //    <div className="card-list">
    //         {props.plans.map((plan, i) => <Card plan={plan} key={i} />)}
    //     </div>
  */}

   

export default CardList;
