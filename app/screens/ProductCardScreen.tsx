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

  const [guardado, setGuardado] = React.useState(false);  
  const [prestar, setPrestar] = React.useState(true);
  const [intercambiar, setIntercambiar] = React.useState(false);
  const [dar, setDar] = React.useState(true);

  const guardarProducto = async () => {        
    setGuardado(true);      
    }
  const noGuardarProducto = async () => {          
      setGuardado(false);
      }
  
  return (    
    <>
      <View style={styles.container}>            
      <Image source={require('../images/bicicleta.jpg')}  style={styles.cameraImage} />  

      <View
      style={{
        backgroundColor: "white",     
        flexDirection: "row",
        width: '100%',
        height: 30,
      }}
    >
        <View
      style={{
        backgroundColor: "white",     
        flexDirection: "row",
        width: '80%',
        height: '100%',
        alignContent: 'flex-end',
        paddingLeft: 10,
      }} >       
      {prestar &&  <Image source={require('../images/reloj.png')}  style={styles.icono} />  }
      {intercambiar && <Image source={require('../images/intercambio.png')}  style={styles.icono} />     }  
      {dar && <Image source={require('../images/regalo.png')}                 
                style={{
                  width: 30, 
                  height: '100%',     
                }}/>  }        
      </View>  

       <View
      style={{
        backgroundColor: "white",     
        flexDirection: "row",
        width: '20%',
        height: '100%',
      }} > 
      {guardado &&   <TouchableOpacity  style={{
               width: 30, 
               height: '100%',                             
            
            }} onPress={noGuardarProducto}>
            <Image source={require('../images/corazonRojo.png')}   style={{
             width: '100%', 
             height: '100%',               
            
            }}  />  
          </TouchableOpacity>  }    
          {!guardado &&   <TouchableOpacity  style={{
               width: 30, 
               height: '100%',             
            }} onPress={guardarProducto}>
            
            <Image source={require('../images/corazon.png')}   style={{
             width: '100%', 
             height: '100%',                     
            
            }} />  
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
