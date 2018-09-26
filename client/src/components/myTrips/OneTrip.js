import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Day from './Day';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import './oneTrip.css';
import DayMapView from './DayMapView';

@inject('store')
@observer
export default class OneTrip extends Component {
  constructor(props) {
    super(props);


  //!!get all info from array of trips - make a class?
  // printTrip = () => {
  //   const daysArray = this.props.store.plansArray[0].days;
  //   // const details = {};
  //   const day = daysArray.map(day => day.date)

  //   const info = daysArray.map(day => {
  //     return day.places.map(place=>{
  //       return ([place.name, place.address])
  //     })
  //     })

  //   // console.log(JSON.stringify(daysArray))
  //   console.log(day , info)
  // }

  // render() {

  //   const divStyle = {
  //     padding: '5px',
  //     border: '1px solid lightgrey',
  //     backgroundColor: 'orange',
  //     display: 'flex',
  //     justifyContent: 'center' 
      
      
    this.state = {
      activeTab: '1'
    };
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    const { name, days, city } = this.props.plan;

    let sortDays = days.sort((a, b) => {
      let x = a.date;
      let y = b.date;
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
    return (
      <div className="container-trip">
        <div className="trip-header">
          {/* <h1> Name Trip: {name}</h1> */}
      
          {/* <h1 className="line-on-sides">{name[0].toUpperCase() + name.slice(1)}</h1> */}
        </div>
        <button type="button" onClick={this.printTrip}>Print Trip</button>
        {/* <button type="button" onClick={this.props.store.emailTrip}>Send Trip To Email</button> */}
        <div className="day-list-trip">
          {/* {days.map((day, i) => */}
          {sortDays.map((day, i) =>
            <Day day={day} index={i} key={i} />
          )}


          <h2 className="line-on-sides">{name[0].toUpperCase() + name.slice(1)}</h2>


        </div>
        <Nav tabs>
          <NavItem className="tab-in-one-trip">
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              TIMELINE
            </NavLink>
          </NavItem>
          <NavItem className="tab-in-one-trip">
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              MAPS
            </NavLink>
          </NavItem>
          <NavItem className="days-of-trip" disabled>
            <NavLink>
              {days.length === 1? <span>1 Day in {city}</span> : <span>{days.length} Days in {city}</span>}
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <div className="timeline">
                  {sortDays.map((day, i) =>
                    <Day day={day} index={i} key={i}/>
                  )}
                </div>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            {/* <Row> */}
              {/* <Col sm="12"> */}
                {sortDays.map((day, i) =>
                  <DayMapView day={day} index={i} key={i} city={city} />
                )}

              {/* </Col> */}
            {/* </Row> */}
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

