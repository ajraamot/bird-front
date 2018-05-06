// jest.unmock('./AddBird');
// jest.mock('../actions/addBirdActions');

import expect from 'expect';
import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import jest from 'jest';
import renderer from 'react-test-renderer';
import AddBird from './AddBird';
// import AddBird, { mapStateToProps, mapDispatchToProps } from './AddBird';
// import { Provider } from 'react-redux';
// import rootReducer from '../reducers/index';
// import {createStore, combineReducers} from 'redux';
// import configureStore from '../store/configureStore';
import { addBird as mockAddBirdActions, getAllBirds as mockGetAllBirds } from '../actions/addBirdActions';
import constants from '../constants';

describe('AddBird testing with renderer', () => {
  configure({ adapter: new Adapter() });
  let addBird;
  const timberdoodle = {species: 'timberdoodle', sound: 'peent!'};
  const gammyBird = {species: 'gammy bird', sound: 'ooohhh!'};
  let birdArray = [timberdoodle, gammyBird];
  beforeEach(() => {
    addBird = shallow(<AddBird.WrappedComponent
      getAllBirds={mockGetAllBirds}
      birds={birdArray}
    />);
  });
  describe('render', () => {
    it('renders a title', () => {
      expect(addBird.find('h1').props().children).toContain('Add Bird');
    });
    it('renders headers for the table', () => {
      const tableHeader = addBird.find('.bird-table-header');
      expect(tableHeader.find('.bird-species').props().children).toEqual('Species');
      expect(tableHeader.find('.bird-order').props().children).toEqual('Order');
      expect(tableHeader.find('.bird-family').props().children).toEqual('Family');
      expect(tableHeader.find('.bird-region').at(0).props().children).toEqual('USA Can');
      expect(tableHeader.find('.bird-region').at(1).props().children).toEqual('Uppr MW');
      expect(tableHeader.find('.bird-region').at(2).props().children).toEqual('Grt Plns');
      expect(tableHeader.find('.bird-region').at(3).props().children).toEqual('Rcky Mtns');
      expect(tableHeader.find('.bird-region').at(4).props().children).toEqual('Pac NW');
    });
    it('renders input species textbox', () => {
      // expect(addBird.find('.input-species').prop('value')).toEqual(addBird.state.bird.species);
    });
  });
});

  // let store = configureStore({});

  // let initialState = {};
  // let store = createStore(rootReducer, initialState);
  //
  // let birds = [{key: 1, species:'robin', sound:'cheery',image:'robin.pic'}];
  //
  // // let birdRow = (<AddBird key={} birds:)
  //
  // // "birds":{[{"species":"robin","sound":"cheery","image":"robin.pic"}]}
  //
  // // it('renders correctly', () => {
  // //   // console.log(' >>>>>>> AddBird renderer.create = ' + renderer.create(<AddBird />).toJSON);
  // //   let tree = renderer.create(<Provider store={store}>
  // //     <AddBird />
  // //   </Provider>).toJSON();
  // //   console.log('>>>>>>>>>> in AddBird.test, JSON.stringify(tree) = ' + JSON.stringify(tree));
  // //   expect(tree).toMatchSnapshot();
  // // });
  //
  // it('verifying against the snapshot', () => {
  //   const tree = renderer.create(<AddBird.WrappedComponent actions={mockAddBirdActions()} birds={birds}/>).toJSON();
  //
  // });
  //
  // // it('verifying against the snapshot', () => {
  // //   const tree = renderer.create(<AddBird/>).toJSON();
  // //   expect(tree).toMatchSnapshot();
  // // });
  //
  //
  // // it('attempting to mount a tree', () => {
  // //   let mockBirds = [{"species":"chickadee","sound":"chick-a-dee-dee","image":"chickadee.jpg"},{"species":"robin","sound":"cheery","image":"robin.jpg"}];
  // //   // let newBird = {"bird":{"species":"sparrow","sound":"chirp","image":"sparrow.jpg"}};
  // //   let newBird = {"species":"sparrow","sound":"chirp","image":"sparrow.jpg"};
  // //
  // //   const tree = mount(<Provider store={store}><AddBird.WrappedComponent actions={mockAddBirdActions(newBird)} birds={mockBirds}/></Provider>);
  // //   // console.log('>>>>>>>>>> in AddBird.test, tree = ' + tree);
  // //   expect(tree).toContain(<AddBird/>);
  // // });
  //
  // /* Results in the following:
  // * Warning: Each child in an array or iterator should have a unique "key" prop.
  // * Check the render method of `AddBird`.
  // * See https://fb.me/react-warning-keys for more information.
  // * */


/*
state={"birds":[{"species":"chickadee","sound":"chick-a-dee-dee","image":"chickadee.jpg"},{"species":"robin","sound":"cheery","image":"robin.jpg"}]}
props={"history":{},"location":{"pathname":"/add","search":"","hash":"","state":null,"action":"PUSH","key":"qd79jy","query":{},"$searchBase":{"search":"","searchBase":""}},"params":{},"route":{"path":"add"},"routeParams":{},"routes":[{"path":"/","indexRoute":{},"childRoutes":[{"path":"add"},{"path":"game"}]},{"path":"add"}],"children":null}
*/

// describe('AddBird using shallow', () => {
//   const robin = {species: 'Robin', sound: 'cheery', image: 'robin-photo.jpg'};
//   const chickadee = {species: 'Chickadee', sound: 'chick-a-dee-dee-dee', image: 'chickadee-photo.jpg'};
// // {"birds":[{"species":"a","sound":"b","image":"c"},{"species":"d","sound":"e","image":"f"}]}
//   let addBird;
//   let mockBirds, mockActions;
//   mockBirds = [robin, chickadee];
//
//   beforeEach(() => {
//     // TODO: See examples from work, I think I need a store object,
//     // and also maybe a WrappedComponent
//     addBird = shallow(<AddBird.WrappedComponent actions={jest.fn()} addBird={jest.fn()} birds={mockBirds}/>);
//     console.log('>>>>>> addBird = ' + JSON.stringify(addBird));
//   });
//
//   it('renders Add Bird text', () => {
//    expect(addBird.find('h1').props().children).toContain('Add Bird');
//     // expect(true).toEqual(true);
//   });
//
//   describe('Our first test', () => {
//     it('should pass', () => {
//       expect(true).toEqual(true);
//     });
//   });
//
//   // it('renders Species input', () => {
//   //   expect(addBird.find('input').props(0).children).toContain('');
//   // });
//
// });
//
// describe('AddBird using mount', () => {
//   let addBird;
//   beforeEach(() => {
//     // TODO: See examples from work, I think I need a store object,
//     // and also maybe a WrappedComponent
//     addBird = mount(<AddBird />);
//     console.log('>>>>>> addBird = ' + JSON.stringify(addBird));
//   });
//
//   it('renders Add Bird text', () => {
//     expect(addBird.find('h1').props().children).toContain('Add Bird');
//     // expect(true).toEqual(true);
//   });
//
//   describe('Our first test', () => {
//     it('should pass', () => {
//       expect(true).toEqual(true);
//     });
//   });
//
//   // it('renders Species input', () => {
//   //   expect(addBird.find('input').props(0).children).toContain('');
//   // });
//
// });

// jest.unmock('./AddBird');

// describe('render', () => {
//   it('renders correctly', () => {
//     console.log('in HomePage.test, testing snapshot'); // eslint-disable-line no-console
//     expect(renderer.create(<HomePage/>).toJSON()).toMatchSnapshot();
//   });
// });

