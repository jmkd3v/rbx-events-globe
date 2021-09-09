import ReactDOMServer from "react-dom/server";
import React, { useState, useEffect } from "react";
import Globe from "react-globe.gl";
import HoverItem from "./HoverItem";
import Nav from "./Nav.js";
import NavItem from "./NavItem.js";
import { SizeMe } from "react-sizeme";

function App() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    // load data
    fetch("https://events.rbx.com/api/chapter_region?chapters=true")
      .then((res) => res.json())
      .then((data) => {
        data = data[0].chapters;
        console.log(data);
        setPlaces(data);
      });
  }, []);

  return (
    <div className="flex flex-col h-full font-sans">
      <Nav>
        <NavItem href="/" isActive>
          Globe
        </NavItem>
        <NavItem href="/popular">Popular</NavItem>
        <NavItem href="/recent">Recent</NavItem>
      </Nav>
      <SizeMe monitorHeight>
        {({ size }) => {
          return (
            <div className="flex-1">
              <Globe
                width={size.width}
                height={size.height}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                labelsData={places}
                labelLat={(d) => d.latitude}
                labelLng={(d) => d.longitude}
                labelText={(d) => d.title}
                labelLabel={(d) =>
                  ReactDOMServer.renderToString(
                    <HoverItem data={d}></HoverItem>
                  )
                }
                labelSize={(d) => 0.5}
                onLabelClick={(d) => {
                  window.location.href = d.url;
                }}
                labelDotRadius={(d) => 0.5}
                labelColor={() => "#0099FF"}
                labelResolution={3}
                labelAltitude={(d) => 0.04}
              />
            </div>
          );
        }}
      </SizeMe>
    </div>
  );
}

export default App;
