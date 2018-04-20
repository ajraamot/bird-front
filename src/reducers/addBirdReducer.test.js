import jest from 'jest';
import expect from 'expect';
import React from 'react';

import addBirdReducer from './addBirdReducer';
import types from '../actions/actionTypes';

describe('addBirdReducer', () => {
  it('does a deep clone of previous state', () => {
    const timberdoodle = {species: 'timberdoodle', sound: 'peent!'};
    const gammyBird = {species: 'gammy bird', sound: 'ooohhh!'};
    const oldState = [timberdoodle, gammyBird];
    const newState = addBirdReducer(oldState, {});

    expect(oldState).toEqual(newState);
  });

  it('ADD_BIRD adds two birds to state', () => {
    const defaultState = {};
    const timberdoodle = {species: 'timberdoodle', sound: 'peent!'};
    const gammyBird = {species: 'gammy bird', sound: 'ooohhh!'};

    const newBirdState = addBirdReducer(defaultState, {
      type: types.ADD_BIRD,
      bird: timberdoodle
    });
    expect(newBirdState).toEqual([timberdoodle]);

    const newBirdState2 = addBirdReducer(newBirdState, {
      type: types.ADD_BIRD,
      bird: gammyBird
    });
    expect(newBirdState2).toEqual([timberdoodle, gammyBird]);
  });

  it('GET_ALL_BIRDS_FETCH_SUCCEEDED returns bird array', () => {
    const timberdoodle = {species: 'timberdoodle', sound: 'peent!'};
    const gammyBird = {species: 'gammy bird', sound: 'ooohhh!'};
    const birds = [timberdoodle, gammyBird];

    const newBirdState = addBirdReducer({}, {
      type: types.GET_ALL_BIRDS_FETCH_SUCCEEDED,
      birds: birds
    });
    expect(newBirdState).toEqual(birds);
  });
});
