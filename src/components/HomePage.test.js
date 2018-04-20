import expect from 'expect';
import React from 'react';
import { shallow, mount } from 'enzyme';
import jest from 'jest';
import renderer from 'react-test-renderer';
import HomePage from './HomePage';
//
// jest.unmock('./HomePage');

describe('Our first test', () => {
  it('should pass', () => {
    expect(true).toEqual(true);
  });
});

// describe('render', () => {
//   it('renders correctly', () => {
//     console.log('in HomePage.test, testing snapshot'); // eslint-disable-line no-console
//     expect(renderer.create(<HomePage/>).toJSON()).toMatchSnapshot();
//   });
// });

describe('HomePage', () => {
  let home;
  beforeEach(() => {
    home = shallow(<HomePage />);
  });
  it('renders a Bird App text', () => {
    expect(home.find('p').props().children).toContain('Bird App');
  });

  it('renders a Select Region dropdown', () => {
    expect(home.find('label').props().children).toContain('Select Region: ');
    expect(home.find('select')).toExist();
  });

  it('Select Region dropdown is populated with regions', () => {
    expect(home.find('option').at(0).props().children).toContain('All USA and Canada');
    expect(home.find('option').at(1).props().children).toContain('Upper Midwest');
    expect(home.find('option').at(2).props().children).toContain('Great Plains');
    expect(home.find('option').at(3).props().children).toContain('Rocky Mountains');
    expect(home.find('option').at(4).props().children).toContain('Pacific Northwest');
  });

  it('renders Start', () => {
    expect(home.find('Link').props().children).toContain('Start');
  });

  it('Start link goes to Game', () => {
    expect(home.find('Link').prop('to')).toEqual('Game');
  });

  // it('renders Select Region dropdown with data', () => {
  //   home = mount(<HomePage/>).find('div').find('form');
  // expect(home.find('form').props().children).toContain('Select Region:');
  // expect(home.find('form').props().children).toContain('select');
  //   expect(home.find('select').props().children).toContain('Colorado');
  //   expect(home.find('select').props().children).toContain('Illinois');
  //   expect(home.find('select').props().children).toContain('Washington');
  //   expect(home.find('select').props().children).toContain('Wisconsin');
  // });
});
