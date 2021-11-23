import React, { Component } from "react";
import { StyleSheet, Button, FlatList, Alert } from 'react-native';
import { Text, View } from '../components/Themed';
import axios from 'axios'
import { not } from "react-native-reanimated";
import navigation from "../navigation";

class ProductStateEdit extends Component {

    state = {
      id: '61768a008b251b960db42a49',
      name: 'HarryPotter',
      state: 'available'
    }

    putUpdateStatus = async (id: string, new_state: string) => {
        // 'available', 'reserved', 'provide'
        // disponible , reservado,  prestado
        axios
        .put('https://app4me4u.herokuapp.com/api/product/updateState/' + id, { state: new_state } )
        .then(response => {
            /*setData(response.data as {});*/
        })
        .catch(function (error) {
            console.log(error);
        })
    };

    updateStatus = (item: { id: string; name: string; state: string; }, new_state: string) => {
        item.state = new_state
        this.putUpdateStatus(item.id, new_state);
        this.setData((prevData) => { 
          return prevData.filter (data => data.id  != null); 
        });
      };

    updateStatusAlert = (item: { id: string; name: string; state: string; }) =>
    Alert.alert(
      "Introduce el nuevo estado",
      "Estado actual: " + item.state,
      [
        { text: 'available', onPress: () => this.updateStatus(item, 'available') },
        { text: 'reserved', onPress: () => this.updateStatus(item, 'reserved') },
        { text: 'provide', onPress: () => this.updateStatus(item, 'provide') },
        { text: 'Cancelar'}
      ]
    );

    render() {
        return (
        <View style ={styles.container}>
        <FlatList
            contentContainerStyle={styles.container}
            keyExtractor={(item) => item.id}
            data = {data}
            renderItem={({ item }) => (
            <>
                <Text style={styles.item}>
                {item.name} estado: {item.state}
                </Text>
                <Button
                onPress={() => this.updateStatusAlert(item)}
                title = "Actualizar estado"
                color="#A2CFF0" //color de fondo establecido
                />
            </>
            )}
        />
        </View>
       )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    }
  });
  

  export default ProductStateEdit;