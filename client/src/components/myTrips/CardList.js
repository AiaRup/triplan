import React from 'react';
import Card from './Card';

const CardList = (props)=> {
    
  //  let test= props.plan_names;
  //  console.log(test)
 
 return (
      
     
     <div className = "card-list">

       {/* {test.map( */}
    {/* (one_name,index) => <Card key={index} name={one_name} /> )} */}
 
 

    {props.plan_names.map(
    (one_name,index) => <Card key={index} name={one_name} />  
    )}  

    </div>

 );

}



    //   {props.plans.map( (plan, index) =>
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
 

   

export default CardList;
