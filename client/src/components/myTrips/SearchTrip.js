import React from 'react'

const SearchTrip = (props) => {
  const handleSearch = (event) => {
    props.searchTrips(event.target.value)
  }

  return (
    <div className="row">
      <input className="search-bar" type="text" onKeyUp={handleSearch} placeholder="Search Trips..." />
    </div>
  );

}

export default SearchTrip;