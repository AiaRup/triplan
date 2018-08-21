import React, { Component } from 'react';
import { inject } from 'mobx-react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;


@inject(allStores => ({
  deleteEvent: allStores.store.deleteEvent}))
class TheEvent extends Component {
  render() {
    return (
      <React.Fragment>
        <Container>
        <button onClick={()=>this.props.deleteEvent(this.props.index)}>X</button>
        {this.props.theEvent.name}
        </Container>
      </React.Fragment>
    );
  }
}

export default TheEvent;