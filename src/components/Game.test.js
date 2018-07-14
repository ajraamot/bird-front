// jest.unmock('./Game');

import expect from 'expect';
import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import jest from 'jest';
import renderer from 'react-test-renderer';
import Game, { mapStateToProps, mapDispatchToProps } from './Game';
// import { default as Game, mapDispatchToProps } from './Game';
import { getAllBirds as mockGetAllBirds } from '../actions/addBirdActions';
import constants from '../constants';

describe('Game', () => {
  configure({ adapter: new Adapter() });
  let game;
  beforeEach(() => {
    game = shallow(<Game.WrappedComponent
      getAllBirds={mockGetAllBirds}
      birds={[{species: 'timberdoodle', image: 'doodle.jpg', sound: 'peent!'},{species: 'gammy bird', image: 'gammy.jpg', sound: 'ooohhh!'}]}
    />);
  });
  describe('render', () => {
    it('renders Add Bird text', () => {
      expect(game.find('h1').props().children).toContain('Game');
    });
    it('renders Play Sound button', () => {
      expect(game.find('input').at(0)).toExist();
      expect(game.find('input').at(0).prop('type')).toEqual('button');
      expect(game.find('input').at(0).prop('value')).toEqual('Play Sound');
    });
    it('renders Enter Species: input', () => {
      expect(game.find('input').at(1).prop('type')).toEqual('text');
      expect(game.find('input').at(1).text()).toEqual('');
    });
    it('renders Check Answer button', () => {
      expect(game.find('input').at(2).prop('type')).toEqual('button');
      expect(game.find('input').at(2).prop('value')).toEqual('Check Answer');
    });
    it('renders Next Bird button', () => {
      expect(game.find('input').at(3).prop('type')).toEqual('button');
      expect(game.find('input').at(3).prop('value')).toEqual('Next Bird');
    });
    it('by default, does not display the answer', () => {
      expect(game.instance().state.isAnswerShown).toBeFalsy();
      expect(game.find('.answer').text()).toEqual('');
    });
    it('by default, displays the score', () => {
      expect(game.find('.score').text()).toEqual('Score: 0 of 0');
    });
    it('by default, does not display a link to the website', () => {
      expect(game.find('.url').props().children).toEqual('');
    });
    it('by default, does not display a photo', () => {
      expect(game.find('img').prop('src')).toEqual('');
    });
  });

  describe('Play Sound', () => {
    let gameWithState;
    gameWithState = shallow(<Game.WrappedComponent
    />);
    it('plays the audio file for the bird at currentBirdIndex', () => {
      gameWithState = shallow(<Game.WrappedComponent
        getAllBirds={mockGetAllBirds}
        currentBirdIndex={0}
      />);
    });
    it('does not increment the currentBirdIndex', () => {
      game = shallow(<Game.WrappedComponent
        getAllBirds={mockGetAllBirds}
        currentBirdIndex={0}
        birds={[{species: 'timberdoodle', image: 'doodle.jpg', sound: 'peent!'},{species: 'gammy bird', image: 'gammy.jpg', sound: 'ooohhh!'}]}
      />);
      game.find('input').at(1).simulate('click');
      // gameWithState.find({ prop: 'submit' }).simulate('click');
      expect(game.instance().state.currentBirdIndex).toEqual(0);
    });
  });

  describe('Check Answer when correct answer is entered', () => {
    beforeEach(() => {
      game = mount(<Game.WrappedComponent
        getAllBirds={mockGetAllBirds}
        birds={[{species: 'Timber Doodle', image: 'doodle.jpg', sound: 'peent!'},{species: 'gammy bird', image: 'gammy.jpg', sound: 'ooohhh!'}]}
      />);
      game.setState({
        currentBirdIndex: 0,
        isAnswerShown: true,
        correctAnswer: true,
        bird: {species: 'Timber Doodle', sound: 'peent', image: 'timberdoodle.jpg'}
      });
      // game.props.birds = [{species: 'timberdoodle', sound: 'peent', image: 'timberdoodle.jpg'}, {species: 'hummerdoodle', sound: 'zee-chupity-chup', image: 'hummerdoodle.jpg'}];
    });
    it('displays a message indicating Correct with the answer', () => {
      expect(game.find('.answer').props().children).toEqual('Correct! Timber Doodle');
    });
    it('displays a link to the website', () => {
      expect(game.find('.url').props().children).toEqual(constants.WEBSITE_URL + 'Timber_Doodle' + '/overview');
    });
    it('displays the photo', () => {
      expect(game.find('img').prop('src')).toEqual(constants.IMAGE_URL + 'timberdoodle.jpg');
    });
    it('does not increment the currentBirdIndex', () => {
      game = shallow(<Game.WrappedComponent
        getAllBirds={mockGetAllBirds}
        currentBirdIndex={0}
        birds={[{species: 'Timber Doodle', image: 'doodle.jpg', sound: 'peent!'},{species: 'gammy bird', image: 'gammy.jpg', sound: 'ooohhh!'}]}
      />);
      game.find('input').at(2).simulate('click');
      expect(game.instance().state.currentBirdIndex).toEqual(0);
    });
    it('increments the score on correct answer', () => {
      game = shallow(<Game.WrappedComponent
        getAllBirds={mockGetAllBirds}
        // currentBirdIndex={1}
        // totalShownSoFar={1}
        // score={1}
        birds={[{species: 'Timber Doodle', image: 'doodle.jpg', sound: 'peent!'},{species: 'Gammy Bird', image: 'gammy.jpg', sound: 'ooohhh!'}]}
      />);
      game.find('input').at(1).simulate('change', {target: {value: 'Timber Doodle'}});
      game.find('input').at(2).simulate('click'); // check answer
      // expect(game.find('.score').props().children).toEqual('Score: 1 of 1');

      game.find('input').at(3).simulate('click'); // next bird
      game.find('input').at(1).simulate('change', {target: {value: 'Gammy Bird'}});
      game.find('input').at(2).simulate('click');
      expect(game.find('.score').props().children).toEqual('Score: 2 of 2');
    });
  });

  describe('Next Bird', () => {
    it('increases the current bird index by 1', () => {
      let gameWithState;
      gameWithState = shallow(<Game.WrappedComponent
        getAllBirds={mockGetAllBirds}
        currentBirdIndex={0}
        birds={[{species: 'timberdoodle', image: 'doodle.jpg', sound: 'peent!'},{species: 'gammy bird', image: 'gammy.jpg', sound: 'ooohhh!'}]}
            />);
        // }).instance();
      let originalIndex = game.state.currentBirdIndex;
      console.log('>>>>>>>>' + gameWithState.find('input').at(3).prop('value'));

      gameWithState.find('input').at(3).simulate('click');

      expect(gameWithState.instance().state.currentBirdIndex).toEqual(1);
      // expect(gameWithState.state.currentBirdIndex) == originalIndex + 1;
    });
    it('clears the Enter Species field', () => {
      let game;
      game = shallow(<Game.WrappedComponent
        getAllBirds={mockGetAllBirds}
        currentBirdIndex={0}
        birds={[{species: 'timberdoodle', image: 'doodle.jpg', sound: 'peent!'},{species: 'gammy bird', image: 'gammy.jpg', sound: 'ooohhh!'}]}
      />);
      game.find('input').at(1).simulate('change', {target: {value: 'timber doodle'}});
      expect(game.find('input').at(1).value).toEqual('timber doodle');
      game.find('input').at(3).simulate('click'); // Next Bird

      // console.log('!!!!!!!!!!!!!! input field has text = ' + gameWithState.find('input').at(1).value);
      expect(game.find('input').at(1).prop('value')).toEqual(''); // Error: Expected undefined to equal 'timber doodle'
    });
  });
  describe('SpeciesSearchResult', () => {
    it('displays selected SpeciesSearchResults', () => {
      let game;
      game = mount(<Game.WrappedComponent // or should it be mount()?
        getAllBirds={mockGetAllBirds}
        currentBirdIndex={0}
        birds={[{species: 'Timber Doodle', image: 'doodle.jpg', sound: 'peent!'},{species: 'gammy bird', image: 'gammy.jpg', sound: 'ooohhh!'}]}
      />);

      game.find('input').at(1).simulate('change', {target: {value: 'tim'}});
      expect(game.find('a').at(0).props().children).toContain('Timber Doodle');
    });

    it('populates the input field with a selected SpeciesSearchResult', () => {
      let game;
      game = mount(<Game.WrappedComponent // or should it be mount()?
        getAllBirds={mockGetAllBirds}
        currentBirdIndex={0}
        birds={[{species: 'Timber Doodle', image: 'doodle.jpg', sound: 'peent!'},{species: 'gammy bird', image: 'gammy.jpg', sound: 'ooohhh!'}]}
      />);

      game.find('input').at(1).simulate('change', {target: {value: 'tim'}});
      expect(game.find('a').at(0).props().children).toContain('Timber Doodle');

      // select the returned anchor from the SpeciesSearchResults
      game.find('a').at(0).simulate('click'); // TypeError: Cannot read property 'props' of undefined
      // game.find('a').simulate('click'); // Error: Method “simulate” is only meant to be run on a single node. 0 found instead.

      expect(game.find('input').at(1).prop('value')).toEqual('Timber Doodle');

    });
  });




  describe('mapStateToProps', () => {
    game = shallow(<Game.WrappedComponent
      getAllBirds={mockGetAllBirds}
    />);
    let chickadee = {species: 'chickadee', sound: 'chick-a-dee-dee-dee', image: 'chickadee.jpg'};
    let timberdoodle = {species: 'timberdoodle', sound: 'peeent', image: 'woodcock.jpg'};
    let originalState = {birds: {chickadee: chickadee, timberdoodle: timberdoodle}};

    // // TODO: This broke when I randomized the bird list
    // let randomizeList = jest.fn();
    // randomizeList.mockReturnValue = originalState;

    let expectedProps = mapStateToProps(originalState);

    // it('props receive birds from original state', () => {
    //   expect(expectedProps.birds).toEqual(originalState.birds);
    // });
    // it('outputs the same number of birds as props as were in original state', () => {
    //   expect(expectedProps.birds.length).toEqual(originalState.birds.length);
    // });
  });

  describe('mapDispatchToProps', () => {
    it('dispatches action to getAllBirds', () => {
      const dispatch = jest.fn(); // TODO: TypeError: _jest2.default.fn is not a function
      mapDispatchToProps(dispatch).getAllBirds();
      expect(mockGetAllBirds).toBeCalled();

      // mapDispatchToProps(jest.fn()).getAllBirds();
      // expect(mockGetAllBirds).toBeCalled();

      // mockGetAllBirds.mockReturnValue('mock get all birds');
      // const dispatch = jest.fn();
      // mapDispatchToProps(dispatch).getAllBirds();
      // expect(dispatch).toBeCalledWith('mock get all birds');
    });
  });
});
