// React
import React, {Dispatch, SetStateAction} from 'react';

import {Autocomplete, TextField} from '@mui/material';
// import theme from '../../App/BusMeTheme';

// Material UI
import {Autocomplete, AutocompleteRenderInputParams, TextField}
  from '@mui/material';

// Props
import BusStop from '../../../types/BusStop';
import BusRoute from '../../../types/BusRoute';

interface Props {
  busRoutes: BusRoute[]
  routeSelection: BusRoute | undefined;
  label: string;
  setSelection: Dispatch<SetStateAction<BusStop | undefined>>;
}

const BusStopDropdown = ({
  busRoutes,
  routeSelection,
  label,
  setSelection,
}: Props): JSX.Element => {
  const getBusStops = (): BusStop[] => {
    const currentRoute: BusRoute | undefined =
        busRoutes.find((route) => route === routeSelection);
    if (currentRoute) {
      return currentRoute['bus_stops'];
    } else {
      return [];
    }
  };

  const changeHandler = (
      event: React.SyntheticEvent<Element, Event>,
      value: BusStop | null,
  ) => {
    if (value) {
      setSelection(value);
    } else {
      throw new Error('Something has gone wrong with the route naming.');
    }
  };

  return <>
    <Autocomplete
      onChange={changeHandler}
      getOptionLabel={(option: BusStop) =>
        `${option.name}, Stop No.${option.number}`}
      options={getBusStops()}
      sx={{width: 300}}
      renderInput={(params: AutocompleteRenderInputParams) =>
        <TextField {...params} label={label}/>}
    />
  </>;
};

export default BusStopDropdown;
