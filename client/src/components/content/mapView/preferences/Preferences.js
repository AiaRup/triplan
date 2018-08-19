import React, { Component } from 'react';
import './preferences.css'

class Checkbox extends Component {
  state = {
    isChecked: false,
  }

  toggleCheckboxChange = () => {
    this.setState(({ isChecked }) => ({ isChecked: !isChecked }));
    this.props.handleCheckboxChange(this.props.label);
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
            onChange={this.toggleCheckboxChange}
          />
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
  'Restaurants',
  'Museums',
  'Parks & Gardens',
];

export default class Preferences extends Component {
  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  }

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
  }

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();
    for (const checkbox of this.selectedCheckboxes) {
      console.log(checkbox, 'is selected.');
    }
    console.log('------');
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="formSelector">
            <form onSubmit={this.handleFormSubmit}>
              {items.map(label =>
                <Checkbox
                  label={label}
                  handleCheckboxChange={this.toggleCheckbox}
                  key={label}
                />
              )}
              <button className="btn btn-outline-secondary" type="submit">Find</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
