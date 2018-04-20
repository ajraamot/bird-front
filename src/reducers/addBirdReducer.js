import actionTypes from '../actions/actionTypes';
import _ from 'lodash';

// const defaultState = {
//   birds: []
// }

export default function addBirdReducer(state = [], action) {
  console.log('>>>>>>> in addBirdReducer existing state = ' + JSON.stringify(state));
  const newBirdState = _.cloneDeep(state);
  // the state is an array because it will hold a list of birds
  switch(action.type) {
    case actionTypes.ADD_BIRD:
      // newBirdState.birds.push(action.bird);
      return [...state, Object.assign({}, action.bird)];
      // ... spreads the existing array
      // Object.assign creates a deep copy of the bird passed in
      // and adds the new bird to the end of the array
    case actionTypes.ADD_BIRD_SUCCEEDED:
      console.log('in addBirdReducer, add bird succeeded, action.birds = ' + JSON.stringify(action.birds));
      return action.birds;
    case actionTypes.ADD_BIRD_FAILED:
      console.log('in addBirdReducer, add bird failed, action.birds = ' + JSON.stringify(action.birds));
      return action.birds;
    case actionTypes.GET_ALL_BIRDS_FETCH_SUCCEEDED:
      // newBirdState.birds = action.birds;
      console.log('in addBirdReducer, fetch succeeded, newBirdState = ' + JSON.stringify(newBirdState));
      console.log('in addBirdReducer, fetch succeeded, state = ' + JSON.stringify(state));
      console.log('in addBirdReducer, fetch succeeded, action.birds = ' + JSON.stringify(action.birds));
      return action.birds;
      // return [...state, Object.assign({}, action.birds)];

      //     _.each(action.birds, (bird) => {
      //       console.log('before >>>>>>> bird = ' + bird + ', stringified bird = ' + JSON.stringify(bird));
      //       console.log('bird.idbirds = ' + JSON.stringify(bird.idbirds));
      //       newBirdState.birds[bird.idbirds - 1] = bird;
      //     });
      //     return newBirdState;
    case actionTypes.GET_ALL_BIRDS_FETCH_FAILED:
      console.log('>>>>>> in addBirdReducer, fetch error case, actionType = ' + JSON.stringify(action.type) + ', state = ' + JSON.stringify(state));
      return state;
    default:
      console.log('>>>>>> in addBirdReducer, default case, actionType = ' + JSON.stringify(action.type));
      return state;
  }
}
