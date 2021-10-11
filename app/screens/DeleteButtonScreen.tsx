import * as React from 'react';
import { StyleSheet, Button, Alert, TouchableOpacity, FlatList} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';













export default function DeleteButtonScreen({ navigation }: RootTabScreenProps<'DeleteButton'>) {
  //Datos
  const [data, setData] = React.useState([
    {
      id: "1",
      title: "BORRAR 1",
    },
    {
      id: "2",
      title: "BORRAR 2",
    },
    {
      id: "3",
      title: "BORRAR 3",
    },
  ]);

const removeItem = (id) => {
  setData((prevData) => { // obtenemos a la persona que habiamos pulsado
    return prevData.filter (data => data.id  != id); //si el id de la persona anterior no coincide con el id actual se borra de la array (op filter)
  });
};
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>†Delete Button†</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
 






      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
        horizontal={false}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
/*
            <TouchableOpacity

              style={styles.button}
              onPress={() => removeItem(item.id)}
            >
              <Text> ¡¡¡ AUTODESTRUCCIÓN !!! </Text>
            </TouchableOpacity>
            
*/
          <Button
          onPress={() => removeItem(item.id)}
          title = "Kaboooom!"
          color="#FF0000"
          />
          );
        }}
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  flatList: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
  }
});
