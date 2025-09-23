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
      imageUrl: '',
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    // ---------------------------------------------- Old Method ---------------------------------------------------------
    app.models.predict("face-detection", this.state.input)
    .then(
      function(response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      },
      function(err) {
        console.log("An error has occurred", err);
      }
    );
    // ---------------------------------------------- New Method ---------------------------------------------------------
    // fetch("https://api.clarifai.com/v2/models/face-detection/outputs", returnClarifaiRequestOptions(this.state.input))
    // .then(response => response.json())
    // fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
    // .then(response => response.json())
    // .then(result => {

    //     const regions = result.outputs[0].data.regions;

    //     regions.forEach(region => {
    //         // Accessing and rounding the bounding box values
    //         const boundingBox = region.region_info.bounding_box;
    //         const topRow = boundingBox.top_row.toFixed(3);
    //         const leftCol = boundingBox.left_col.toFixed(3);
    //         const bottomRow = boundingBox.bottom_row.toFixed(3);
    //         const rightCol = boundingBox.right_col.toFixed(3);

    //         region.data.concepts.forEach(concept => {
    //             // Accessing and rounding the concept value
    //             const name = concept.name;
    //             const value = concept.value.toFixed(4);

    //             console.log(`${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`);
                
    //         });
    //     });

    // })
    // .catch(error => console.log('error', error));
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <ParticlesBg color='#ffffff' num={200} type='cobweb' bg={true} />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
