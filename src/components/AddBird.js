import React from 'react';
import {connect} from 'react-redux';
import * as addBirdActions from '../actions/addBirdActions';
import actionTypes from '../actions/actionTypes';
import {bindActionCreators} from 'redux'; // saves us from having to manually wrap our action creators in a dispatch call
import PropTypes from 'prop-types';
import constants from '../constants';


class AddBird extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
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

    /*
     * allUSCanada":"all","upperMidwest":"mig","greatPlains":"mig","rockyMountains":null,"pacificNorthwest
     * */


    // it is better for performance to put the bind methods here and not in render
    this.onSpeciesChange = this.onSpeciesChange.bind(this);
    this.onSoundChange = this.onSoundChange.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.onOrderChange = this.onOrderChange.bind(this);
    this.onFamilyChange = this.onFamilyChange.bind(this);
    this.onUSCanadaChange = this.onUSCanadaChange.bind(this);
    this.onUpperMidwestChange = this.onUpperMidwestChange.bind(this);
    this.onGreatPlainsChange = this.onGreatPlainsChange.bind(this);
    this.onRockyMountainsChange = this.onRockyMountainsChange.bind(this);
    this.onPacificNorthwestChange = this.onPacificNorthwestChange.bind(this);

    this.testSound = this.testSound.bind(this);
    this.testImage = this.testImage.bind(this);
    this.saveBird = this.saveBird.bind(this);
    this.getLink = this.getLink.bind(this);
  }

  // componentWillMount () {
  //   this.props.getAllBirds();
  // }

  onSpeciesChange(event) {
    const bird = this.state.bird;
    bird.species = event.target.value;
    this.getLink(bird.species);
    this.setState({bird: bird});
  }

  onSoundChange(event) {
    const bird = this.state.bird;
    bird.sound = event.target.value.trim();
    this.setState({bird: bird});
  }

  onImageChange(event) {
    const bird = this.state.bird;
    bird.image = event.target.value.trim();
    this.setState({bird: bird});
  }

  onOrderChange(event) {
    const bird = this.state.bird;
    bird.taxOrder = event.target.value.trim();
    this.setState({bird: bird});
  }

  onFamilyChange(event) {
    const bird = this.state.bird;
    bird.family = event.target.value.trim();
    this.setState({bird: bird});
  }

  onUSCanadaChange(event) {
    const bird = this.state.bird;
    bird.allUSCanada = event.target.value.trim();
    this.setState({bird: bird});
  }

  onUpperMidwestChange(event) {
    const bird = this.state.bird;
    bird.upperMidwest = event.target.value.trim();
    this.setState({bird: bird});
  }

  onGreatPlainsChange(event) {
    const bird = this.state.bird;
    bird.greatPlains = event.target.value.trim();
    this.setState({bird: bird});
  }

  onRockyMountainsChange(event) {
    const bird = this.state.bird;
    bird.rockyMountains = event.target.value.trim();
    this.setState({bird: bird});
  }

  onPacificNorthwestChange(event) {
    const bird = this.state.bird;
    bird.pacificNorthwest = event.target.value.trim();
    this.setState({bird: bird});
  }

  testSound(event) {
    new Audio(`${constants.SOUND_URL}${this.state.bird.sound}`).play();
  }

  testImage(event) {
    console.log('need to implement testImage button');
  }

  saveBird(event) {
    this.props.addBird(this.state.bird); // addBird is an action
    // this.props.actions.addBird(this.state.bird); // addBird is an action
    console.log(`in AddBird.saveBird, saving species: ${this.state.bird.species}, with sound: ${this.state.bird.sound} and image: ${this.state.bird.image}`);
    console.log('still in saveBird, the event = ' + event);

    // maybe do something like this:
    //    this.setState({birds: [...this.state.birds, {this.state.bird}]});

    // TODO: clear the input fields
    // this.refs.input.reset();
    // debugger;
    // this.refs.input.reset();
  }

  displaySavedBirdRow(bird, index) {
    // console.log(`in AddBird.displaySavedBirdRow, size of birds array = ${this.props.birds.length}`
    // debugger;
    return (<div className="bird-row" key={index}>
      <a href={constants.WEBSITE_URL + bird.species.trim().replace(/\s/g,'_').replace(/\'/, '') + '/id'} className="bird-species">{bird.species}</a>
      <div className="bird-sound">{bird.sound}</div>
      <div className="bird-image">{bird.image}</div>
      <div className="bird-order">{bird.taxOrder}</div>
      <div className="bird-family">{bird.family}</div>
      <div className="bird-region">{bird.allUSCanada}</div>
      <div className="bird-region">{bird.upperMidwest}</div>
      <div className="bird-region">{bird.greatPlains}</div>
      <div className="bird-region">{bird.rockyMountains}</div>
      <div className="bird-region">{bird.pacificNorthwest}</div>
    </div>);
  }



  getLink (species) {
    let urlSpecies = species.trim();
    urlSpecies = urlSpecies.replace(/\s/g,'_');
    urlSpecies = urlSpecies.replace(/\'/, '');
    return constants.WEBSITE_URL + urlSpecies + '/overview';
    // constants.WEBSITE_URL + species.trim().replace(/\s/g,'_').replace(/\'/, '') + '/id'
  }

  render() {
    // console.log('>>>>> in AddBird.render(), this.state = ' + JSON.stringify(this.state));
    return (
      <div>
        <h1>Add Bird</h1>
        <div className="bird-row bird-table-header">
          <div className="bird-species">Species</div><div className="bird-sound">Sound</div><div className="bird-image">Image</div>
          <div className="bird-order">Order</div>
          <div className="bird-family">Family</div>
          <div className="bird-region">USA Can</div>
          <div className="bird-region">Uppr MW</div>
          <div className="bird-region">Grt Plns</div>
          <div className="bird-region">Rcky Mtns</div>
          <div className="bird-region">Pac NW</div>
        </div>
        <div ref="form">
          <input
            className="input-species"
            type="text"
            onChange={this.onSpeciesChange}
            id={this.state.bird.species}
            value={this.state.bird.species} />
          <input
            className="input-sound"
            type="text"
            onChange={this.onSoundChange}
            value={this.state.bird.sound} />
          <input
            className="input-image"
            type="text"
            onChange={this.onImageChange}
            value={this.state.bird.image} />
          <input
            className="input-order"
            type="text"
            onChange={this.onOrderChange}
            value={this.state.bird.taxOrder} />
          <input
            className="input-family"
            type="text"
            onChange={this.onFamilyChange}
            value={this.state.bird.family} />
          <select
            className="input-region"
            type="text"
            onChange={this.onUSCanadaChange}
            value={this.state.bird.allUSCanada}>
            <option value=""></option>
            <option value="all">all</option>
            <option value="win">win</option>
            <option value="mig">mig</option>
            <option value="sum">sum</option>
          </select>
          <select
            className="input-region"
            type="text"
            onChange={this.onUpperMidwestChange}
            value={this.state.bird.upperMidwest}>
            <option value=""></option>
            <option value="all">all</option>
            <option value="win">win</option>
            <option value="mig">mig</option>
            <option value="sum">sum</option>
          </select>
          <select
            className="input-region"
            type="text"
            onChange={this.onGreatPlainsChange}
            value={this.state.bird.greatPlains}>
            <option value=""></option>
            <option value="all">all</option>
            <option value="win">win</option>
            <option value="mig">mig</option>
            <option value="sum">sum</option>
          </select>
          <select
            className="input-region"
            type="text"
            onChange={this.onRockyMountainsChange}
            value={this.state.bird.rockyMountains}>
            <option value=""></option>
            <option value="all">all</option>
            <option value="win">win</option>
            <option value="mig">mig</option>
            <option value="sum">sum</option>
          </select>
          <select
            className="input-region"
            type="text"
            onChange={this.onPacificNorthwestChange}
            value={this.state.bird.pacificNorthwest}>
            <option value=""></option>
            <option value="all">all</option>
            <option value="win">win</option>
            <option value="mig">mig</option>
            <option value="sum">sum</option>
          </select>
        </div>
        <input type="submit"
               value="Test Sound"
               onClick={this.testSound} />
        <input type="submit"
               value="Test Image"
               onClick={this.testImage} />
        <input type="submit"
               value="Save"
               onClick={this.saveBird} />
        {this.props.birds.map(this.displaySavedBirdRow)}
        {this.testInput}
        <div className="add-bird-image">
          <img src={(this.state.bird.image).includes('.jpg') ? `${constants.IMAGE_URL}${this.state.bird.image}` : ''} />
        </div>
      </div>
    );
  }
}

AddBird.propTypes = {
  actions: PropTypes.object, // .isRequired, // should it be array or object?
  // addBird: PropTypes.func.isRequired, // is this needed?
  birds: PropTypes.array, // .isRequired
  getAllBirds: PropTypes.func,
  addBird: PropTypes.func
};

function mapStateToProps(state, ownProps) {
  console.log('in AddBird.mapStateToProps, state=' + JSON.stringify(state) + ", and props=" + JSON.stringify(ownProps));
  console.log('in AddBird.mapStateToProps, state.birds=' + JSON.stringify(state.birds));
  return {
    birds: state.birds // state.birds is the alias from the root reducer
  };
}

function mapDispatchToProps(dispatch) {
  console.log('in AddBird.mapDispatchToProps, dispatch=' + JSON.stringify(dispatch) + ' and addBirdActions=' + JSON.stringify(addBirdActions));
  return {
    addBird: bird => dispatch(addBirdActions.addBird(bird)), // addBird is an action
    getAllBirds: () => dispatch(addBirdActions.getAllBirds()) // addBird is an action
    // actions: bindActionCreators(addBirdActions, dispatch)
    // bindActionCreators goes through my addBirdActions
    // and find all the actions and wrap them in a call to dispatch
  };
}

// export default AddBird;
export default connect(mapStateToProps, mapDispatchToProps)(AddBird);
// connect returns a function,
// and AddBird is the argument for the function that connect returns
// could express it as:
// const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
// export default connectedStateAndProps(AddBird);
