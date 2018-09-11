import React, { Component } from 'react';
import './preferences.css';
import { Collapse } from 'react-collapse';
import Checkbox from './Checkbox';
import { Loading } from '../../Loading';
import { observer, inject } from 'mobx-react';

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

@inject(allStores => ({
  loading: allStores.store.loading,
  isOpenPrefernces: allStores.store.isOpenPrefernces,
  togglePrefernces: allStores.store.togglePrefernces
}))
@observer
export default class Preferences extends Component {
  constructor() {
    super();
    this.state = {
      selectedCheckboxes: items,
    };
  }

  toggleCheckbox = (index, check) => {
    let newarray = this.state.selectedCheckboxes.map((e, i) => {
      if (i === index) {
        e.checked = check;
        return e;
      }
      return e;
    });
    this.setState({ selectedCheckboxes: newarray });
  }

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();
    let select = this.state.selectedCheckboxes.filter((e) => e.checked);
    this.props.updatePlacesNear(select);
    // this.collapseToggle();
  }

  handleClear = (e) => {
    let newarray = this.state.selectedCheckboxes.map((e) => {
      e.checked = false;
      return e;
    });

    this.setState({ selectedCheckboxes: newarray });
    // clear places array in order to remove markers on map
    this.props.updatePlacesNear([]);
  }


  render() {
    return (
      <div className="formSelector">
        <p className="header-preference" onClick={() => this.props.togglePrefernces()}>Find Activity &raquo;</p>
        <Collapse isOpened={this.props.isOpenPrefernces}>
          <form onSubmit={this.handleFormSubmit} >
            {this.state.selectedCheckboxes.map((box, index) =>
              <Checkbox
                index={index}
                checked={box.checked}
                label={box.label}
                toggleCheckbox={this.toggleCheckbox}
                key={box.label} />
            )}
            <div className="pref-buttons">
              <button className="btn btn-sm btn-outline-secondary" type="submit">Find</button>
              <button className="btn btn-sm btn-secondary" type="button"
                onClick={this.handleClear}>Clear</button>
            </div>
          </form>
          {this.props.loading && <Loading loading={this.props.loading} />}
        </Collapse>
      </div>
    );
  }
}
