import React, { Component } from 'react';
import './preferences.css';
import _ from 'lodash';
import { Collapse } from 'react-collapse';
// import _ from 'lodash';
import Checkbox from './Checkbox';

const items = [
  { label: 'Restaurants', type: 'restaurant', icon: 'restaurant.png', checked: false },
  { label: 'Museums', type: 'museum', icon: 'museum.png', checked: false },
  { label: 'Movie theaters', type: 'movie_theater', icon: 'cinema.png', checked: false },
  { label: 'Lodging & Hotels', type: 'lodging', icon: 'lodging.png', checked: false },
  { label: 'Parks', type: 'park', icon: 'forest.png', checked: false },
  { label: 'Night clubs', type: 'night_club', icon: 'bar.png', checked: false },
  { label: 'Amusement parks', type: 'amusement_park', icon: 'themepark.png', checked: false },
  { label: 'Aquariums', type: 'aquarium', icon: 'dolphins.png', checked: false },
  { label: 'Art galleries', type: 'art_gallery', icon: 'artgallery.png', checked: false },
  { label: 'Cafes', type: 'cafe', icon: 'coffee.png', checked: false },
  { label: 'Zoo', type: 'zoo', icon: 'tiger.png', checked: false },
  { label: 'Synagogue', type: 'synagogue', icon: 'synagogue.png', checked: false },
  { label: 'Stadium', type: 'stadium', icon: 'stadium.png', checked: false },
  { label: 'Shopping malls', type: 'shopping_mall', icon: 'mall.png', checked: false },
  { label: 'Casino', type: 'casino', icon: 'casino.png', checked: false }
];

export default class Preferences extends Component {
  constructor() {
    super();
    this.state =  {toggledCollapse: false,
                  selectedCheckboxes: items,};
  }
  
  toggleCheckbox = (index, check) => {
    console.log('in toggle father');
    console.log(" checked? ", check);

    let newarray = this.state.selectedCheckboxes.map((e, i) => {
      if (i === index) {
        e.checked = check;
        return e;
      }
      return e;
    })

    this.setState({ selectedCheckboxes: newarray });

  }

  // componentWillMount = () => {
  //   this.selectedCheckboxes = [];
  //   this.setState({ selectedCheckboxes: newarray });
  // }


  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();
    let select = this.state.selectedCheckboxes.filter((e) => e.checked);
    // console.log('submit: ', select);
    this.props.updatePlacesNear(select);
  }

  handleClear = (e) => {
    let newarray = this.state.selectedCheckboxes.map((e) => {
      e.checked = false;
      return e;
    })

    this.setState({ selectedCheckboxes: newarray });
    // clear places array in order to remove markers on map
    this.props.updatePlacesNear([]);
  }

  collapseToggle = () => {
    this.setState(prevState => ({
      toggledCollapse: !prevState.toggledCollapse
    }));
  };

  render() {
    const toggleCollapse = false;
    return (
      <div className="container">
        <div className="row">
          <div className="formSelector">


            {/* <h5 onClick={()=>this.collapseToggle(toggleCollapse)}>Find Activity &raquo;</h5>
            <Collapse isOpened={this.state.toggledCollapse}>
              <form onSubmit={this.handleFormSubmit}>
                {items.map(box =>
                  <Checkbox
                    label={box.label}
                    type={box.type}
                    handleCheckboxChange={this.toggleCheckbox}
                    key={box.label}/>
                )}
                <button className="btn btn-sm btn-outline-secondary" type="submit">Find</button>
              </form>
            </Collapse> */}


            <h5 onClick={()=>this.collapseToggle(toggleCollapse)}>Find Activity &raquo;</h5>
            <Collapse isOpened={this.state.toggledCollapse}>
            <form onSubmit={this.handleFormSubmit}>
              {this.state.selectedCheckboxes.map((box, index) =>
                <Checkbox
                  index={index}
                  checked={box.checked}
                  label={box.label}
                  toggleCheckbox={this.toggleCheckbox}
                  key={box.label} />
              )}
              <button className="btn btn-sm btn-outline-secondary" type="submit">Find</button>
              <button className="btn btn-sm btn-outline-secondary" type="button"
                onClick={this.handleClear}>Clear</button>
            </form>
            </Collapse>
          </div>
        </div>
      </div>
    );
  }
}
