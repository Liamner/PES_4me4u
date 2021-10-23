import * as React from 'react';
import { StyleSheet } from 'react-native';

import Layout from '../constants/Layout';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

export type MapProps = MapView['props'];
export type MarkerProps = Marker['props'];


export const mapStyle = [
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#a2cff0',
        },
        {
          lightness: 50,
        },
      ],
    },
    {
      featureType: 'landscape',
      elementType: 'geometry',
      stylers: [
        {
          color: '#f5f5f5',
        },
        {
          lightness: 20,
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#ffffff',
        },
        {
          lightness: 17,
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#ffffff',
        },
        {
          lightness: 29,
        },
        {
          weight: 0.2,
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff',
        },
        {
          lightness: 18,
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff',
        },
        {
          lightness: 16,
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        {
          color: '#f5f5f5',
        },
        {
          lightness: 21,
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#dedede',
        },
        {
          lightness: 21,
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          visibility: 'on',
        },
        {
          color: '#ffffff',
        },
        {
          lightness: 16,
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          saturation: 36,
        },
        {
          color: '#333333',
        },
        {
          lightness: 40,
        },
      ],
    },
    {
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [
        {
          color: '#f2f2f2',
        },
        {
          lightness: 19,
        },
      ],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#fefefe',
        },
        {
          lightness: 20,
        },
      ],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#fefefe',
        },
        {
          lightness: 17,
        },
        {
          weight: 1.2,
        },
      ],
    },
  ];

export function CustomMap(props: MapProps) {
    const { style , ...otherProps } = props;

    return (
        <MapView
            customMapStyle={mapStyle}
            provider={ PROVIDER_GOOGLE }
            style={[styles.mapview, style]}
            scrollEnabled={false}
            zoomEnabled={false}
            zoomControlEnabled={false}
            {...otherProps}
        ></MapView>
    );
}

export function CustomMarker(props: MarkerProps) {
  const { coordinate, ...otherProps } = props;

  return (
      <Marker
      coordinate={coordinate}
      pinColor={'#a2cff0'}
      {...otherProps}
      ></Marker>
  );
}

const styles = StyleSheet.create({
    mapview: {
      width: Layout.width,
      height: Layout.width,
      alignSelf: 'center',
      marginTop: 5,
      marginBottom: 5,
    },
  });
  