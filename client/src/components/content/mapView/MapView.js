import React, { Component } from 'react'
import Map from './map/Map';
import Location from './location/Location';
import Preferences from './preferences/Preferences';

export default class MapView extends Component {
  state = {
    address: {
      lat: '', lng: ''
    }
  }
  // address = {
  //   lat: '', lng: ''
  // }
  updateAddress = (address) => {
    console.log(address);
    this.setState({ address: address });
    // this.address = address;
  }
  render() {
    return (
      <div style={{ width: '100%' }}>
        <Location updateAddress={this.updateAddress} />
        {/* <Map address={this.address} /> */}
        <Map address={this.state.address} />
        <Preferences />
      </div>
    )
  }
}

// Dror:
// import React, { Component } from 'react';
// import styled from 'styled-components';

// const Container = styled.div`
//   margin: 8px;
//   border-radius: 2px;
//   display: flex;

// `;

// class MapView extends Component {
//   render() {
//     return (
//       <React.Fragment>
//         <Container>

//         </Container>
//       </React.Fragment>
//     );
//   }
// }

// export default MapView;
