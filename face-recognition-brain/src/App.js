import React, { Component } from 'react'
import ParticlesBg from 'particles-bg'
import Clarifai from 'clarifai'
import Navigation from './components/Navigation/Navigation' 
import Logo from './components/Logo/Logo'
import Rank from './components/Rank/Rank'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import './App.css';

const app = new Clarifai.App({
 apiKey: '1398bafad6ee4c2cb8db75dbca8ae3fe',
});

const returnClarifaiRequestOptions = (imageUrl) => {
  // Your PAT (Personal Access Token) can be found in the Account's Security section
  const PAT = '4bb81651a1014c1f8fd16f8090d9fb26';
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = 'rakoc001';
  const APP_ID = 'ZTM-Smart-Brain';
  // Change these to whatever model and image URL you want to use
  const MODEL_ID = 'face-detection';
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
  });

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
  };

  return requestOptions;
};

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
    console.log('Click');
    this.setState({imageUrl: this.state.input});
    // app.models.predict("face-detection", "https://samples.clarifai.com/face-det.jpg")
    // .then(
    //   function(response) {
    //     console.log(response);
    //   },
    //   function(err) {
    //     console.log("An error has occurred", err);
    //   }
    // );
    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", returnClarifaiRequestOptions(this.state.input))
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <ParticlesBg color='#ffffff' num={200} type='cobweb' bg={true} />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition />
      </div>
    );
  }
}

export default App;
