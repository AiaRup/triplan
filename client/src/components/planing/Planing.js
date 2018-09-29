import React, { Component } from 'react';
import PlanTrip from './planTrip/PlanTrip';
import SearchActivity from './searchActivity/SearchActivity';
// import _ from 'lodash';
import TempEventList from './searchEvents/SearchEvents';
import { observer, inject } from 'mobx-react';
import './planing.css';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Tabs, Tab, Typography, Button } from '@material-ui/core';
// import SwipeableViews from 'react-swipeable-views';

import MarkerIcon from '@material-ui/icons/Place';
import EventIcon from '@material-ui/icons/Event';
import ScheduleIcon from '@material-ui/icons/Schedule';
import RestartIcon from '@material-ui/icons/Refresh';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  root: {
    flexGrow: 1,
    marginTop: 50
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  }
});


const TabContainer = (props) => {
  const { children, dir } = props;

  return (
    <Typography component="div" dir={dir} style={{ padding: 15 * 3 }}>
      {children}
    </Typography>
  );
};

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

@inject(allStores => ({
  togglePrefernces: allStores.store.togglePrefernces,
  restStoreTrip: allStores.store.restStoreTrip,
  tripName: allStores.store.tripName,
  saveTripName: allStores.store.saveTripName,
  saveAddress: allStores.store.saveAddress,
  // address: allStores.store.address,
}))
@observer
class Planing extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  resetTrip = () => {
    this.props.restStoreTrip();
  }


  render() {
    const { classes, theme } = this.props;
    const { value } = this.state;
    return (
      <React.Fragment>

        <Paper className={classes.root} elevation={0} >
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            centered
          >
            <Tab label="Find Attractions" icon={<MarkerIcon />} style={{ borderRight: '1px solid light #eee' }} className={classes.tabStyle} />
            <Tab label="Find Events" icon={<EventIcon />} className={`${classes.tabStyle} ${classes.tabsMargin}`} />
            <Tab label="Plan Your Trip" icon={<ScheduleIcon />} className={`${classes.planTripTab} ${classes.tabStyle}`} />
          </Tabs>
          {/* <SwipeableViews
             axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
             index={this.state.value}
           onChangeIndex={this.handleChangeIndex}
           > */}

          {value === 0 && <TabContainer dir={theme.direction}>
            <div className='map-event-container'>
              <div className='map-view-container'>
                <SearchActivity />
              </div>
            </div>
          </TabContainer>
          }
          {value === 1 && <TabContainer dir={theme.direction}>
            <TempEventList />
          </TabContainer>
          }
          {value === 2 && <TabContainer dir={theme.direction}>
            <PlanTrip />
          </TabContainer>
          }
          {/* </SwipeableViews> */}

        </Paper>

        <Button variant="contained" color="default" className={classes.button} onClick={this.resetTrip}>
          Reset Trip <RestartIcon className={classes.rightIcon} />
        </Button>

      </React.Fragment>
    );
  }
}

Planing.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Planing);

