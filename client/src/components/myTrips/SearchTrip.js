import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import { Input, InputLabel, FormControl } from '@material-ui/core';
// import TextField from '@material-ui/core/TextField';
import Search from '@material-ui/icons/Search';

const styles = theme => ({
  container: {
    margin: '40px',
    color: 'rgba(0, 0, 0, 0.26)',
    transition: 'color 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
    textAlign: 'center',
    marginLeft: '8px',
  },
  textField: {
    color: pink['A400'],
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 650,
    '&$cssFocused': {
      color: pink['A400'],
    },
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

const SearchTrip = (props) => {

  const handleSearch = (event) => {
    props.searchTrips(event.target.value);
  };

  return (
    <div className={props.classes.container}>

      <Search />
      {/* <TextField
        id="standard-name"
        label="Search Trips..."
        className={props.classes.textField}
        onChange={handleSearch}
        margin="normal"/> */}

      <FormControl className={props.classes.textField}>
        <InputLabel
          htmlFor="custom-css-input"
          FormLabelClasses={{
            root: props.classes.cssLabel,
            focused: props.classes.cssFocused
          }} >
          Search Trips...
          </InputLabel>
        <Input
          id="trip-search-input"
          classes={{
            underline: props.classes.cssUnderline
          }}
          onChange={handleSearch} />
      </FormControl>

    </div>
  );

};

export default withStyles(styles)(SearchTrip);