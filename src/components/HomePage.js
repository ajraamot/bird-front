import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component {
  render() {
    return (
      <div className="home">
        <p className="title">Bird App</p>
        <form className="select-region">
          <label>Select Region: </label>
          <select>
            <option>All USA and Canada</option>
            <option>Upper Midwest</option>
            <option>Great Plains</option>
            <option>Rocky Mountains</option>
            <option>Pacific Northwest</option>
          </select>
        </form>
        <Link to="Game" className="btn btn-primary btn-lg">Start</Link>
      </div>
    );
  }
}

export default HomePage;
