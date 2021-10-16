import { isTemplateElement } from '@babel/types';
import * as React from 'react';

import { StyleSheet, Button, FlatList, Alert } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';








export default function ActualizarEstadoProducto({ navigation }: RootTabScreenProps<'ActualizarEstadoProducto'>) {
  //Datos
  const [data, setData] = React.useState([
    {
      id: "1",
      name: "Osito de pelucher",
      state: "Disponible"
    },
    {
      id: "2",
      name: "Coche",
      state: "Prestado"
    },
    {
      id: "3",
      name: "Libro",
      state: "Vendido"
    },
  ]);

  //Funcion que actualiza el estado de un producto en funcion del new_state pasado
  const updateStatus = (item: { id: string; name: string; state: string; }, new_state: string) => {
    item.state = new_state

    setData((prevData) => { 
      return prevData.filter (data => data.id  != null); 
    });
  };

  //Ventana que permite seleccionar el nuevo estado del objeto o volver a atras
  const updateStatusAlert = (item: { id: string; name: string; state: string; }) =>
    Alert.alert(
      "Introduce el nuevo estado",
      "Estado actual: " + item.state,
      [
        { text: "Disponible", onPress: () => updateStatus(item, "Disponible") },
        { text: "Prestado",   onPress: () => updateStatus(item, "Prestado") },
        { text: "Vendido",    onPress: () => updateStatus(item, "Vendido") },
        { text: "Cancelar"}
      ]
    );


  return(
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
              onPress={() => updateStatusAlert(item)}
              title = "Actualizar estado"
              color="#A2CFF0" //color de fondo establecido
            />
          </>
        )}
      />
    </View>
  );


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
