import React, { Component } from "react";
import { StyleSheet, Button, Alert, TouchableOpacity, FlatList} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import axios from 'axios'

class ProductDelete extends Component {

    APIDeleteProduct= (id: string) =>{
        axios
        .delete('https://app4me4u.herokuapp.com/api/product/delete/' + id /*616d6282bc69ccaa2163570e*/)
        .then(res => {
                console.log(res);
            })
        .catch(function (error) {
            console.log(error);
        })
    }


    render() {
        return (
            <Button
            onPress={() => deleteConfirmationAlert(item.id)}
            title = "Borrar"
            color="#FF0000"//color de fondo rojo
            />
        )
    }
}

export default ProductDelete;