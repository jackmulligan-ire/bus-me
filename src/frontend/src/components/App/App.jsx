import '../../styles/main.css';
import Navbar from '../Navbar/Navbar';
import ControlPanel from '../ControlPanel/ControlPanel.jsx';
import WeatherCard from '../WeatherCard/WeatherCard';
import ResultsCard from '../ResultsCard/ResultsCard';


const App = () => {
  // Mock API data, to be updated pending discussion of state flow.
  const busStopsApi = require('../../mockdata/MOCK_BUS_STOPS.json');
  const weatherApi = require('../../mockdata/MOCK_WEATHER.json');

  return <>
    <Navbar />
    <ControlPanel busStops={busStopsApi}/>
    {/* Can be deleted, just for demo purposes*/}
    <div>
      <WeatherCard weather={weatherApi[0]}/>
      <ResultsCard duration={35}/>
    </div>
  </>;
};

export default App;
