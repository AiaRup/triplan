import React, { Component } from 'react';
import { inject } from 'mobx-react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  height: 190px;
  width:120px
`;

@inject(allStores => ({
  deleteDay: allStores.store.deleteDay}))
class Day extends Component {
  render() {

    
    return (
      <React.Fragment>
        <Container>
        <button onClick={()=>this.props.deleteDay(this.props.index)}>X</button>
          <h4>{this.props.day.name}</h4>
        </Container>
      </React.Fragment>
    );
  }
}

export default Day;