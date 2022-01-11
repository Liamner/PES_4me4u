import React, { Component } from "react";
import {Alert, Button, StyleSheet, View , Text, Image, TouchableOpacity} from "react-native";
import { useState } from 'react';

import axios from 'axios'
import { not } from "react-native-reanimated";
import navigation from "../navigation";
import { functionExpression } from "@babel/types";
import Icon from "react-native-vector-icons/Ionicons";

type CardProps = {
  id: string,
  uid: string
  // name: string,
   guardado: boolean,
  // imageUri?: string,
  // arrayTratos: string[],
  token: string
}


export function ProductCardId  ({ id, uid/*, name*/, guardado/*, imageUri, arrayTratos*/, token}: CardProps) {


  var prestar = false;
  var intercambiar = true;
  var dar = false;

//  var name = 'NNN';
  //var guardado = false;
 // var imageUri: String;
 //var arrayTratos: String[];

  const [name, setName] = useState('Cargando...');
  const [imageUri, setImageUri] = useState('https://64.media.tumblr.com/7edd9fa2812d2b50d054f3f6cd2feb6e/tumblr_inline_nso5kh0ba41si53ec_1280.png');
  const [arrayTratos, setArrayTratos] = useState([]);



  const APIGetInfoProduct = () =>{
    let response = axios.get('https://app4me4u.herokuapp.com/api/product/'+ id)
    .then(response => {

      

            // name = response.data.name;
            // imageUri = response.data.image[0].url;
            // arrayTratos = response.data.exchange;

            setName(response.data.name);
            setImageUri(response.data.img[0].url);
     
            setArrayTratos(response.data.exchange);

            //present
            //provide
            //provide


            arrayTratos.forEach(element => {
              if(element == "exchange"){
                intercambiar = true;
              } 
              if(element == "present"){
                dar = true;

              } 
              if(element == "provide"){
                prestar = true
              } 


            });


        })
    .catch(function (error) {
      console.log(error);
    });



};





  const guardarProducto = async () => {   
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    await axios.put('https://app4me4u.herokuapp.com/api/user/'+ uid +'/AddToWishlist', {
        idProduct: id
      }, config).then(function(response) {
        console.log(response);
        guardado = true;
      })
      .catch(function(error) {
        console.log(error);
      });
      console.log('PERRO');

    }
  
  const noGuardarProducto = async () => {  
    
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    await axios.delete('https://app4me4u.herokuapp.com/api/user/'+ uid +'/DeleteFromWishlist', {
        idProduct: id
      }, config).then(function(response) {
        console.log(response);
        guardado = false;
      })
      .catch(function(error) {
        console.log(error);
      }); 
      console.log('GATO');


  }

  React.useEffect(() => {
    APIGetInfoProduct();
  }, []);  


  return (
    
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
  {/*guardado &&   <TouchableOpacity  style={{
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
      </TouchableOpacity>  */}    

      {guardado?
        <TouchableOpacity style={{
          width: 30,
          height: '100%',
        }} onPress={noGuardarProducto}>
          <Icon name='heart' size={30} color={'red'} />
        </TouchableOpacity>
      :
        <TouchableOpacity style={{
          width: 30,
          height: '100%',
        }} onPress={guardarProducto}>
          <Icon name='heart-outline' size={30} color={'black'} />
        </TouchableOpacity>
      }

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
      width: '100%',
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
  

export default ProductCardId;