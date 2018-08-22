import React, { Component } from 'react';
import './preferences.css';
import _ from 'lodash';


class Checkbox extends Component {
  state = {
    isChecked: false,
  }

  toggleCheckboxChange = () => {
    this.setState(({ isChecked }) => ({ isChecked: !isChecked }));
    this.props.handleCheckboxChange(this.props.label, this.props.type, this.props.icon);
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
  { label: 'Restaurants', type: 'restaurant', icon: 'restaurant.png' },
  { label: 'Museums', type: 'museum', icon: 'museum.png' },
  { label: 'Movie theaters', type: 'movie_theater', icon: 'cinema.png' },
  { label: 'Lodging & Hotels', type: 'lodging', icon: 'lodging.png' },
  { label: 'Parks', type: 'park', icon: 'forest.png' },
  { label: 'Night clubs', type: 'night_club', icon: 'bar.png' },
  { label: 'Amusement parks', type: 'amusement_park', icon: 'themepark.png' },
  { label: 'Aquariums', type: 'aquarium', icon: 'dolphins.png' },
  { label: 'Art galleries', type: 'art_gallery', icon: 'artgallery.png' },
  { label: 'Cafes', type: 'cafe', icon: 'coffee.png' },
  { label: 'Zoo', type: 'zoo', icon: 'tiger.png' },
  { label: 'Synagogue', type: 'synagogue', icon: 'synagogue.png' },
  { label: 'Stadium', type: 'stadium', icon: 'stadium.png' },
  { label: 'Shopping malls', type: 'shopping_mall', icon: 'mall.png' },
  { label: 'Casino', type: 'casino', icon: 'casino.png' }
];

export default class Preferences extends Component {
  componentWillMount = () => {
    this.selectedCheckboxes = [];
  }

  toggleCheckbox = (label, type, icon) => {
    if (!_.find(this.selectedCheckboxes, { label: label })) {
      this.selectedCheckboxes.push({ label: label, type: type, icon: icon });
    }
    else {
      _.pullAllWith(this.selectedCheckboxes, [{ label: label, type: type, icon: icon }], _.isEqual);
    }
  }

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();
    this.props.updatePlacesNear(this.selectedCheckboxes);
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
                  icon={box.icon}
                  type={box.type}
                  handleCheckboxChange={this.toggleCheckbox}
                  key={box.label}/>
              )}
              <button className="btn btn-sm btn-outline-secondary" type="submit">Find</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
