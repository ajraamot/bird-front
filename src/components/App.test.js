// jest.unmock('./App');

import expect from 'expect';
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import jest from 'jest';
// import renderer from 'react-test-renderer';
import App from './App';

describe('Our first test', () => {
  configure({ adapter: new Adapter() });
  it('should pass', () => {
    expect(true).toEqual(true);
  });
});

// describe('App', () => {
//   let tree;
//   beforeEach(() => {
//     tree = shallow(<App.WrappedComponent />);
//   });
//
//   it('renders Header', () => {
//     expect(tree.length).toEqual(1);
//     // expect(tree.find('Header').props().children.length()).toEqual(1);
//     // expect(tree.find('Header').props().children).toExist();
//   });
//
//   // it('testing App.js using react-test-renderer', () => {
//   //   const ReactShallowRenderer = require('react-test-renderer/shallow');
//   //
//   //   const renderer = new ReactShallowRenderer();
//   //   renderer.render(<App />);
//   //
//   //   const result = renderer.getRenderOutput();
//   //   expect(result.type).toBe('div');
//   //   expect(result.props.children).toEqual([
//   //     <Header/>
//   //   ]);
//   // });
// });
