import { Component } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Rank from "./components/Rank/Rank";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import "tachyons";
import "./App.css";

const app = new Clarifai.App({
  apiKey: "",
});

const particlesOptions = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
    };
  }

  onInputChange = (e) => {
    this.setState({ input: e.target.value });
  };

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) =>
        console.log(
          response.outputs[0].data.regions[0].region_info.bounding_box
        )
      )
      // .then((response) => {
      //   console.log("hi", response);
      //   if (response) {
      //     fetch("http://localhost:3000/image", {
      //       method: "put",
      //       headers: { "Content-Type": "application/json" },
      //       body: JSON.stringify({
      //         id: this.state.user.id,
      //       }),
      //     })
      //       .then((response) => response.json())
      //       .then((count) => {
      //         this.setState(Object.assign(this.state.user, { entries: count }));
      //       });
      //   }
      //   this.displayFaceBox(this.calculateFaceLocation(response));
      // })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onSubmit={this.onSubmit}
        />
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
