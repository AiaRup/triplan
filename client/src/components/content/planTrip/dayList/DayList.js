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
  min-width: 500px;
  min-height: 210px;
  height: auto;
  width: auto;
  flex-wrap: nowrap;
  overflow-x: auto;
`;

const Wrapper = styled.div`
margin: 8px;
border: 1px solid lightgrey;
border-radius: 2px;
width: auto;
height: auto;

`;

@inject(allStores => ({
  daysArray: allStores.store.daysArray,
  addDay: allStores.store.addDay
}))
@observer
class DayList extends Component {
  render() {
    return (
      <Wrapper>
        <button onClick={this.props.addDay}>Add Day</button>
        <Container>
        
        <ul className="day-list">
            {this.props.daysArray.map((day, index) => <li key={day.id}><Day index={index} day={day}/></li>)}
          </ul> 
        </Container>
      </Wrapper>
    );
  }
}

export default DayList;