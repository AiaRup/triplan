import React, { Component } from 'react'

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.address = props.address;
  }
  render() {
    console.log('in render map');
    console.log(this.props.address);

    const address = this.props.address;
    return (
      <div style={{
        background: 'antiquewhite',
        height: '250px'
      }}>
        map will be here
        {this.props.children}
        {/* {this.address} */}
        {/* {address} */}
      </div>
    )
  }
}

