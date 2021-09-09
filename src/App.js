import { useState, useEffect } from "react";
import Globe from "react-globe.gl";
import "./App.css";

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
    <div className="App">
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        labelsData={places}
        labelLat={(d) => d.latitude}
        labelLng={(d) => d.longitude}
        labelText={(d) => d.title}
        labelSize={0.5}
        labelDotRadius={0.1}
        labelColor={() => "rgba(255, 165, 0, 0.75)"}
        labelResolution={2}
      />
    </div>
  );
}

export default App;
