import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import KeepAwake from 'react-native-keep-awake';
import MapboxGL from "@react-native-mapbox-gl/maps";
import Geolocation from '@react-native-community/geolocation';


const APIKEY = "YOUR_MAPBOX_TOKEN";
MapboxGL.setAccessToken(APIKEY);
MapboxGL.setConnected(true);
MapboxGL.setTelemetryEnabled(false);

Geolocation.setRNConfiguration({skipPermissionRequests: false, authorizationLevel: "auto"});

const App = () => {
  const [coords, setCoords] = useState([0, 0]);
  const camRef = useRef(null);
  const mapRef = useRef(null);
  const hasCoords = () => (coords[0] !== 0 && coords[1] !== 0);

  useEffect(() => {
    async function getPermissionLocation() {

      const geo = await Geolocation.getCurrentPosition(
        (location) => setCoords([location.coords.longitude, location.coords.latitude]),
        (err) => console.log(err),
        {enableHighAccuracy: true}
      );
    }
    getPermissionLocation();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.page}>
        {hasCoords() ? 
          <View style={styles.container}>
          <KeepAwake />  
          <MapboxGL.MapView style={styles.map}>
              <MapboxGL.Camera
                zoomLevel={16}
                animationMode={'flyTo'}
                animationDuration={6000}
                centerCoordinate={coords}
                ref={camRef}
              />     
              <MapboxGL.UserLocation animated={true} androidRenderMode={'normal'} showsUserHeadingIndicator={true} />

          </MapboxGL.MapView>
          </View>
          :
          <View style={styles.container}>
            <Text style={styles.info}>
              Bem vindo ao react app!
              Ligue seu GPS!
            </Text>
          </View>  
        }
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f2f2f2"
  },
  info: {
    color: '#222',
    fontWeight: '600',
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center'
  },
  map: {
    flex: 1
  }
});

export default App;
