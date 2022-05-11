import React, {Component} from 'react';
import axios from 'axios';
import {
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import geolocation from 'react-native-geolocation-service';

import PlaceInput from './PlaceInput';

import PolyLine from '@mapbox/polyline';
import {Polyline} from 'react-native-maps';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasMapPermission: false,
      userLatitude: 0,
      userLongitude: 0,
      destinationCoords: [],
    };
    this.locationWatchId = null;
    this.showDirectionOnMap = this.showDirectionOnMap.bind(this);
    this.map = React.createRef();
  }

  componentDidMount() {
    this.requestFineLocation();
  }
  componentWillUnmount() {
    geolocation.clearWatch(this.locationWatchId);
  }
  //for hiding the keyboard
  hideKeyboard() {
    Keyboard.dismiss();
  }

  //fetching user position using geolocation
  getUserPosition() {
    this.setState({hasMapPermission: true});

    this.locationWatchId = geolocation.getCurrentPosition(
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
  //fetching the destination coords
  async showDirectionOnMap(placeId) {
    const {userLatitude, userLongitude} = this.state;
    try {
      const result = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${userLatitude},${userLongitude}&destination=place_id:${placeId}&key=AIzaSyBJfSotOtbe2zSxJNiFEHdZmQJ5pClHrO4`,
      );

      //here we get the points
      const points = PolyLine.decode(
        result.data.routes[0].overview_polyline.points,
      );
      //mapping those points
      const latLng = points.map(point => ({
        latitude: point[0],
        longitude: point[1],
      }));

      this.setState({destinationCoords: latLng});
      this.map.current.fitToCoordinates(latLng, {
        edgePadding: {top: 40, bottom: 40, left: 40, right: 40},
      });
      console.log(latLng);
    } catch {
      console.error(err);
    }
  }

  //location finding
  async requestFineLocation() {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.getUserPosition();
        }
      } else {
        this.getUserPosition();
      }
    } catch (error) {
      console.warn(error);
    }
  }

  render() {
    let polyLine =
      this.state.destinationCoords.length > 0 ? (
        <Polyline
          coordinates={this.state.destinationCoords}
          strokeColor="green"
          strokeWidth={6}
        />
      ) : null;
    if (this.state.hasMapPermission) {
      return (
        <TouchableWithoutFeedback onPress={this.hideKeyboard}>
          <View style={styles.container}>
            <MapView
              ref={this.map}
              showsUserLocation
              zoomControlEnabled={true}
              followsUserLocation
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={styles.map}
              region={{
                latitude: this.state.userLatitude,
                longitude: this.state.userLongitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}>
              {polyLine}
            </MapView>
            <PlaceInput
              showDirectionOnMap={this.showDirectionOnMap}
              userLatitude={this.state.userLatitude}
              userLongitude={this.state.userLongitude}
            />
          </View>
        </TouchableWithoutFeedback>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
