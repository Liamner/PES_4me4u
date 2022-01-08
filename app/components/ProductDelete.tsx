import React, { Component } from "react";
import { StyleSheet, Button, Alert, TouchableOpacity, FlatList} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import axios from 'axios'

/*
import ProductDelete from '../components/ProductDelete';

<ProductDelete children= ID_DEL_PRODUCTO_A_BORRAR />
*/


type DeleteProps = {
  id: string,
  token: string
}


export function ProductDelete  ({ id, token}: DeleteProps) {
//class ProductDelete extends Component {

    const APIDeleteProduct= (id: string) =>{

        const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
  
        axios.delete('https://app4me4u.herokuapp.com/api/product/delete/'+ id, config)
        .then(res => {
                console.log(res);
                console.log('EXITO, producto borrado');
            })
        .catch(function (error) {
            console.log(error);
            console.log('ERROR, no se ha borrado');

        })
    }



    //Alerta de confirmación de borrado
    const deleteConfirmationAlert = (id: string) =>
    Alert.alert(
      "Alerta",
      "¿Está seguro de que desea borrar el producto seleccionado?",
      [
        {
          text: "No",
//          onPress: () => console.log("Cancel Pressed"),
        },
        { text: "Sí", onPress: () => APIDeleteProduct(id) }
      ]
    );

        return (
            <View style= {styles.button}>

                <Button 
                onPress={() => deleteConfirmationAlert( id )}
                title = "Borrar" 
                color="#FF0000"//color de fondo rojo
                />

            </View>

        )
}

const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 2,
      margin : 10,
      borderRadius: 4,
      elevation: 3,
      width: '75%',    
      backgroundColor: '#a2cff0',
    }});

export default ProductDelete;


