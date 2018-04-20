import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import jest from 'jest';
import renderer from 'react-test-renderer';
import Header from './Header';

describe('Header', () => {
  let header;
  beforeEach(() => {
    header = shallow(<Header />);
  });

  it('renders Home link', () => {
    expect(header.find('IndexLink').props().children).toContain('Home');
  });
  it('renders Add Bird link', () => {
    expect(header.find('Link').props().children).toContain('Add Bird');
  });
});
