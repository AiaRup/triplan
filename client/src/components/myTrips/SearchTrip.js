import React from 'react';

const SearchTrip = (props) => {
  const handleSearch = (event) => {
    props.searchTrips(event.target.value);
  };

  return (
    <div className="row-search" style={{ textAlign: 'center' }}>
      <span style={{
        width: '100%',
        textAlign: 'center'
      }}>
        <i className="fa fa-search" style={{ color: 'gray' }} aria-hidden="true"></i>
        <input className="search-bar" type="text" onKeyUp={handleSearch} placeholder="Search Trips..." />
      </span>
    </div>
  );

};

export default SearchTrip;