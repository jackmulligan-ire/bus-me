import {Autocomplete, TextField} from '@mui/material';
import React, {Dispatch, SetStateAction} from 'react';

type BusRoute = {
  id: string;
  name: string;
  bus_stops: BusStop[];
};

type BusStop = {
  id: string;
  name: string;
  number: number;
  latitude: string;
  longitude: string;
}

interface Props {
  busRoutes: BusRoute[];
  setBusRoutes: Dispatch<SetStateAction<BusRoute[]>>;
  busStops: BusStop[];
  setBusStops: Dispatch<SetStateAction<BusStop[]>>;
}

const BusRouteDropdown = ({busRoutes, setBusStops}: Props): JSX.Element => {
  const changeHandler = (
      event: React.SyntheticEvent<Element, Event>,
      value: BusRoute | null,
  ) => {
    if (value) {
      setBusStops(value.bus_stops);
    } else {
      throw new Error('Something has gone wrong with the route naming.');
    }
  };

  return <>
    <Autocomplete
      getOptionLabel={(option: BusRoute) => option.name}
      options={busRoutes}
      onChange={changeHandler}
      sx={{width: 300}}
      renderInput={(params) => <TextField {...params} label={'Select Route'}/>}
    />
  </>;
};

export default BusRouteDropdown;
