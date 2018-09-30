import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import DayMapView from './DayMapView';
import classnames from 'classnames';
import Day from './Day';
import './oneTrip.css';

//for email
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import nodemailer from 'nodemailer';



@inject('store')
@observer
export default class OneTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',

      //for email
      open: false,
      email: ''
    };
  }
  
  printTrip = () => {
    window.print()
};

  //!! for email
//   handleClickOpen = () => {
//     this.setState({ open: true });
//   };

//   handleClose = () => {
//     this.setState({ open: false });
//   };

//   enterEmail = (e) => {
//     this.setState({ email: e.target.value })
//   }

//   sendAndClose = (e) => {
//     e.preventDefualt()
//     console.log(this.state.email)
//     const tripArr = [];
//     const daysArray = this.props.plan.days;

//     daysArray.map((dayTrip, i) => {

//       daysArray[i].places.map(place => {
//         const day = {};
//         day.date = daysArray[i].date;
//         day.name = place.name;
//         day.address = place.address;
//         day.category = place.category;

//         tripArr.push(day);
//     });
//   });
//   console.log('tripArr', tripArr)

//     this.setState({ open: false });
// };


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
      
          <h1 className="line-on-sides">{name[0].toUpperCase() + name.slice(1)}</h1>

          <button onClick={window.print} className='print-email-btn'>Print Trip</button>
          {/* <button onClick={this.handleClickOpen} className='print-email-btn'>Email Trip</button> */}

        </div>

        <div className="email-modal">
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
          {/* <form action="send" method="POST"> */}
            <DialogTitle id="form-dialog-title">Send Trip plan</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter An Email To Get The Trip Info
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                onChange={this.enterEmail}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" onClick={()=>this.sendAndClose(this.state.email)} color="primary">
                Send Trip!
              </Button>
            </DialogActions>
            {/* </form> */}
          </Dialog>
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

