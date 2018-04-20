/**
 * Created by araam on 9/3/17.
 */
import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import BirdApiService from '../api/BirdApiService';
// import * as actionTypes from '../actions/actionTypes';
import actionTypes from '../actions/actionTypes';
import * as actions from '../actions/addBirdActions';

/*
* order of execution
* 1. addBirdReducer
* 2. configureStore.js, which creates and applies the Saga middleware
* 3. rootSaga.js
* 4. BirdSagas.fetchAllBirds
* 5. BirdApiService.getAllBirds
* 6. BirdSagas.watchFetchAllBirds
* 7. BirdSagas.saveBird
* */

export function * fetchAllBirds (action) {
  console.log('in BirdSagas.fetchAllBirds');
  try {
    const response = yield call(BirdApiService.getAllBirds);
    yield put(actions.gotAllBirdsSuccessfully(response.data));
  } catch (error) {
    yield put(actions.errorInGettingAllBirds(error.data));
  }
}

export function * watchFetchAllBirds () {
  console.log('in BirdSagas.watchFetchAllBirds');
  yield * takeEvery(actionTypes.GET_ALL_BIRDS_FETCH_REQUESTED, fetchAllBirds);
}

// READ THIS: https://shift.infinite.red/using-redux-saga-to-simplify-your-growing-react-native-codebase-2b8036f650de

export function * watchSaveBird() {
  console.log('in BirdSagas.watchSaveBird, bird');
  yield * takeEvery(actionTypes.ADD_BIRD, saveBird);
}

export function * saveBird (bird) {
  if (bird) {
    console.log('in BirdSagas.saveBird, bird = ', JSON.stringify(bird));
    try {
      console.log('in BirdSagas.saveBird, bird = ' + bird);
      const response = yield call(BirdApiService.saveBirdToDB(bird));
      console.log('in BirdSagas.saveBird, response = ' + response);
      yield put(actions.savedBirdSuccessfully(response.data));
    } catch (error) {
      console.log('in BirdSagas.saveBird, error = ' + error);
      yield put(actions.errorSavingBird(error));
    }
  }
}

export const birdSagas = [
  fetchAllBirds,
  watchFetchAllBirds,
  saveBird,
  watchSaveBird
];
