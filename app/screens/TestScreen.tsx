import * as React from 'react';
import { Button, Platform,ScrollView, Image, StyleSheet,Modal, Dimensions, FlatList, Pressable, TouchableOpacity, Alert } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import ProductCardElement from '../screens/ProductCardElement'
export default function TestScreen({ navigation }: RootTabScreenProps<'TestScreen'>) {
  return (    
    <>
      <View>            
      {/* <ProductCardElement> */}
    <Text style = {{color: 'white'}}> HOla</Text>
      
      </View>                    
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '50%',
    height: '50%',
    borderRadius: 10,
    borderColor: '#5e5c57',
    borderWidth: 3,
    backgroundColor: 'white',
  }, 
  cameraImage: {
    width: '100%', 
    height: '75%', 
    borderRadius: 7,
    alignItems: 'flex-start'
        
  },
  icono: {
    width: 30, 
    height: '100%',     
    alignItems: 'flex-start'    ,
    marginHorizontal: 2,
        
  },
  touchable: {
    width: '20%', 
    height: '100%',     
    borderRadius: 10,
    borderColor: 'green',
    alignItems: 'flex-start'   
        
        
  },
  title: {
    fontSize: 16,
    color: 'black',
    marginTop: '2%',
    marginLeft: '5%',
    width: '90%',
  },  
  textInput: {
    marginVertical: 15,
    height: 60,
    width: '90%',
  },  
});