import {Dispatch, SetStateAction, useEffect, useState} from 'react';

import {Box} from '@mui/material';

import BusStop from '../../types/BusStop';

import WeatherCard from './WeatherCard/WeatherCard';
import ResultsCard from './ResultsCard/ResultsCard';
import Map from './Map/Map';
import Weather from "../../types/Weather";

interface Props {
    prediction: number | undefined,
    startSelection: BusStop | undefined,
    finishSelection: BusStop | undefined,
    setPrediction: Dispatch<SetStateAction<number | undefined>>,
}

const DisplayPanel = ({
  prediction,
  startSelection,
  finishSelection,
  setPrediction,
}: Props): JSX.Element => {
  // Icon credit: https://github.com/yuvraaaj/openweathermap-api-icons
  const [weather, setWeather] = useState<Weather>()

  useEffect(() => {
    fetch('http://ipa-002.ucd.ie/api/current_weather/')
      .then((response) => response.json() as Promise<Weather>)
      .then(setWeather)
  }, [])


  return <Box sx={{position: 'relative', zIndex: 0}}>
    {(weather) ? <WeatherCard weather={weather}/> : null}
    {(prediction) ?
    <Box sx={{
      position: 'absolute',
      zIndex: 1,
      top: '25%',
      left: '33%',
    }}>
      <ResultsCard
        duration={prediction}
        setPrediction={setPrediction}/>
    </Box> :
    null}

    <Map
      startSelection={startSelection}
      finishSelection={finishSelection}
    />
  </Box>;
};

export default DisplayPanel;
