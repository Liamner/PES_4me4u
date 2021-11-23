import React, { Component } from "react";
import {Alert, Button, StyleSheet, View , Text, Image, TouchableOpacity} from "react-native";

import axios from 'axios'
import { not } from "react-native-reanimated";
import navigation from "../navigation";

type CardProps = {
  name: string,
  prestar: boolean,
  intercambiar: boolean,
  regalar: boolean,
  guardado: boolean,
  imageUri?: string,
}
const guardarProducto = async () => {        
  console.log("guardar")  
  }
const noGuardarProducto = async () => {          
  console.log("no guardar")  
    //setGuardado(false);
}

export const ProductCard = ({ name,  prestar, intercambiar, regalar, guardado, imageUri}: CardProps) =>
<>
<View style={styles.container}>            
<Image  source={{ uri: imageUri }}  style={styles.cameraImage} />  
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
{regalar && <Image source={require('../images/regalo.png')}                 
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
<Text style={styles.title}>{name}</Text>   
</View>                    
</>

  
const styles = StyleSheet.create({
    container: {
      width: '50%',
      height: 310,
      borderRadius: 10,
      borderColor: '#5e5c57',
      borderWidth: 3,
      backgroundColor: 'white',
    }, 
    cameraImage: {
      width: '100%', 
      height: 220, 
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
  

export default ProductCard;