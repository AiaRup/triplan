import React, { Component } from 'react';
import { inject } from 'mobx-react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;

@inject(allStores => ({
  deletePlace: allStores.store.deletePlace}))
class Place extends Component {
  render() {
    return (
      <React.Fragment>
        <Container>
        <button onClick={()=>this.props.deletePlace(this.props.index)}>X</button>
          {this.props.thePlace.name}
        </Container>
      </React.Fragment>
    );
  }
}

export default Place;