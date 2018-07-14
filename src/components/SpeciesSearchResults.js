import React from 'react';
import PropTypes from 'prop-types';

const SpeciesSearchResults = (props) => {
  const searchListForString = () => {
    // TODO: Somewhere in here is causing a "Warning: Each child in an array or iterator should have a unique "key" prop."
    return props.searchString.length > 2 ?
      <div>
        {
          props.speciesList.filter((species) => {
            return species.toLowerCase().includes(props.searchString.toLowerCase());
          }).map((species,i) => {
            return <div><a key={i} onClick={() => props.populateInputFieldWithSearchResult(species)}>{species}</a></div>;
            // return <div><a key={i} onClick={() => props.populateInputFieldWithSearchResult()}>{species}</a></div>;
          })
        }
      </div>
    : <div/>;
  };

  return(<div>{searchListForString()}</div>);
};

SpeciesSearchResults.propTypes = {
  searchString: PropTypes.string,
  speciesList: PropTypes.array,
  populateInputFieldWithSearchResult: PropTypes.func
};

export default SpeciesSearchResults;
