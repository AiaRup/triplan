import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Day from './Day';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import './oneTrip.css';
import DayMapView from './DayMapView';
import InputWithIcon from './notes/inputField';
import axios from 'axios';

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
      activeTab: '1',
      notes: this.props.plan.notes
    };
  }

  handleNotesChange = (noteType, action, i, text) => {
    const notes = this.props.plan.notes;
    if (action === 'delete') {
      notes[noteType].splice(i, 1);
    }
    else if (action === 'add') {
      notes[noteType].push(text);
    } else if (action === 'update') {
      notes[noteType][i] = text;
    }

    // update notes on server
    axios.post(`/api/users/users/${this.props.store.user_id}/${this.props.plan._id}/notes`, { notes })
      .then((response) => {
        console.log('res notes from server', response);
        const newPlanFromServer = response.data.filter((plan) => plan._id === this.props.plan._id);
        console.log('newplanfromserver', newPlanFromServer);

        // const planToUpdate = response.filter((plan) => plan._id === this.props.plan._id);
        this.setState({ notes: newPlanFromServer[0].notes }, () => this.props.store.updatePlanInStore(newPlanFromServer[0]));
      })
      .catch((error) => {
        console.log(error);
      });
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
    const notes = this.state.notes;
    let sortDays = days.slice().sort((a, b) => {
      a = a.date.split('/').reverse().join('');
      b = b.date.split('/').reverse().join('');
      return a > b ? 1 : a < b ? -1 : 0;
    });

    return (
      <div className="container-trip">
        <div className="trip-header">
          {/* <h1> Name Trip: {name}</h1> */}

          <h1 className="line-on-sides">{name[0].toUpperCase() + name.slice(1)}</h1>
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
          <NavItem className="tab-in-one-trip">
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              NOTES
            </NavLink>
          </NavItem>
          <NavItem className="days-of-trip" disabled>
            <NavLink>
              {days.length === 1 ? <span>1 Day in {city}</span> : <span>{days.length} Days in {city}</span>}
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <div className="timeline">
                  {sortDays.map((day, i) =>
                    <Day day={day} index={i} key={i} />
                  )}
                </div>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            {sortDays.map((day, i) =>
              <DayMapView day={day} index={i} key={i} city={city} />
            )}
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col md="12" lg="4">
                <InputWithIcon icon="Satisfied" inputLabel="What Did You Enjoy?" notes={notes.good} noteType="good" handleNotesChange={this.handleNotesChange} color='#EBC2C0' />
              </Col>
              <Col md="12" lg="4">
                <InputWithIcon icon="NotSatisfied" inputLabel="What Went Wrong?" notes={notes.bad} noteType="bad" handleNotesChange={this.handleNotesChange} color='#EBD7C0' />
              </Col>
              <Col md="12" lg="4">
                <InputWithIcon icon="NoteIcon" inputLabel="Other Thoughts?" notes={notes.neutral} noteType="neutral" handleNotesChange={this.handleNotesChange} color='#9E9E9E' />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

