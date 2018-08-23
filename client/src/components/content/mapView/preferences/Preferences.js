import React, { Component } from 'react';
import './preferences.css';
import _ from 'lodash';
import Checkbox from './Checkbox';

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

  handleClear = (e) => {

  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="formSelector">
            <form onSubmit={this.handleFormSubmit}>
              {items.map(box =>
                <Checkbox
                  label={box.label}
                  type={box.type}
                  handleCheckboxChange={this.toggleCheckbox}
                  key={box.label} />
              )}
              <button className="btn btn-sm btn-outline-secondary" type="submit">Find</button>
              <button className="btn btn-sm btn-outline-secondary" type="button"
                onClick={this.handleClear}>Clear</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
