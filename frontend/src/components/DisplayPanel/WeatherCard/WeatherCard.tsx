// Components
import WeatherCardInfoItem from './WeatherCardInfoItem/WeatherCardInfoItem';

// Material UI
import {Box, Card, CardContent, CardMedia} from '@mui/material';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BookIcon from '@mui/icons-material/Book';

// Types
import Weather from '../../../types/Weather';
import {useEffect, useState} from "react";

const WeatherCard = (): JSX.Element => {

  // Icon credit: https://github.com/yuvraaaj/openweathermap-api-icons
  const [weather, setWeather] = useState<Weather>({
    icon: '10d',
    date: 'Loading',
    weatherText: 'Loading',
    temperature: 'Loading'
  })

  useEffect(() => {
    fetch('http://ipa-002.ucd.ie/api/current_weather/')
      .then((response) => response.json() as Promise<Weather>)
      .then(setWeather)
  }, [])

  console.log(weather);

  const {icon, date, weatherText, temperature}: Weather = weather;

  return <Card sx={{display: 'inline-block'}}>
    <Box sx={{display: 'flex',
      flexDirection: 'row'}}
    >
      <CardMedia
        component={'img'}
        image={require(`../../../assets/weather-icons/${icon}.png`)}
        alt={'current weather'}
        width={'50'}
        sx={{width: 120}}
      />
      <CardContent sx={{pt: 2.7,
        alignItems: 'center'}}
      >
        <WeatherCardInfoItem
          icon={<CalendarMonthIcon sx={{color: '#FFFFFF'}}/>}
          text={date}
        />
        <WeatherCardInfoItem
          icon={<BookIcon sx={{color: '#FFFFFF'}}/>}
          text={weatherText}
        />
        <WeatherCardInfoItem
          icon={<DeviceThermostatIcon sx={{color: '#FFFFFF'}}/>}
          text={`${temperature.substring(0,2)}°C`}
        />
      </CardContent>
    </Box>
  </Card>;
};

export default WeatherCard;
