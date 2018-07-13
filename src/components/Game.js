import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import constants from '../constants';
// import actionTypes from '../actions/actionTypes';
import * as addBirdActions from '../actions/addBirdActions';
import SpeciesSearchResults from "./SpeciesSearchResults";
// import {bindActionCreators} from 'redux'; // saves us from having to manually wrap our action creators in a dispatch call
// import Select from 'react-select';
// import 'react-select/dist/react-select.css';

class Game extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      currentBirdIndex: 0,
      isAnswerShown: false,
      correctAnswer: false,
      score: 0,
      totalShownSoFar: 0,
      anchorTagsToDisplay: '',
      speciesEntered: '',
      speciesList: this.props.birds.map((species) => { return species['species']; }),
      bird: {
        species: '',
        sound: '',
        image: '',
        taxOrder: '',
        family: '',
        allUSCanada: '',
        upperMidwest: '',
        greatPlains: '',
        rockyMountains: '',
        pacificNorthwest: ''
      }
    };

    // it is better for performance to put the bind methods here and not in render
    this.onSpeciesEntered = this.onSpeciesEntered.bind(this);
    this.getNextBird = this.getNextBird.bind(this);
    this.getNextBirdInfo = this.getNextBirdInfo.bind(this);
    this.playSound = this.playSound.bind(this);
    this.showAnswer = this.showAnswer.bind(this);
    this.getLink = this.getLink.bind(this);
    console.log('in Game constructor, speciesList = ' + JSON.stringify(this.state.speciesList));
  }

  playSound() {
    console.log('in playSound, current sound = ', this.state.bird.sound);
    if (this.state.bird.sound) {
      new Audio(`${constants.SOUND_URL}${this.state.bird.sound}`).play();
    } else {
      console.log('sound not found first time, trying again');
      if(this.state.currentBirdIndex == 0) {
        this.getNextBird({}); // it needs to load the first bird
        window.setTimeout(this.playSound, 500);
      }
    }
  }

  showAnswer() {
    if(this.state.correctAnswer) {
      this.setState({
        score: this.state.score + 1,
        isAnswerShown: true,
        totalShownSoFar: this.state.totalShownSoFar + 1
      });
    } else {
      this.setState({
        isAnswerShown: true,
        totalShownSoFar: this.state.totalShownSoFar + 1
      });
    }
  }

  getNextBird(event) {
    console.log('entering getNextBird!!!!!!!');
    this.props.birds.map(this.getNextBirdInfo);
    this.setState({isAnswerShown: false});
    console.log('leaving getNextBird!!!!!!!');
  }

  getNextBirdInfo(birds, index) {
    if (index === this.state.currentBirdIndex) {
      console.log('current bird is ', birds);
      console.log('bird sound is ', birds.sound);

      this.setState({
        bird: birds,
        correctAnswer: false
      });
      console.log('in getNextBird, bird.species = ', this.state.bird.species);

      this.setState({currentBirdIndex: this.state.currentBirdIndex + 1});
    }
  }

  onSpeciesEntered(event) {
    this.setState({speciesEntered: event.target.value});
    if(event.target.value.trim().toLowerCase() === this.state.bird.species.trim().toLowerCase()) {
      this.setState({correctAnswer: true});
    }
  }

  getLink (species) {
    let urlSpecies = species.trim();
    urlSpecies = urlSpecies.replace(/\s/g,'_');
    urlSpecies = urlSpecies.replace(/\'/, '');
    return constants.WEBSITE_URL + urlSpecies + '/overview';
    // constants.WEBSITE_URL + species.trim().replace(/\s/g,'_').replace(/\'/, '') + '/id'
  }

  render() {
    return (
      <div>
        <h1>Game</h1>
        <div className="button-container">
        <input className="btn__play--green"
               type="button"
               value="Play Sound"
               onClick={this.playSound}
                 />
        </div>
        Enter Species: <input type="text"
                              onChange={this.onSpeciesEntered}/>
        <SpeciesSearchResults searchString={this.state.speciesEntered} speciesList={this.state.speciesList}/>
        <div className="button-container">
        <input className="btn__check--blue"
               type="button"
               value="Check Answer"
               onClick={this.showAnswer} />
          <input className="btn__next--white"
                 type="button"
                 value="Next Bird"
                 onClick={this.getNextBird} />
        </div>
        <div className="answer">{this.state.isAnswerShown ? ((this.state.correctAnswer ? 'Correct! ' : 'Sorry, ') + this.state.bird.species) : ''}</div>
        <div className="score">{'Score: ' + this.state.score + ' of ' + this.state.totalShownSoFar}</div>
        <div className="url">{this.state.isAnswerShown ? this.getLink(this.state.bird.species) : ''}</div>
        <img src={this.state.isAnswerShown && this.state.bird.image ? `${constants.IMAGE_URL}${this.state.bird.image}` : ''} />
      </div>
    );
  }
}

Game.propTypes = {
  actions: PropTypes.object, // .isRequired, // should it be array or object?
  birds: PropTypes.array, // .isRequired
  getAllBirds: PropTypes.func
};

export function mapStateToProps(state, ownProps) {
  // console.log('in Game.mapStateToProps, state=' + JSON.stringify(state) + ", and props=" + JSON.stringify(ownProps));
  // console.log('in Game.mapStateToProps, state.birds=' + JSON.stringify(state.birds));
  return {
    // birds: randomizeList(state.birds)
    birds: state.birds // state.birds is the alias from the root reducer
  };
}

function randomizeList(birdArray) {
  return birdArray.sort(function(a, b){return 0.5 - Math.random();});
}

export function mapDispatchToProps(dispatch) {
  console.log('in Game.mapDispatchToProps, dispatch=' + JSON.stringify(dispatch) + ' and addBirdActions=' + JSON.stringify(addBirdActions));
  return {
    getAllBirds: () => dispatch(addBirdActions.getAllBirds()) // getAllBirds is an action
    // actions: bindActionCreators(addBirdActions, dispatch)
    // bindActionCreators goes through my addBirdActions
    // and find all the actions and wrap them in a call to dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
// connect returns a function,
// and Game is the argument for the function that connect returns
// could express it as:
// const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
// export default connectedStateAndProps(Game);
