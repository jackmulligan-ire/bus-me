// CSS
import '../../styles/main.css';

// React
import {useState, useEffect} from 'react';

// Components
import Navbar from '../Navbar/Navbar';
import ControlPanel from '../ControlPanel/ControlPanel';
import DisplayPanel from '../DisplayPanel/DisplayPanel';

// Material UI
import ContactSection from '../ContactSection/ContactSection';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {ThemeProvider} from '@mui/material/styles';
//
// Types
import BusRoute from '../../types/BusRoute';
import BusStop from '../../types/BusStop';
import theme from './Theme';
import LoadScreen from "../DisplayPanel/Map/LoadScreen/LoadScreen";
import Appinfo from "../AppInfo/AppInfo";
import {Box, Container, Slide} from "@mui/material";
import AppInfo from "../AppInfo/AppInfo";
import Button from "@mui/material/Button";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const App = (): JSX.Element => {
  const [prediction, setPrediction] = useState<number | undefined>(undefined);
  const [startSelection, setStartSelection] =
      useState<BusStop | undefined>(undefined);

  const [finishSelection, setFinishSelection] =
      useState<BusStop | undefined>(undefined);

  const [routeSelection, setRouteSelection] =
      useState<BusRoute | undefined>(undefined);

  const [directions, setDirections] =
   useState<google.maps.DirectionsResult | null>(null);

  const [busStops, setBusStops] = useState<BusStop[]>([]);

  const [busRoutes, setBusRoutes] = useState<BusRoute[]>([]);

  useEffect(() => {
    const localStorageStops: string | null =
      localStorage.getItem('bus_stops');

      if (localStorageStops) {
        setBusStops(JSON.parse(localStorageStops));
      } else {
        fetch('http://ipa-002.ucd.ie/api/bus_stops/')
          .then((response) => {
            if (response.ok) {
              return response.json() as Promise<BusStop[]>;
            } else {
              throw new Error();
            }
          })
          .then((data) => {
            setBusStops(data);
            localStorage.setItem('bus_stops', JSON.stringify(data))
          })
          .catch((error) => console.log(error));
      }
  }, [])

  return <ThemeProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Navbar/>
      <ControlPanel
        startSelection={startSelection}
        setStartSelection={setStartSelection}
        finishSelection={finishSelection}
        setFinishSelection={setFinishSelection}
        routeSelection={routeSelection}
        setRouteSelection={setRouteSelection}
        setPrediction={setPrediction}
        setDirections={setDirections}
        busRoutes={busRoutes}
        setBusRoutes={setBusRoutes}
      />
      <DisplayPanel
        prediction={prediction}
        startSelection={startSelection}
        finishSelection={finishSelection}
        directions={directions}
        routeSelection={routeSelection}
        busStops={busStops}
        busRoutes={busRoutes}
        setStartSelection={setStartSelection}
        setFinishSelection={setFinishSelection}
        setRouteSelection={setRouteSelection}
      />
    </LocalizationProvider>
  </ThemeProvider>;
};

export default App;
