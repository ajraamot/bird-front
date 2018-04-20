/**
 * Created by araam on 9/3/17.
 */
import { fork } from 'redux-saga/effects';
import { birdSagas } from './BirdSagas';
import _ from 'lodash';

export default function * rootSaga () {
  console.log('in rootSaga.js');
  const sagas = _.concat([], birdSagas);
  yield _.map(sagas, (saga) => fork(saga));
}
