import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import Day from './Day'

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  display: flex;
  flex-direction: row;
  width: 500px;
  min-height: 210px;
  height: auto;
  flex-wrap: nowrap;
  overflow-x: auto;
`;

@inject(allStores => ({
  daysArray: allStores.store.daysArray,
  addDay: allStores.store.addDay
}))
@observer
class DayList extends Component {
  render() {
    return (
      <React.Fragment>
        <Container>
        <button onClick={this.props.addDay}>Add Day</button>
        <ul className="day-list">
            {this.props.daysArray.map((day, index) => <li key={day.id}><Day index={index} day={day}/></li>)}
          </ul> 
        </Container>
      </React.Fragment>
    );
  }
}

export default DayList;