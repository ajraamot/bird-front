import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import jest from 'jest';
import renderer from 'react-test-renderer';
// import { render } from './index';
// import Provider from "react-redux/src/components/Provider";


describe('Our first test', () => {
  it('should pass', () => {
    expect(true).toEqual(true);
  });
});

// describe('render', () => {
//   fit('contains a provider and router', () => {
//     let provider = shallow(<Provider />);
//     console.log('>>>>>>>>>> in index.test.js, provider = '+ JSON.stringify(provider));
//     expect(provider.find('Provider').props().children).toContain('Router');
//   });
// });


// // unit test below was adapted from https://www.npmjs.com/package/react-test-renderer
// describe('render', () => {
//   const ReactShallowRenderer = require('react-test-renderer/shallow');
//
//   const renderer = new ReactShallowRenderer();
//   renderer.render(<Provider />);
//
//   const result = renderer.getRenderOutput();
//   console.log('>>>>>>> index.js, trying react-test-renderer, ' + JSON.stringify(result));
//   expect(result.type).toBe('Router');
//   expect(result.props.children).toEqual([
//     <Router />
//   ]);
// });
