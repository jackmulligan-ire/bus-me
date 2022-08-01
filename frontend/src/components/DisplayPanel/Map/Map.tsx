import {
  useLoadScript,
  DirectionsRenderer,
  GoogleMap,
  Marker,
  OverlayView,
  InfoWindow,
  Autocomplete, StandaloneSearchBox
} from '@react-google-maps/api';
import {Dispatch, SetStateAction, useState, useMemo} from 'react';
import {Container} from '@mui/material';
import InfoWindowContent from './InfoWindowContent/InfoWindowContent';

import BusStop from '../../../types/BusStop';
import BusRoute from '../../../types/BusRoute';
import LoadScreen from './LoadScreen/LoadScreen';
import MapSearchBar from '../MapSearchBar/MapSearchBar';

type DirectionsResult = google.maps.DirectionsResult;

interface Props {
  startSelection: BusStop | undefined,
  finishSelection: BusStop | undefined,
  directions: DirectionsResult | null,
  routeSelection: BusRoute | undefined,
  setStartSelection: Dispatch<SetStateAction<BusStop | undefined>>,
  setFinishSelection: Dispatch<SetStateAction<BusStop | undefined>>
};

const googleMapsLibraries: ("places" | "drawing" | "geometry" | "localContext" | "visualization")[] = ['places'];

const Map = (
  {startSelection, 
  finishSelection, 
  directions, 
  routeSelection,
  setStartSelection,
  setFinishSelection}: Props): JSX.Element => {
  const [customAddress, setCustomAddress] = useState<google.maps.LatLng | undefined>(undefined);

  const {isLoaded} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY as string, libraries: googleMapsLibraries
  });
  const centerCoords: google.maps.LatLngLiteral = useMemo(() => ({
    lat: 53.33947559137039,
    lng: -6.248868208190408,
  }), []);
  const mapOptions: google.maps.MapOptions = useMemo(() => ({
    mapId: "5a13c1894ab64113",
    streetViewControl: false,
    mapTypeControl: false,
    clickableIcons: false,
    fullscreenControl: false,
    minZoom: 10,
    restriction: {
      latLngBounds: {
        north: 53.63322,
        south: 53.11473,
        west: -6.85965,
        east: -5.77620,
      },
    },
  }), []);

  const [selectedMarker, setSelectedMarker] = useState<google.maps.LatLng | null>(null);
  return !(isLoaded) ?
    <LoadScreen/>:
    <Container
      disableGutters={true}
      className="map"
      maxWidth={false}>
      <MapSearchBar
        customAddress={customAddress}
        setCustomAddress={setCustomAddress}
      />
      <GoogleMap
        zoom={11.7}
        center={centerCoords}
        options={mapOptions}
        mapContainerStyle={{width: '100%', height: '100vh'}}>
        <>
        {(routeSelection) ?
        routeSelection.bus_stops.map((stop) => 
          <Marker
            key={stop.number}
            position={{
              lat: +stop.latitude,
              lng: +stop.longitude,
            }}
            icon = {{
              url: require(`../../../assets/bus_me_stop.png`),
              scaledSize: new google.maps.Size(17.5, 17.5)
            }}
            onClick = {(e) => setSelectedMarker(e.latLng)}
          >
            {(selectedMarker && selectedMarker.lat() === +stop.latitude &&
              selectedMarker.lng() === +stop.longitude) ?
                <InfoWindow
                position={{
                  lat: +stop.latitude,
                  lng: +stop.longitude,
                }}
                onCloseClick = {() => setSelectedMarker(null)}
                >
                  <InfoWindowContent 
                    stop={stop}
                    setStartSelection={setStartSelection}
                    startSelection={startSelection}
                    setFinishSelection={setFinishSelection}
                    finishSelection={finishSelection} />
                </InfoWindow>:
              null}
          </Marker>
        ): null}
        {(directions) ?
        <DirectionsRenderer 
          directions={directions}
          options={{
            polylineOptions: {
              strokeColor: "#002984",
              strokeWeight: 5,
              strokeOpacity: 0.75,
            },
            suppressMarkers: true,
          }}/>:
          null}
        </>
      </GoogleMap>
    </Container>;
};

export default Map;
