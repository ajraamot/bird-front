import React, {PropTypes} from 'react';
import Header from './Header';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Header/>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;

// line 6 - container-fluid is from bootstrap
// line 9 this.props.children - passing down the children it receives from react-router
