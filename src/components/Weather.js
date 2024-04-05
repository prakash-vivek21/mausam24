import React, { useEffect, useState } from "react";
const Weather = (props) => {
  const [weatherData, setData] = useState([]);

  useEffect(() => {
    const fetchWeather = async () => {
      if (props.loaded) {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${props.latitude}&lon=${props.longitude}&units=metric&appid=e141b9609cdc1264534bc8b5a2f7e702`
          );

          if (!response.ok) {
            throw new Error("unable to fetch data");
          }
          const data = await response.json();
          setData(data);
        } catch (error) {
          console.error("some error occurred" + error);
        }
      }
    };
    fetchWeather();
  }, [props.latitude, props.longitude, props.loaded]);

  const capitalise = (word) => {
    let lower = word.toLowerCase();
    return lower[0].toUpperCase() + lower.slice(1);
  };

  return (
    <div
      id="weatherbody"
      style={{ fontFamily: "Amaranth", fontSize: "larger" }}
    >
      {weatherData.length !== 0 && (
        <div
          class="card mb-3"
          style={{
            width: "30rem",
            zIndex: "1",
            display: "flex",
            justifyContent: "right",
            alignItems: "center",
            left: "50%",
            top: "100%",
            transform: "translate(-50% , -50%)",
            position: "absolute",
            maxWidth: "540px",
          }}
        >
          <div class="row g-0">
            <div class="col-md-4">
              <img
                src={
                  weatherData.weather &&
                  `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
                }
                class="img-fluid rounded-start"
                alt="..."
              />
            </div>
            <div class="col-md-8">
              <div className="card-body">
                <h1
                  className="card-title"
                  style={{ fontSize: "40px", color: "red" }}
                >
                  <b> {capitalise(props.cityname)}</b>
                </h1>
                <p className="card-text">
                  <b>Temperature:</b>{" "}
                  {weatherData.main && `${weatherData.main.temp} °C`}{" "}
                </p>
                <p>
                  <b> Minimum :</b>{" "}
                  {weatherData.main && `${weatherData.main.temp_min} °C`}
                </p>
                <p>
                  <b> Maximum :</b>{" "}
                  {weatherData.main && `${weatherData.main.temp_max} °C`}
                </p>
                <p>
                  <b>Feels Like : </b>
                  {weatherData.main && `${weatherData.main.feels_like} °C`}
                </p>
                <p>
                  <b> Pressure :</b>
                  {weatherData.main && `${weatherData.main.pressure} hPa`}
                </p>
                <p>
                  <b> Humidity :</b>{" "}
                  {weatherData.main && `${weatherData.main.humidity} %`}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
