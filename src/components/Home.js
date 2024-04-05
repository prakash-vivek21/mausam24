import React, { useState } from "react";
import monsoonImg from "./monsoon.jpg";
import summer from "./summer.jpg";
import "./Home.css";
import Weather from "./Weather";

const Home = () => {
  const [input, setInput] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [cityLat, setCityLat] = useState(null);
  const [cityLong, setCityLong] = useState(null);
  const [qcity, setQcity] = useState("");
  const fetchCity = async () => {
    setQcity(input);

    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${qcity},IN&appid=e141b9609cdc1264534bc8b5a2f7e702`
      );

      if (!response.ok) {
        throw new Error("unable to fetch city");
      }
      const data = await response.json();

      const city = data[0];
      setCityLat(city.lat);
      setCityLong(city.lon);
      setLoaded(true);
    } catch (error) {
      console.error("unable to show weather" + error);
    }
    setInput("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchCity();
  };
  return (
    <div className="position-relative">
      <form id="search-form" onSubmit={handleSubmit}>
        <div id="search-bar">
          <div className="input-group input-group-lg">
            <span className="input-group-text" id="inputGroup-sizing-lg">
              City
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-lg"
              name="query"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Enter a valid city"
            />
            <button
              type="submit"
              className="btn"
              style={{ backgroundColor: "#d4dcf7" }}
            >
              <i
                className="bi bi-search"
                style={{ color: "#cb0003", fontWeight: "bold" }}
              ></i>
            </button>
          </div>
        </div>
      </form>
      <div className="container">
        <Weather
          latitude={cityLat}
          longitude={cityLong}
          cityname={qcity}
          loaded={loaded}
        />
      </div>

      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
        style={{ height: "300px" }}
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={monsoonImg}
              className="d-block mx-auto w-100"
              alt="monsoon"
            />
          </div>
          <div className="carousel-item">
            <img src={summer} className="d-block mx-auto w-100" alt="summer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
