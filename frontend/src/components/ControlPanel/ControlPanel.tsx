// React
import {Dispatch, SetStateAction, useEffect, useState} from 'react';

// Material UI
import Button from '@mui/material/Button';
import {Box, Slide} from '@mui/material';

// Types
import BusRoute from '../../types/BusRoute';
import BusStop from '../../types/BusStop';
type DirectionsResult = google.maps.DirectionsResult;

// Components
import ShowRouteButton from './ShowRouteButton/ShowRouteButton';
import RouteSelectionPanel from './RouteSelectionPanel/RouteSelectionPanel';
import StopSelectionPanel from './StopSelectionPanel/StopSelectionPanel';
import BusMeButton from './BusMeButton/BusMeButton';


interface Props {
  startSelection: BusStop | undefined;
  setStartSelection: Dispatch<SetStateAction<BusStop | undefined>>;
  finishSelection: BusStop | undefined;
  setFinishSelection: Dispatch<SetStateAction<BusStop | undefined>>;
  routeSelection: BusRoute | undefined;
  setRouteSelection: Dispatch<SetStateAction<BusRoute | undefined>>;
  setPrediction: Dispatch<SetStateAction<number | undefined>>;
  setDirections: Dispatch<SetStateAction<DirectionsResult | null>>;
}

// Animation Bug Fix Credit:
// https://stackoverflow.com/questions/55647969/how-to-get-one-elements-to-slide-in-while-the-other-slides-out-using-react-and

const ControlPanel = ({
                        startSelection,
                        setStartSelection,
                        finishSelection,
                        setFinishSelection,
                        routeSelection,
                        setRouteSelection,
                        setPrediction,
                        setDirections,
                      }: Props): JSX.Element => {

  const [busRoutes, setBusRoutes] = useState<BusRoute[]>([])

  const [dateTimeSelection, setDateTimeSelection] =
      useState<Date | undefined>(new Date());

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const localStorageRoutes: string | null =
      localStorage.getItem('bus_routes');

    if (localStorageRoutes) {
      setBusRoutes(JSON.parse(localStorageRoutes));
    } else {
      fetch('http://ipa-002.ucd.ie/api/bus_routes/')
        .then((response) => {
          if (response.ok) {
            return response.json() as Promise<BusRoute[]>;
          } else {
            throw new Error();
          }
        })
        .then((data) => {
          setBusRoutes(data);
          localStorage.setItem('bus_routes', JSON.stringify(data))
        })
        .catch((error) => console.log(error));
    }
  }, [])

  const resetSelections = () => {
    if (checked) {
      setStartSelection(undefined)
      setFinishSelection(undefined)
      setPrediction(undefined)
      setRouteSelection(undefined)
      setDirections(null)
    }
  }

  const slideHandler = () => {
    setChecked((prev) => !prev);
    resetSelections();
  };

  const toggleText = () => {
    if (checked) {
      return 'SELECT ROUTE';
    } else {
      return 'SELECT STATIONS';
    }
  };

  const toggleDisableHandler = (): boolean => {
    return routeSelection === undefined;
  }

  return <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      m={2}
    >
    {!checked ? (
      <Slide
        direction={'up'}
        in={!checked}
        mountOnEnter
        unmountOnExit
      >
        <div>
          <RouteSelectionPanel
            busRoutes={busRoutes}
            routeSelection={routeSelection}
            setRouteSelection={setRouteSelection}
          />
        </div>
      </Slide>
    ) : null}
    {checked ? (
      <Slide
        direction={'up'}
        in={checked}
        mountOnEnter
        unmountOnExit
      >
        <div>
            <StopSelectionPanel
              busRoutes={busRoutes}
              routeSelection={routeSelection}
              startSelection={startSelection}
              setStartSelection={setStartSelection}
              finishSelection={finishSelection}
              setFinishSelection={setFinishSelection}
              dateTimeSelection={dateTimeSelection}
              setDateTimeSelection={setDateTimeSelection}
            />
        </div>
      </Slide>
    ) : null}
    <Button
      onClick={slideHandler}
      disabled={toggleDisableHandler()}
    >
      {toggleText()}
    </Button>
    <BusMeButton
        routeSelection={routeSelection}
        startSelection={startSelection}
        finishSelection={finishSelection}
        dateTimeSelection={dateTimeSelection}
        setPrediction={setPrediction}
    />
    <ShowRouteButton
        startSelection={startSelection}
        finishSelection={finishSelection}
        setDirections={setDirections}
    />
  </Box>;
};

export default ControlPanel;