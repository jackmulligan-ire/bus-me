// React
import React, {Dispatch, SetStateAction} from 'react';

// Props
import Button from '@mui/material/Button';
import {Box} from "@mui/material";

interface Props {
  setUserLocation: Dispatch<SetStateAction<google.maps.LatLng | undefined>>;
}

const GeoLocationButton = ({setUserLocation}: Props): JSX.Element => {

  // Icon credit: https://icon-icons.com/icon/user-location/72177
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
          setUserLocation(new google.maps.LatLng(position.coords.latitude, position.coords.longitude))
        },
        () => alert('Sorry, there has been an error - please try again later.'))
    }
    else {
      alert('Please enable browser permissions to use geolocation service.')
    }
  }

  return <>
    <Button
      variant={'contained'}
      onClick={() => getUserLocation()}
      style={{maxWidth: '30%'}}
    >
      <Box
        component={'img'}
        src={require(`../../../assets/geolocation.png`)}
        alt={'geolocation'}
        sx={{
        width: 35,
      }}>
      </Box>
    </Button>
  </>;
};

export default GeoLocationButton;
