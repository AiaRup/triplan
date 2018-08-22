import React, { Component } from 'react';
import PlanTrip from './planTrip/PlanTrip';
import MapView from './mapView/MapView';
import styled from 'styled-components';


const Container = styled.div`
  display: flex;
  flex: wrap;
  flex flow: row;
  justify-content: space-around;
`;

const PlanTripContainer = styled.div`
  display: flex;
  height: 80vh;
  width: 50%;
  border: 1px solid lightgrey;
`;

const MapViewContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 80vh;
  width: 50%;
  border: 1px solid lightgrey;
`;

class Content extends Component {
  render() {
    return (
      <React.Fragment>

        <Container>

          <MapViewContainer>
            <MapView />
          </MapViewContainer>

          <PlanTripContainer>
            <PlanTrip />
          </PlanTripContainer>

        </Container>

      </React.Fragment>
    );
  }
}

export default Content;
