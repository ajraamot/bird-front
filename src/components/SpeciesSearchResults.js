import React from 'react';
import PropTypes from 'prop-types';

const SpeciesSearchResults = (props) => {
  const searchListForString = () => {
    return props.searchString.length > 2 ?
      <div>
        {
          props.speciesList.filter((species) => {
            return species.toLowerCase().includes(props.searchString.toLowerCase());
          }).map((species,i) => {
            return <div><a key={i}>{species}</a></div>;
          })
        }
      </div>
    : <div/>;
  };

  return(<div>{searchListForString()}
  </div>);
};

SpeciesSearchResults.propTypes = {
  searchString: PropTypes.string,
  speciesList: PropTypes.array
};

export default SpeciesSearchResults;
