import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Input, InputLabel, FormControl, Grid } from '@material-ui/core';
import Satisfied from '@material-ui/icons/SentimentVerySatisfiedOutlined';
import NotSatisfied from '@material-ui/icons/SentimentDissatisfiedOutlined';
import NoteIcon from '@material-ui/icons/NoteAddOutlined';
import pink from '@material-ui/core/colors/pink';
import Note from './Note';
import './notes.css';

const styles = theme => ({
  container: {
    margin: theme.spacing.unit,
    color: 'rgba(0, 0, 0, 0.26)',
    transition: 'color 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  cssLabel: {
    '&$cssFocused': {
      color: pink['A400'],
    },
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: pink['A400'],
    },
  },
});

class InputWithIcon extends Component {
  constructor(props) {
    super(props);
    this.state = { value: props.inputLabel };
    this.classes = props.classes;
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
    console.log('in change input', event.target.value);

  }

  handleSubmit = (event) => {
    if (event.keyCode == 13) {
      this.props.handleNotesChange(this.props.noteType, 'add', 0, this.state.value);
      console.log('in submit', this.state.value);
      this.setState({ value: '' });
      event.preventDefault();

    }
  }

  render() {
    return (
      <div>
        <div className={this.classes.container}>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              {this.props.icon === 'Satisfied' ? <Satisfied /> : (this.props.icon === 'NotSatisfied' ? <NotSatisfied/> : <NoteIcon id="icon-input-note"/>)}
            </Grid>
            <Grid item>
              <form onKeyDown={this.handleSubmit} >
                <FormControl>
                  <InputLabel
                    htmlFor="custom-css-input"
                    FormLabelClasses={{
                      root: this.classes.cssLabel,
                      focused: this.classes.cssFocused }} >
                    {this.props.inputLabel}
                  </InputLabel>
                  <Input
                    id={this.props.noteType}
                    classes={{
                      underline: this.classes.cssUnderline }}
                    onChange={this.handleChange}
                  />
                </FormControl>
              </form>
            </Grid>
          </Grid>
        </div>
        <div className="notes-container">
          {this.props.notes.map((note, i) => <Note key={i} note={note} index={i} handleNote={this.props.handleNotesChange} noteType={this.props.noteType} color={this.props.color}/>)}
        </div>
      </div>
    );
  }
}

InputWithIcon.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputWithIcon);