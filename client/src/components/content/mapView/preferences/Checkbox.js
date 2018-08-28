import React from 'react';

const Checkbox = (props) => {

  const onChange = (e) => {
    props.toggleCheckbox(props.index, e.target.checked);
  }

  return (
    <div className="checkbox">
      <label>
        <input
          type="checkbox"
          checked={props.checked}
          value={props.label}
          onChange={onChange} />
        <span className="label">
          {props.label}
        </span>
      </label>
    </div>
  );

}

export default Checkbox;