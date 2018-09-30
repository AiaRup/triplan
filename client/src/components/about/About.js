import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className='about-page'>
      <div className='about-body'>
        <p className="p-about">
          Triplan is a fun and easy-to-use trip planner, for organised people who want to make
          the most of their time abroad and don't leave the success of their vacation to chance!
        </p>
        <p className="p-about">
          Thanks to the interactive map, you can build personalized and time-optimized daily pathes,
          made of your favorite attractions, restaurants and events in the city!
        </p>
        <p className="p-about">
          Enter your city, choose what kind of places you would like to visit, add the attractions to the planner board and drag & drop it according to your trip schedule, save and enjoy your trip!
        </p>
      </div >
      <div className="team-body">
        <h1 className='h1-team line-on-sides' > TEAM </h1>

        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className='tm_pic_dror'> </div>
              <div className='tm_name'> Dror Dvash  </div>
              <div className='icons'>
                <a className="linkedinIcon" href="https://www.linkedin.com/in/dror-dvash/" target="_blank" rel='noreferrer noopener'>
                  <i className="fa fa-linkedin"></i>
                </a>
                <a className="gitIcon" href="https://github.com/dvash999" target="_blank" rel='noreferrer noopener'>
                  <i className="fa fa-github"></i>
                </a>
              </div>
              <div className='intro-member-member-member'> </div>
            </div>
            <div className="col-md-3">
              <div className='tm_pic_hodaya'></div>
              <div className='tm_name'> Hodaya Pirian </div>
              <div className='icons'>
                <a className="linkedinIcon" href="https://www.linkedin.com/in/hodaya-p/" target="_blank" rel='noreferrer noopener'>
                  <i className="fa fa-linkedin"></i>
                </a>
                <a className="gitIcon" href="https://github.com/hodaya55" target="_blank" rel='noreferrer noopener'>
                  <i className="fa fa-github"></i>
                </a>
              </div>
              <div className='intro-member-member'> </div>
            </div>
            <div className="col-md-3">
              <div className='tm_pic_aia'></div>
              <div className='tm_name'> Aia Rupsom </div>
              <div className='icons'>
                <a className="linkedinIcon" href="https://www.linkedin.com/in/aia-r-8a3881156/" target="_blank" rel='noreferrer noopener'>
                  <i className="fa fa-linkedin"></i>
                </a>
                <a className="gitIcon" href="https://github.com/AiaRup" target="_blank" rel='noreferrer noopener'>
                  <i className="fa fa-github"></i>
                </a>
              </div>
              <div className='intro-member-member'>    </div>
            </div>
            <div className="col-md-3">
              <div className='tm_pic_carl'></div>
              <div className='tm_name'>  Carl Wanunu </div>
              <div className='icons'>
                <a className="linkedinIcon" href="https://www.linkedin.com/in/carlwnn" target="_blank" rel='noreferrer noopener'>
                  <i className="fa fa-linkedin"></i>
                </a>
                <a className="gitIcon" href="https://github.com/CarlWnn" target="_blank" rel='noreferrer noopener'>
                  <i className="fa fa-github"></i>
                </a>
              </div>
              <div className='intro-member-member-member'>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
