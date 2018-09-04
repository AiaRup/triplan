import React, { Component } from 'react';
// import '../node_modules/font-awesome/css/font-awesome.min.css';
import './About.css'

class about extends Component {
    render() {
        return ( 

         <div className='about-page'> 

        <div className= 'about-head'>

        </div>

        <div className='about-body'>

                
                {/* <h1 className='h1-about'> ABOUT TRIPLAN </h1> */}

                    <p className="p-about">

            Triplan is a fun and easy-to-use trip planner, for organised people who want to make 
            the most of their time abroad and dont leave the success of their vacation to chance!
               
            Thanks to the interactive map, you can build personalized and time-optimized daily pathes, 
            made of your favorite attractions, restaurants and events in the city!

            Enter your city, click on the places you would like to visit, make them appear appear in the table 
            below the map, drag'n drop it in the schedule, save and enjoy your trip!
                   </p>
        </div >
          <div className="team-body">
            <h1 className='h1-team' > TEAM </h1>
            
                 <div className="container">
                    <div className="row">
                        <div className="col-md-3"> 
                           <div className='tm_pic_dror'> </div>
                           <div className='tm_name'> Dror Dvash  </div>
                           <div className='icons'>
                           <a className="linkedinIcon">
                             <i className="fa fa-linkedin"></i>
                           </a>  
                           <a className="gitIcon" href="https://github.com/dvash999" > 
                             <i className="fa fa-github"></i>
                           </a>  
                           </div>
                           <div className='intro'> </div>
                        </div>
                        <div className="col-md-3">
                           <div className='tm_pic_hodaya'></div>
                           <div className='tm_name'> Hodaya Pirian </div>
                           <div className='icons'>
                           <a className="linkedinIcon">
                             <i className="fa fa-linkedin"></i>
                            </a>
                            <a className="gitIcon" href="https://github.com/hodaya55" > 
                             <i className="fa fa-github"></i>
                            </a> 
                            </div>
                           <div className='intro'> </div>
                        </div>
                        <div className="col-md-3">
                           <div className='tm_pic_aia'></div>
                           <div className='tm_name'> Aia Rupsom </div>
                           <div className='icons'>
                           <a className="linkedinIcon">
                             <i className="fa fa-linkedin"></i>
                            </a>
                            <a className="gitIcon" href="https://github.com/AiaRup" > 
                             <i className="fa fa-github"></i>
                             </a>
                           </div>
                           <div className='intro'>    </div>              
                        </div>
                        <div className="col-md-3">
                           <div className='tm_pic_carl'></div>
                           <div className='tm_name'>  Carl Wanunu </div>
                           <div className='icons'>
                             <a className="linkedinIcon" >
                               <i className="fa fa-linkedin"></i>
                             </a>
                             <a className="gitIcon" href="https://github.com/CarlWnn" > 
                               <i className="fa fa-github"></i>
                             </a> 
                            </div>
                           <div className='intro'>
                             {/* bachelor in math, enjoy soccer on the beach and good conversations */}
                          </div>
                        </div>
                    </div>
                  </div>
              </div>
            </div>
        );
    }
}
export default about;