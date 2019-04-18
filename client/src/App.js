import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import KeeperList from './components/KeeperList'
import Keeper from './components/Keeper'
import './App.css';

class App extends Component {
  render() {
    return (
      <Router >
        <div className="App">
          <div>
            <h1>Hive-Tracker</h1>
            <div>
              <div><Link to='/'>All Keepers</Link></div>
            </div>
          </div>

          <Switch>
            <Route exact path='/' component={KeeperList}/>
            <Route exact path='/keepers/:id/' component={Keeper}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
