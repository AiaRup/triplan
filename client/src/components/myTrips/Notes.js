import React, { Component } from 'react'
import InlineEdit from 'react-inline-editing';
import { observer, inject } from 'mobx-react';

inject('store')
const View = (props) => {
  console.log(props.text, props.index);

  return (
    <InlineEdit text={props.text}
      onFocusOut={(data) => {
        this.props.store.updateNotes(data, props.index);
      }}
    />
  )
}




@inject('store')
export default class Notes extends Component {

  state = {
    input: '',
    isAdd: false,
    notes: ''
  }

  handleOnChange = (e) => {
    this.setState({ input: e.target.value });
  }

  handleAddNote = (e) => {
    e.preventDefault();
    this.props.store.addNotes(this.state.input, this.props.index);
    this.setState({
      input: '',
      isAdd: true,
      notes: this.props.store.oneTrip.days[this.props.index].notes
    });
  }
  _handleFocus = (text) => {
    console.log('Focused with text: ' + text);
  }

  render() {
    console.log('txt input after adding: ', this.props.store.oneTrip.days[this.props.index].notes);

    return (
      <div>

        {!this.state.isAdd && <div >
          <input className="input-notes" onChange={this.handleOnChange} placeholder="...." value={this.state.input} />
          <button className="btn btn-danger" type="submit" onClick={this.handleAddNote}>Add Notes</button>
        </div>
        }

        {this.state.isAdd &&
          <div className="notes">
            <i className="fa fa-pencil" aria-hidden="true"> Edit Your Notes</i>
            <InlineEdit
              //  text="Add Notes"
              // text={this.state.input !== '' ? this.state.input : "Add Notes"}
              text={this.state.notes !== '' ? this.state.notes : "Add Notes"}
              onFocusOut={(data) => {
                this.props.store.updateNotes(data, this.props.index);
              }}
              onFocus={this._handleFocus}
            />
          </div>

        }

      </div>
    )
  }
}

