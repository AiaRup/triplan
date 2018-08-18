import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Droppable } from 'react-beautiful-dnd';
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

const PlaceListUL = styled.ul`
`;




@inject(allStores => ({
  placesArray: allStores.store.placesArray}))


//!!need to be seperated for the DND to work!
  @observer class DragNdrop extends Component {

    render() {
      return (
          <PlaceListUL 
          innerRef={this.props.provided.innerRef}
          {...this.props.provided.droppableProps} 
        >
          {this.props.placesArray.map((place, index) => <Place key={place.id} index={index} thePlace={place}/>)}
          {this.props.provided.placeholder}
        </PlaceListUL>
        
      )}
    }


@observer
class PlaceList extends Component {
 
  render() {

    return (
      <React.Fragment>
        <Container>
          <h5>Places</h5>
          <Droppable droppableId="placesContainer">
           {provided => (
             <DragNdrop provided={provided}/>
          )}
          </Droppable>
        </Container>
      </React.Fragment>
    );
  }
}

export default PlaceList;