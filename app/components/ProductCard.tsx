import React, { Component } from "react";
import {Alert, Button, StyleSheet, View , Text, Image, TouchableOpacity} from "react-native";

import axios from 'axios'
import { not } from "react-native-reanimated";
import navigation from "../navigation";
import { functionExpression } from "@babel/types";

type CardProps = {
  navigation: any,
  id: string,
  name: string,
  guardado: boolean,
  imageUri?: string,
  arrayTratos: string[],
}

const guardarProducto = async () => {        
  console.log("guardar")
  }
const noGuardarProducto = async () => {          
  console.log("no guardar")  
}
export function ProductCard  ({navigation, id, name, guardado, imageUri, arrayTratos}: CardProps) {  
  var prestar = false;
  var intercambiar = true;
  var dar = false   
  arrayTratos.forEach(element => {
    if(element == "exchange") intercambiar = true;
    if(element == "give") dar = true;
    if(element == "loan") prestar = true
});
  return (
    <>
  <View style={styles.container}>
  <TouchableOpacity onPress= {()=> {navigation.navigate("ProductRead", id)}}>      
  <Image  source={{ uri: imageUri }}  style={styles.cameraImage} />  
  </TouchableOpacity>              
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
    backgroundColor: "#f3f1ed",     
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
    backgroundColor: "#f3f1ed",     
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
)

}
  console.log("hola")
const styles = StyleSheet.create({
    container: {
      width: '50%',
      height: 310,
      borderRadius: 10,
      borderColor: '#ffffff',
      borderWidth: 1,
      backgroundColor: '#f3f1ed',
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