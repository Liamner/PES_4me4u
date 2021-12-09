import { isTemplateElement } from '@babel/types';
import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Image, FlatList, TouchableHighlight, ScrollView, Alert, Button } from 'react-native';
import { CustomMap, CustomMarker} from '../components/MapComponents';


import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import Layout from '../constants/Layout';
import DeleteUser from '../components/DeleteUser';

import axios from 'axios';


export default function FollowersScreen({ navigation, user_id, list }: RootTabScreenProps<'FollowersScreen'>) {

    const list2= [
        { email:'a@mail.algo',
        level: '1',
        ecoPoints: '10',
        score: '5.0',
        latitude: 39.03385,
        longitude: 125.75432}
    ];
        

    const onPressUser = (id) => {

            navigation.navigate("UserRead", id);
      };

    return(
        
      <View style ={styles.container}>
        <FlatList
          contentContainerStyle={styles.container}
          keyExtractor={(item) => item.email}
          data = {list2}
          renderItem={({ item }) => (

              <Text style={styles.item}   onPress={() => onPressUser(item.email)}>
                {item.email}
              </Text>
          )}
        />
      </View>

    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    }
  });
  