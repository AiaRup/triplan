import React, { Component } from 'react';
import InlineEdit from 'react-inline-editing';
import { observer, inject } from 'mobx-react';
import pin from './pin.png';

const View = (props) => {
  console.log('note', props.note);
  const edit = () => {
    console.log('click edit');
  };
  return (
    <div className="note">
      <i className="fa fa-pencil pencil-notes" aria-hidden="true" onClick={edit}></i>
      <InlineEdit
        text={props.note} onFocusOut={(data) => {
          props.updateNotes(data, props.indexN);
        }} onFocus={this._handleFocus} inputClassName="editNote-input"/>
      {/* <p >{props.note}</p> */}
    </div>

  );
};


class FormNotes extends Component {
  // console.log(props.text, props.index);
  state = {
    input: ''
  }
  inputChange = (e) => {
    this.setState({ input: e.target.value });
  }
  addNotes = (e) => {
    // e.preventDefault();
    if (e.key === 'Enter') {
      this.props.addNotes(this.state.input);
      this.setState({ input: '' });
    }

  }
  render() {
    return (
      <input className="form-control" type="text" placeholder="Add Notes..."
        required
        style={{ width: '95%', marginBottom: '20px' }}
        onKeyPress={this.addNotes}
        onChange={this.inputChange} value={this.state.input} />
    );
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
        {/* <img src={pin} alt="pin icon" className="pin-note" /> */}
        <FormNotes addNotes={this.addNotes} />
        <ul>
          {this.state.notes.map((note, i) =>
            <View note={note} indexN={i} key={i} updateNotes={this.updateNotes} />
          )}
        </ul>
      </div>
    );
  }
}



//   <form className="form" onSubmit={this.addNotes} >
//     <input className="input-form" type="text" placeholder="....."
//       // required
//       onChange={this.inputChange} value={this.state.input} />
//     <button type="submit" className="btn btn-primary btn-sm">Add Notes</button>
// </form>