import React from 'react';
import './App.css';
import Content from './components/Content';
import Header from './components/Header';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Content />
      </div>
    );
  }
}

export default App;
