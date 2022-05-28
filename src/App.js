import "./App.css";

// Global Precipitation Maps
// https://openweathermap.org/api/global-precipitation-map
// ENDPOINT:
// https://maps.openweathermap.org/maps/2.0/radar/{z}/{x}/{y}?appid={API key}&tm={date}

const API_KEY = process.env.REACT_APP_API_KEY;

const api = {
  key: API_KEY,
  base: "https://api.openweathermap.org/data/2.5",
};

function App() {
  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="Search..." />
        </div>
        <div className="location-box">
          <div className="location"></div>
          <div className="date"></div>
        </div>
      </main>
    </div>
  );
}

export default App;
