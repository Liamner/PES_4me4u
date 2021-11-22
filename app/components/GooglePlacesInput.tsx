import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GooglePlacesInput = () => {
  return (
    <GooglePlacesAutocomplete
        styles={{
            container: {
            width: '90%',
            },
            textInput: {
            backgroundColor: '#FFFFFF',
            marginVertical: 15,
            height: 60,
            fontSize: 15,
            flex: 1,
            },
        }}
        placeholder='Ubicación'
        onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
        }}
        query={{
            key: 'AIzaSyC7JAeKR-u7CBU9vmztBqz-BIuhA8qu270',
            language: 'es',
        }}
    />
  );
};

export default GooglePlacesInput;