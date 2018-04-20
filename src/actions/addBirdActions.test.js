import jest from 'jest';
import expect from 'expect';
import React from 'react';

import * as actions from './addBirdActions';
import types from './actionTypes';

describe('addBirdActions', () => {
  it('tests addBird action', () => {
    let bird = {species: 'timberdoodle', sound: 'peent!'};
    expect(actions.addBird(bird)).toEqual({
      type: types.ADD_BIRD,
      bird: bird
    });
  });

  it('tests savedBirdSuccessfully action', () => {
    let data = {species: 'timberdoodle', sound: 'peent!'};
    expect(actions.savedBirdSuccessfully(data)).toEqual({
      type: types.ADD_BIRD_SUCCEEDED,
      response: data
    });
  });

  it('tests errorSavingBird action', () => {
    let error = {foo: 'bar'};
    expect(actions.errorSavingBird(error)).toEqual({
      type: types.ADD_BIRD_FAILED,
      error: error
    });
  });

  it('tests getAllBirds action', () => {
    expect(actions.getAllBirds()).toEqual({
      type: types.GET_ALL_BIRDS_FETCH_REQUESTED
    });
  });

  it('tests gotALlBirdsSuccessfully action', () => {
    let data = {species: 'timberdoodle', sound: 'peent!'};
    expect(actions.gotAllBirdsSuccessfully(data)).toEqual({
      type: types.GET_ALL_BIRDS_FETCH_SUCCEEDED,
      birds: data
    });
  });

  it('tests errorInGettingAllBirds action', () => {
    let error = {foo: 'bar'};
    expect(actions.errorInGettingAllBirds(error)).toEqual({
      type: types.GET_ALL_BIRDS_FETCH_FAILED,
      error: error
    });
  });

});
