import React from 'react';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import Rank from '../components/Rank/Rank';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import SignIn from '../components/SignIn/SignIn';
import Register from '../components/Register/Register';
import './App.css';
import Particles from 'react-particles-js';

const particlesObj ={
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
}


class App extends React.Component {

  constructor() {
    super();
    this.state = initialState;
    }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  calculateFaceLocation = (data) => {
     const clarifaiResponse = data.outputs[0].data.regions[0].region_info.bounding_box;
     const image = document.getElementById('inputimage');
     const width = Number(image.width);
     const height = Number(image.height);
     return {
          top_row : height * clarifaiResponse.top_row,
          left_col : width * clarifaiResponse.left_col,
          bottom_row : height - (height * clarifaiResponse.bottom_row),
          right_col : width - (width * clarifaiResponse.right_col) 
     }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    fetch('https://frozen-journey-46929.herokuapp.com/imageUrl',{
        method: 'post',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
          input: this.state.input
    })
    })
    .then(response => response.json())
    .then(response => {
      fetch('https://frozen-journey-46929.herokuapp.com/image',{
        method: 'put',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
          id: this.state.user.id
        })
      })
      .then(response => response.json())
      .then(count => {
        this.setState(Object.assign(this.state.user, {entries: count}))
      })
      .catch(console.log)
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    if (route === 'signin') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }

  render() {
    return (
    <div className="App">
       <Particles className='particles' params={particlesObj} />
       <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
       {
        this.state.route === 'home'
         ? <div>     
             <Logo />
             <Rank name={this.state.user.name} entries={this.state.user.entries}/>
             <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
             <FaceRecognition box={this.state.box} imageUrl= {this.state.imageUrl}/>
           </div>
         : (
              this.state.route === 'signin' 
              ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
           )
       }
        </div>
  );


  }
}

export default App;
