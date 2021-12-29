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



class ProductDelete extends Component {

    APIDeleteProduct= (id: string) =>{
        axios
        .delete('https://app4me4u.herokuapp.com/api/product/delete/'+ id)
        .then(res => {
                console.log(res);
            })
        .catch(function (error) {
            console.log(error);
        })
    }




    //Alerta de confirmación de borrado
    deleteConfirmationAlert = (id: string) =>
    Alert.alert(
      "Alerta",
      "¿Está seguro de que desea borrar el producto seleccionado?",
      [
        {
          text: "No",
//          onPress: () => console.log("Cancel Pressed"),
        },
        { text: "Sí", onPress: () => this.APIDeleteProduct(id) }
      ]
    );

    render() {
        return (
            <Button
            onPress={() => this.deleteConfirmationAlert(this.props.children)}
            title = "YO" 
            color="#FF0000"//color de fondo rojo
            />
        )
    }
}

export default ProductDelete;


