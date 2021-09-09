import ReactDOMServer from "react-dom/server";
import React, { useState, useEffect } from "react";
import Globe from "react-globe.gl";
import HoverItem from "./HoverItem";
import Nav from "./Nav.js";
import NavItem from "./NavItem.js";
import { SizeMe } from "react-sizeme";
import worldTexture from "./globes/world.jpg";
import worldTexture2 from "./globes/world2.jpg";
import { render } from "@testing-library/react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { places: [] };
  }

  componentDidMount() {
    fetch("https://events.rbx.com/api/chapter_region?chapters=true")
      .then((res) => res.json())
      .then((data) => {
        data = data[0].chapters;
        console.log(data);
        this.setState({
          places: data,
          texture: worldTexture,
        });
      });
  }

  render() {
    return (
      <div className="flex flex-col h-full font-sans">
        <Nav>
          <NavItem href="/" isActive>
            Globe
          </NavItem>
          <NavItem href="/popular">Popular</NavItem>
          <NavItem href="/recent">Recent</NavItem>
          <button
            onClick={() => {
              if (this.state.texture == worldTexture) {
                console.log("high");
                this.setState({
                  texture: worldTexture2,
                });
              } else {
                console.log("low");
                this.setState({
                  texture: worldTexture,
                });
              }
            }}
          >
            egg
          </button>
        </Nav>
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
                  labelText={(d) => d.title}
                  labelLabel={(d) =>
                    ReactDOMServer.renderToString(
                      <HoverItem data={d}></HoverItem>
                    )
                  }
                  labelSize={(d) => 0.4}
                  onLabelClick={(d) => {
                    window.location.href = d.url;
                  }}
                  labelDotRadius={(d) => 0.3}
                  labelColor={() => "#0099FF"}
                  labelResolution={3}
                  labelAltitude={(d) => 0.01}
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
