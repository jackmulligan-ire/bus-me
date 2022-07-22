// React
import React, {Dispatch, SetStateAction} from 'react';

// Material UI
import {Autocomplete, AutocompleteRenderInputParams, TextField}
  from '@mui/material';

// Types
import BusRoute from '../../../../types/BusRoute';

interface Props {
  busRoutes: BusRoute[];
  routeSelection: BusRoute | undefined;
  setRouteSelection: Dispatch<SetStateAction<BusRoute | undefined>>;
}

const BusRouteDropdown = ({busRoutes, routeSelection,
  setRouteSelection,
}: Props): JSX.Element => {

  const changeHandler = (
      event: React.SyntheticEvent<Element, Event>,
      value: BusRoute | null,
  ) => {
    if (value) {
      setRouteSelection(value);
    } else {
      throw new Error('Something has gone wrong with the route naming.');
    }
  };

  // Source: https://stackoverflow.com/questions/2802341/javascript-natural-sort-of-alphanumerical-strings
  const sortBusRoutes = (busRoutes: BusRoute[]): BusRoute[] => {
    return busRoutes.sort((a: BusRoute, b: BusRoute) => {
      return a.name.localeCompare(b.name, undefined, {
        numeric: true,
        sensitivity: 'base'
      });
    });
  };

  return <>
    <Autocomplete
      value={routeSelection || null}
      onChange={changeHandler}
      getOptionLabel={(option: BusRoute) =>
        `${option.name} (${option.bus_stops[0]['name']} to ${option.bus_stops[option.bus_stops.length - 1]['name']})`}
      options={sortBusRoutes(busRoutes)}
      sx={{width: 300}}
      renderInput={(params: AutocompleteRenderInputParams) =>
        <TextField {...params} label={'Select Route'}/>}
    />
  </>;
};

export default BusRouteDropdown;