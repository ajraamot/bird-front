// the root reducer
import {combineReducers} from 'redux';
import birds from './addBirdReducer';
// 'birds' defined here is an alias that I will use through the app (state.birds)

const rootReducer = combineReducers({
  birds
});   // add any other reducers in here

export default rootReducer;
