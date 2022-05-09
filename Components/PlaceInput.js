import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import _ from 'lodash';
export default class PlaceInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      predictions: [],
      destinationInput: '',
    };
    this.getPlaces = this.getPlaces.bind(this);
    this.getPlacesDebounce = _.debounce(this.getPlaces, 100);
    this.setDestination = this.setDestination.bind(this);
  }

  //will get the place information
  async getPlaces(input) {
    const {userLatitude, userLonitude} = this.props;
    const result = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyBJfSotOtbe2zSxJNiFEHdZmQJ5pClHrO4&input=${input}&location=${userLatitude},${userLonitude}`,
    );
    console.log(result);
    this.setState({predictions: result.data.predictions});
  }

  //this will trigger when user clicks the prediction
  setDestination(main_text, place_id) {
    this.setState({destinationInput: main_text});
    this.setState({predictions: []});
    Keyboard.dismiss();

    //giving the placeid as a prop
    this.props.showDirectionOnMap(place_id);
  }
  render() {
    const {suggestionStyle, main_text, secondary_textStyle, PlaceHolder} =
      styles;
    console.log(this.state.predictions);
    const predictions = this.state.predictions.map(prediction => {
      const {id, structured_formatting, place_id} = prediction;
      return (
        <TouchableOpacity
          key={id}
          onPress={() =>
            this.setDestination(structured_formatting.main_text, place_id)
          }>
          <View style={suggestionStyle}>
            <Text style={main_text}>{structured_formatting.main_text}</Text>
            <Text style={secondary_textStyle}>
              {structured_formatting.secondary_text}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
    return (
      <View>
        <TextInput
          value={this.state.destinationInput}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={input => {
            this.setState({destinationInput: input});
            this.getPlacesDebounce(input); //debounce used for controlling unexpecting function calls
          }}
          style={PlaceHolder}
          placeholder="Where to go?"
        />
        {predictions}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  PlaceHolder: {
    height: 60,
    backgroundColor: 'white',
    marginTop: 50,
    padding: 5,
  },
  suggestionStyle: {
    backgroundColor: 'white',
    padding: 15,
  },
  secondary_textStyle: {
    color: '#777',
  },
  main_text: {
    color: 'black',
  },
});
