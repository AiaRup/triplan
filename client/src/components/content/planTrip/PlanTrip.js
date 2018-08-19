import React, { Component } from 'react';
import DayList from './dayList/DayList';
import styled from 'styled-components';
import PlaceList from './placeList/PlaceList';
import EventList from './EventList/EventList';

const Container = styled.div`
  margin: 8px;
  border-radius: 2px;

`;

const Wrapper = styled.div`
margin: 8px;
border-radius: 2px;
display: flex;
flex-direction: row;

`;

class PlanTrip extends Component {
  render() {
    return (
      <React.Fragment>
        <Container>

          <Wrapper>
            <PlaceList/>
            <EventList/>
          </Wrapper>

          <DayList/>

        </Container>
      </React.Fragment>
    );
  }
}

export default PlanTrip;