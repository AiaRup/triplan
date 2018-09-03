import React, { Component } from 'react'
import InlineEdit from 'react-inline-editing';
import { observer, inject } from 'mobx-react';


const View = (props) => {
  console.log('note', props.note);
  const edit = () => {
    console.log('click edit');
  }
  return (
    <div className="note">
      <i className="fa fa-pencil" aria-hidden="true" onClick={edit}></i>
      <InlineEdit
        text={props.note} onFocusOut={(data) => {
          props.updateNotes(data, props.indexN);
        }} onFocus={this._handleFocus} />
      {/* <p >{props.note}</p> */}
    </div>

  );
}


class FormNotes extends Component {
  // console.log(props.text, props.index);
  state = {
    input: ''
  }
  inputChange = (e) => {
    this.setState({ input: e.target.value });
  }
  addNotes = (e) => {
    e.preventDefault();
    this.props.addNotes(this.state.input);
    this.setState({ input: '' });
  }
  render() {
    return (
      <form className="form" onSubmit={this.addNotes} >
        <input className="input-form" type="text" placeholder="....."
          // required
          onChange={this.inputChange} value={this.state.input} />
        <button type="submit" className="btn btn-primary btn-sm">Add Notes</button>
      </form>);
  }
}




@inject('store')
@observer
export default class Notes extends Component {
  state = {
    input: '',
    notes: []
  }

  addNotes = (input) => {
    let notes = this.state.notes;
    this.setState({ notes: notes.concat(input) });
  }
  updateNotes = (newNote, indexNote) => {
    console.log(newNote, indexNote);

  }
  render() {
    // console.log('txt input after adding: ', this.props.store.oneTrip.days[this.props.index].notes);
    return (
      <div>
        <FormNotes addNotes={this.addNotes} />
        <ul>
          {this.state.notes.map((note, i) =>
            <View note={note} indexN={i} key={i} updateNotes={this.updateNotes} />
          )}
        </ul>
      </div>
    )
  }
}

