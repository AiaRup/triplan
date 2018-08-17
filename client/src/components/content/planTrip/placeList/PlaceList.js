import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import Place from './place/Place';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  height: auto;
  min-height: 200px;
  display: flex;
  flex-direction: column;
`;

@inject(allStores => ({
  placesArray: allStores.store.placesArray}))
@observer
class PlaceList extends Component {
  render() {
    
    return (
      <React.Fragment>
        <Container>
          <h5>Places</h5>
          <ul>
            {this.props.placesArray.map((place, index) => <li key={index}><Place index={index} thePlace={place}/></li>)}
          </ul>
        </Container>
      </React.Fragment>
    );
  }
}

export default PlaceList;