import React, { Component } from 'react';

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
            onChange={this.toggleCheckboxChange} />
          <span className="label">
            {label}
          </span>
        </label>
      </div>
    );
  }
}

export default Checkbox