import React, { Component } from 'react';
import './App.css';
import Navbar from './navbar/Navbar' 
import Landing from './landing/Landing'
import styles from './assets/styles/styles.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar/>
        <Landing/>
      </div>
    );
  }
}

export default App;
