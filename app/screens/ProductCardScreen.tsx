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
  const [guardado, setGuardado] = React.useState(false);
  console.log("guardado : " + guardado);

  const guardarProducto = async () => {    
    console.log("guardarProducto()");
    setGuardado(true);
      
    }
    const noGuardarProducto = async () => {    
      console.log("noGuardarProduco()");
      setGuardado(false);
        
      }
  
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
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: 'white'
            
            }}>
            <Image source={require('../images/reloj800.png')}  style={styles.icono} />  
            <Image source={require('../images/dar.png')}  style={styles.icono} />  
            <Image source={require('../images/intercambio.png')}  style={styles.icono} />      


            {!guardado &&   <TouchableOpacity  style={{
               width: '20%', 
               height: '100%',             
               
            
            }}
             onPress={guardarProducto}>
            <Image source={require('../images/noGuardado.png')}   style={{
             width: '100%', 
             height: '100%',        
            
            }} />  
          </TouchableOpacity>  }      
          {guardado &&   <TouchableOpacity  style={{
               width: '20%', 
               height: '100%',                             
            
            }} onPress={noGuardarProducto}>
            <Image source={require('../images/guardado.png')}   style={{
             width: '100%', 
             height: '100%',               
            
            }}  />  
          </TouchableOpacity>  }         
            </View>
            
         
         
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
    borderRadius: 7,
    alignItems: 'flex-start'
        
  },
  icono: {
    width: '20%', 
    height: '100%',     
    alignItems: 'flex-start'    
        
  },
  touchable: {
    width: '20%', 
    height: '100%',     
    borderRadius: 10,
    borderColor: 'green',
    //borderWidth: 3,
    alignItems: 'flex-start'   
        
        
  },
  iconoReloj: {
    width: '20%', 
    height: '100%',     
    alignItems: 'flex-start'    
        
  },
  iconoIntercambio: {
    width: '30%', 
    height: '100%',     
    alignItems: 'flex-start'    
        
  },
  iconoDar: {
    width: '30%', 
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
