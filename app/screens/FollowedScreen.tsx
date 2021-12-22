import { isTemplateElement } from '@babel/types';
import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Image, FlatList, TouchableHighlight, ScrollView, Alert, Button } from 'react-native';
import { CustomMap, CustomMarker} from '../components/MapComponents';


import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import Layout from '../constants/Layout';
import ViewUser from '../screens/UserRead';	

import axios from 'axios';


  export default function FollowedScreen({ route, navigation }: RootTabScreenProps<'FollowedScreen'>) {
    const {list} = route.params;


    

    const onPressUser = (id) => {
       navigation.navigate("UserRead", id);
      };
 

    return(
        
      <View style ={styles.container}>

        <FlatList
          contentContainerStyle={styles.container}
          keyExtractor={(item) => item.email}
          data = {list}
          renderItem={({ item }) => (

              <Text style={styles.item}   onPress={() => onPressUser(item._id)}>
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
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    item: {
      marginVertical: 8,
      marginHorizontal: 16,
    }
  });
  