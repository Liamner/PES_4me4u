import * as React from 'react';
import { Button, Platform,ScrollView, Image, StyleSheet,Modal, Dimensions, FlatList, Pressable, TouchableOpacity, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import EditScreenInfo from '../components/EditScreenInfo';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { Text, View } from '../components/Themed';
import { TextInput, Checkbox } from 'react-native-paper';
import { RootTabScreenProps } from '../types';
import { resolvePlugin } from '@babel/core';

export default function ProductCard({ navigation }: RootTabScreenProps<'ProductCard'>) {
  const [name, onChangeName] = React.useState("");  
  const [description, onChangeDescription] = React.useState("");  
  const [selectedCategory, setSelectedCategory] = React.useState();
  const [checkedDonar, setCheckedDonar] = React.useState(false);
  const [checkedIntercambiar, setCheckedIntercambiar] = React.useState(false);
  const [checkedPrestar, setCheckedPrestar] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [image2, setImage2] = React.useState(null);
  const [image3, setImage3] = React.useState(null);
  const [image4, setImage4] = React.useState(null);
  const [image5, setImage5] = React.useState(null);
  const [image6, setImage6] = React.useState(null);     
  const imageArray = [image, image2, image3, image4, image5, image6] ;  

  return (    
    <>
      <View style={styles.container}>            
      <Image source={require('../images/bicicleta.jpg')}  style={styles.cameraImage} />  
        <View 
         style={{
           height: '10%',
           //width: '50%',
          flexDirection: 'row',
          justifyContent: 'space-around',
          backgroundColor: 'white'
        
        }}>
          <View 
            style={{
             // height: '10%',
              //width: '50%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: 'white'
            
            }}>
            <Image source={require('../images/reloj.png')}  style={styles.iconoReloj} />  
            <Image source={require('../images/dar.png')}  style={styles.iconoDar} />  
            <Image source={require('../images/intercambio.png')}  style={styles.icono} />  

            </View>
          <Image source={require('../images/corazon.png')}  style={styles.icono} />  
      
         </View>
        <Text style={styles.title}>Bicicleta Decatlon 26''</Text>
      </View>                    
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
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
    borderRadius: 10,
    alignItems: 'flex-start'
        
  },
  icono: {
    width: '20%', 
    height: '100%',     
    alignItems: 'flex-start'    
        
  },
  iconoReloj: {
    width: '20%', 
    height: '100%',     
    alignItems: 'flex-start'    
        
  },
  iconoDar: {
    width: '20%', 
    height: '100%',     
    alignItems: 'flex-start',
    backgroundColor: 'white',
        
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
  title: {
    fontSize: 16,
    color: 'black',
    marginTop: '3%',
    marginLeft: '5%',
    width: '90%',
  },
  picker:{
    marginVertical: 10,
    height: 60,
    width: '90%',        
  },
  textInput: {
    marginVertical: 15,
    height: 60,
    width: '90%',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
