import React, { Component } from 'react';
import InlineEdit from 'react-inline-editing';
import DeleteIcon from '@material-ui/icons/DeleteRounded';



class Note extends Component {

  handleDelete = () => {
    this.props.handleNote(this.props.noteType, 'delete', this.props.index);
    console.log('delete button');
  }

  render() {
    return (
      <div className="one-note" style={{ backgroundColor: this.props.color }}>
        <i className="fa fa-pencil pencil-notes" aria-hidden="true"></i>
        <InlineEdit
          text={this.props.note} onFocusOut={(data) => {
            console.log('new note', data);
          }} onFocus={this._handleFocus} inputClassName="editNote-input"/>
        <span className="delete-note-icon">
          <DeleteIcon onClick={this.handleDelete}/>
        </span>
      </div>
    );
  }
}

export default Note;