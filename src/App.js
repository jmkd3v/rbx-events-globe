import ReactDOMServer from "react-dom/server";
import React from "react";
import Globe from "react-globe.gl";
import HoverItem from "./HoverItem";
import Nav from "./Nav.js";
import NavItem from "./NavItem.js";
import { SizeMe } from "react-sizeme";
import worldTexture from "./globes/world.jpg";
import worldTexture2 from "./globes/world2.jpg";

const combineRadius = 0.2; // how close the lat/long have to be to another object to get combined
const namesLimit = 2; // amount of names to show on each place before adding "and X others"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
      radius: 0.3,
      size: 0.4,
    };
  }

  componentDidMount() {
    fetch("https://api.jmk.gg/✨")
      .then((res) => res.json())
      .then((data) => {
        let places = [];
        for (let chapterContainer of data) {
          places = places.concat(chapterContainer.chapters);
        }

        let newPlaces = [];

        for (let place of places) {
          let isNew = true;
          for (let newPlace of newPlaces) {
            if (
              Math.abs(newPlace.latitude - place.latitude) < combineRadius &&
              Math.abs(newPlace.longitude - place.longitude) < combineRadius
            ) {
              isNew = false;
              newPlace.titles.push(place.title);
            }
          }
          if (isNew) {
            place.titles = [place.title];
            newPlaces.push(place);
          }
        }

        console.log(places);

        this.setState({
          places: newPlaces,
          texture: worldTexture,
        });
      });
  }

  render() {
    return (
      <div className="flex flex-col h-full font-sans">
        <Nav></Nav>
        <SizeMe monitorHeight>
          {({ size }) => {
            return (
              <div className="flex-1">
                <Globe
                  width={size.width}
                  height={size.height}
                  globeImageUrl={this.state.texture}
                  backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                  labelsData={this.state.places}
                  labelLat={(d) => d.latitude}
                  labelLng={(d) => d.longitude}
                  labelText={(d) => {
                    if (d.titles.length > namesLimit) {
                      let label =
                        d.titles[0] +
                        ", " +
                        d.titles[1] +
                        " and " +
                        (d.titles.length - namesLimit) +
                        " others";
                      console.log(label);
                      return label;
                    } else {
                      return d.titles.join(", ");
                    }
                  }}
                  labelLabel={(d) =>
                    ReactDOMServer.renderToString(
                      <HoverItem data={d}></HoverItem>
                    )
                  }
                  labelSize={(d) => this.state.size}
                  onLabelClick={(d) => {
                    window.location.href = d.url;
                  }}
                  labelDotRadius={(d) => this.state.radius}
                  labelColor={() => "#0099FF"}
                  labelResolution={3}
                  labelAltitude={(d) => 0.01}
                  onZoom={(zoomInfo) => {
                    // WARNING: Ugly code ahead!!! Will fix soon.
                    if (zoomInfo.altitude <= 0.1) {
                      if (this.state.radius != 0.025) {
                        this.setState({
                          radius: 0.025,
                          size: 0.05,
                        });
                      }
                    } else if (zoomInfo.altitude <= 0.25) {
                      if (this.state.radius != 0.05) {
                        this.setState({
                          radius: 0.05,
                          size: 0.1,
                        });
                      }
                    } else if (zoomInfo.altitude <= 0.5) {
                      if (this.state.radius != 0.1) {
                        if (this.state.texture != worldTexture2) {
                          this.setState({
                            texture: worldTexture2,
                          });
                        }
                        this.setState({
                          radius: 0.1,
                          size: 0.2,
                        });
                      }
                    } else {
                      if (this.state.radius != 0.3) {
                        this.setState({
                          radius: 0.3,
                          size: 0.4,
                        });
                      }
                    }
                  }}
                />
              </div>
            );
          }}
        </SizeMe>
      </div>
    );
  }
}

export default App;
