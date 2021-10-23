import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function EditUserScreen({ navigation }: RootTabScreenProps<'EditUser'>) {
  const [name, onChangeName] = React.useState("");  
  const [firstSurname, onChangeFirstSurname] = React.useState("");  
  const [secondSurname, onChangeSecondSurname] = React.useState("");  
  return (
    <ScrollView>
      <View style={styles.container}>
        <TextInput
          label="Nombre"
          style={styles.textInput}       
          onChangeText={onChangeName}
          value={name}
        />   
        <TextInput
          label="Primer apellido"
          style={styles.textInput}       
          onChangeText={onChangeFirstSurname}
          value={firstSurname}
        />   
        <TextInput
          label="Segundo apellido"
          style={styles.textInput}       
          onChangeText={onChangeSecondSurname}
          value={secondSurname}
        />   
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <EditScreenInfo path="/screens/TabOneScreen.tsx" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    marginVertical: 15,
    height: 60,
    width: '90%',
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
});
