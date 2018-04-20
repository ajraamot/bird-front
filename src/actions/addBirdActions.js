import actionTypes from '../actions/actionTypes';

export function addBird(bird) {
  console.log('>>>>>>> in addBirdActions, bird=' + JSON.stringify(bird));
  return { type: actionTypes.ADD_BIRD, bird}; // in ES6 could also say bird: bird
  // return { type: types.ADD_BIRD, bird}; // in ES6 could also say bird: bird
}

export function savedBirdSuccessfully (data) {
  console.log('in addBirdActions.savedBirdSuccessfully, data = ' + data);
  return {
    type: actionTypes.ADD_BIRD_SUCCEEDED,
    response: data
  };
}

export function errorSavingBird (error) {
  console.log('in addBirdActions.errorSavingBird, error = ' + error);
  return {
    type: actionTypes.ADD_BIRD_FAILED,
    error: error
  };
}

export function getAllBirds () {
  console.log('in addBirdActions, getAllBirds');
  return {
    type: actionTypes.GET_ALL_BIRDS_FETCH_REQUESTED
  };
}

export function gotAllBirdsSuccessfully (data) {
  return {
    type: actionTypes.GET_ALL_BIRDS_FETCH_SUCCEEDED,
    birds: data
  };
}

export function errorInGettingAllBirds (error) {
  return {
    type: actionTypes.GET_ALL_BIRDS_FETCH_FAILED,
    error: error
  };
}
