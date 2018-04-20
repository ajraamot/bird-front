// jest.unmock('./BirdApiService');

import expect from 'expect';
import jest from 'jest';
import BirdApiService from './BirdApiService';

import axios from 'axios';

xdescribe('BirdApiService', () => {
  it('getAllBirds from api service', () => {
    BirdApiService.getAllBirds();
    expect(axios.get).toBeCalledWith('http://localhost:9001/api/ps/birds');
  });
});

