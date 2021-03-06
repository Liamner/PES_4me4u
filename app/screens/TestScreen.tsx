import * as React from 'react';
import { Button, Platform,ScrollView, Image, StyleSheet,Modal, Dimensions, FlatList, Pressable, TouchableOpacity, Alert } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import * as ImagePicker from 'expo-image-picker';
import GiveButton from '../components/GiveButton';
import LoanButton from '../components/LoanButton';
import ExchangeButton from '../components/ExchangeButton';
import LogOutButton from '../components/LogOutButton';
import NavigationBar from'../components/NavigationBar';
import { WebView } from 'react-native-webview'; 
import { EcommuteAPI } from '../components/EcommuteAPI';

export default function TestScreen({ navigation }: RootTabScreenProps<'TestScreen'>) {
  const gatitos = { hola: "hola", adios: "adios"}

  return (    
    <>
    <View style={styles.margin}> 
    <GiveButton/>
    <LoanButton/>
    <ExchangeButton/>
    <LogOutButton navigation={navigation}/>
    <NavigationBar navigation={navigation}/>
    <EcommuteAPI origin={"Lloret de Mar"} destination= "tossa de mar"/>
    </View>
    </>
  );
}
const styles = StyleSheet.create({
  margin: {
   marginTop: 40
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
  notImage: {           
    marginHorizontal :5,    
    width: 100,
    height: 100 ,
    borderRadius: 10,
    borderColor: '#5e5c57',
    borderWidth: 3,
    backgroundColor: '#F0F0F0',    
  },
});
