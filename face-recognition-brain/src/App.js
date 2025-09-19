import React, { Component } from 'react'
import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation' 
import Logo from './components/Logo/Logo'
import Rank from './components/Rank/Rank'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onButtonSubmit = () => {
    console.log('Click')
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <ParticlesBg color='#ffffff' num={200} type='cobweb' bg={true} />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        {/*<FaceRecognition />*/}
      </div>
    );
  }
}

export default App;
