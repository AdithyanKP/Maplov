import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
export default class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLatitude: 0,
      userLongitude: 0,
    };
  }
  componentDidMount() {
    Geolocation.getCurrentPosition(
      pos => {
        this.setState({
          userLatitude: pos.coords.latitude,
          userLongitude: pos.coords.longitude,
        });
        console.log(pos);
      },
      error => console.warn(error),
      {
        enableHighAccuracy: true,
      },
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView
          showsUserLocation
          followsUserLocation
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: this.state.userLatitude,
            longitude: this.state.userLongitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}></MapView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
