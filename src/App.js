import React, { useState } from "react";
import "./App.css";
import getLocation from "./getLocation";
import timeConversion from "./timeConversion";

// Global Precipitation Maps
// https://openweathermap.org/api/global-precipitation-map
// ENDPOINT:
// https://maps.openweathermap.org/maps/2.0/radar/{z}/{x}/{y}?appid={API key}&tm={date}

const api = {
  key: process.env.REACT_APP_API_KEY,
  base: "https://api.openweathermap.org/data/2.5",
};

const namesOfDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const namesOfMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const dateReturn = () => {
  let d = new Date();
  let day = namesOfDays[d.getDay()];
  let date = d.getDate();
  let month = namesOfMonths[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${month} ${date}, ${year}`;
};

function App() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState({});

	console.log(getLocation())

  const search = (event) => {
    if (event.key === "Enter") {
      fetch(`${api.base}/weather?q=${query}&units=imperial&APPID=${api.key}`)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setQuery("");
        })
        .catch((err) => {
          setData(err);
          setQuery("");
        });
    }
  };

  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        {typeof data.main === "undefined" ? (
          <React.Fragment>
            <div className="location-box">
              <div className="location">
                <div>Please search for your city</div>
                <div>{data.message}</div>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="location-box">
              <div className="location">
                {data.name}, {data.sys.country}
              </div>
              <div className="date">{dateReturn()}</div>
            </div>
            <div className="weather-box">
              <div className="temperature">
                {Math.floor(data.main.temp)}°
                <div className="temperature-highlow">
                  Low: {Math.floor(data.main.temp_min)}° High:{" "}
                  {Math.floor(data.main.temp_max)}°
                </div>
              </div>
              <div className="weather">{data.weather[0].description}</div>
              <div className="weather feels-like">
                Feels like {Math.floor(data.main.feels_like)}°
              </div>
              {/* add a clouds function that returns an image based on the percentage */}
              <div className="weather clouds">
                Cloudiness: {data.clouds.all / 100}%
              </div>
              <div className="weather sunrise">
                Sunrise: {timeConversion(data.sys.sunrise)}
              </div>
              <div className="weather sunset">
                Sunset: {timeConversion(data.sys.sunset)}
              </div>
								

            </div>
          </React.Fragment>
        )}
      </main>
    </div>
  );
}

export default App;
