import React, { Component } from 'react';
import './preferences.css';
import _ from 'lodash';
import { Collapse } from 'react-collapse';

class Checkbox extends Component {
  state = {
    isChecked: false,
  }

  toggleCheckboxChange = () => {
    this.setState(({ isChecked }) => ({ isChecked: !isChecked }));
    this.props.handleCheckboxChange(this.props.label, this.props.type);
  }

  render() {
    const { label } = this.props;
    const { isChecked } = this.state;

    return (
      <div className="checkbox">
        <label>
          <input
            type="checkbox"
            value={label}
            checked={isChecked}
            onChange={this.toggleCheckboxChange}/>
          <span className="label">
            {label}
          </span>
        </label>
      </div>
    );
  }
}

/*=====================================================
preferences component
=======================================================*/

const items = [
  { label: 'Restaurants', type: 'restaurant' },
  { label: 'Museums', type: 'museum' },
  { label: 'Movie theaters', type: 'movie_theater' },
  { label: 'Lodging & Hotels', type: 'lodging' },
  { label: 'Parks', type: 'park' },
  { label: 'Night clubs', type: 'night_club' },
  { label: 'Amusement parks', type: 'amusement_park' },
  { label: 'Aquariums', type: 'aquarium' },
  { label: 'Art galleries', type: 'art_gallery' },
  { label: 'Cafes', type: 'cafe' },
  { label: 'Zoo', type: 'zoo' },
  { label: 'Synagogue', type: 'synagogue' },
  { label: 'Stadium', type: 'stadium' },
  { label: 'Shopping malls', type: 'shopping_mall' },
  { label: 'Casino', type: 'casino' }
];

export default class Preferences extends Component {

  constructor() {
    super();
    this.state =  {toggledCollapse: false};
  }

  componentWillMount = () => {
    this.selectedCheckboxes = [];
  }

  toggleCheckbox = (label, type) => {
    if (!_.find(this.selectedCheckboxes, { label: label })) {
      this.selectedCheckboxes.push({ label: label, type: type });
    }
    else {
      _.pullAllWith(this.selectedCheckboxes, [{ label: label, type: type }], _.isEqual);
    }
  }

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();
    this.props.updatePlacesNear(this.selectedCheckboxes);
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
            <h5 onClick={()=>this.collapseToggle(toggleCollapse)}>Find Activity &raquo;</h5>
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
            </Collapse>
          </div>
        </div>
      </div>
    );
  }
}
