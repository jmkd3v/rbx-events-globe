import { useState, useEffect } from "react";
import Globe from "react-globe.gl";
import "./App.css";

function App() {
  const [places, setPlaces] = useState([]);
  const [hoverD, setHoverD] = useState();

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
    <Globe
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      labelsData={places}
      labelLat={(d) => d.latitude}
      labelLng={(d) => d.longitude}
      labelText={(d) => d.title}
      labelLabel={(d) => `<div class="rbx-tooltip">${
        (d.picture.thumbnail_url &&
          `<img src="${d.picture.thumbnail_url}" />`) ||
        ""
      }
        ${d.title}<br>
        ${d.url}<br>
        ${d.city}, ${d.country}
      </div>`}
      labelSize={(d) => 1}
      onLabelClick={(d) => {
        window.location.href = d.url;
      }}
      onLabelHover={setHoverD}
      labelDotRadius={(d) => 1}
      labelColor={() => "#0099FF"}
      labelResolution={3}
      labelAltitude={(d) => (d === hoverD ? 0.07 : 0.06)}
      labelsTransitionDuration={300}
    />
  );
}

export default App;
