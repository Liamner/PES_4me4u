import * as React from 'react';
import {ScrollView, StyleSheet, Pressable} from 'react-native';
import  Slider  from '@react-native-community/slider';
import axios from 'axios';
import { useState } from 'react';
import { Text, View } from '../components/Themed';
import { TextInput, Checkbox } from 'react-native-paper';
import { RootTabScreenProps } from '../types';
import { resolvePlugin } from '@babel/core';




export default function RateUser({ navigation }: RootTabScreenProps<'RateUser'>) {
  const [commentRate, onChangeComment] = React.useState("");
  const [sliderValue] = React.useState(4)
  const [sliderRate, setSliderRate] = React.useState(sliderValue);

  
  const [id, setid] = useState('61b66f564dfc200ae67a3eba'); 

  const sendApi = async () => {
    console.log("sending")
    const config = {
      headers: {
        Authorization: `Bearer  ${token}`
      }
    }
   
    let response = await axios.post('https://app4me4u.herokuapp.com/api/user/' + id + '/rate', {
      userId: id,
      rateScore: sliderRate,
      comment: commentRate
    }, config).then(function (response) {
      console.log(response);
    })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  return (
    <ScrollView>
        <View style={styles.container}>
            <Text style={[styles.title, { marginTop: 20 }]}> ¿Cómo evaluas esta transacción?</Text>

            <View
            style={styles.checkbox}>
            <Text >0</Text>

            <Slider
                step={1}
                style={{width: 250, height: 40}}
                minimumValue={0}
                maximumValue={5}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"

                onValueChange={(sliderValue) => {
                    console.log(sliderRate);
                    setSliderRate(sliderValue);
                    }}
                 
            />
            <Text >5</Text>

            </View>
            <Text style={[styles.title, { marginTop: 20 }]}> ¿Deseas añadir un comentario?</Text>

            <TextInput
                label="Comentario"
                style={styles.textInput}
                onChangeText={onChangeComment}
                value={commentRate}
            />
        

            <View
            style={{
                flexDirection: "row",
                marginTop: 30
            }}>

        </ View>

        
        <Pressable style={[styles.button, { backgroundColor: '#a2cff0' }]} onPress={sendApi} ><Text> Guardar valoración! </Text></Pressable>
        <Pressable style={[styles.button, { backgroundColor: '#a2cfff' }]}><Text> Cancelar </Text></Pressable>
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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    margin: 10,
    borderRadius: 4,
    elevation: 3,
    width: '90%',
    backgroundColor: '#a2cff0',
  },
  checkbox: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: 'center',
    width: '80%',
  },
  image: {
    marginHorizontal: 5,
    width: 100,
    height: 100,
    borderRadius: 10,
    borderColor: '#5e5c57',
    borderWidth: 3,
  },
  cameraImage: {
    width: 90,
    height: 90,
    marginTop: 1,
    marginLeft: 2,
    borderRadius: 3
  },
  notImage: {
    marginHorizontal: 5,
    width: 100,
    height: 100,
    borderRadius: 10,
    borderColor: '#5e5c57',
    borderWidth: 3,
    backgroundColor: '#F0F0F0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    width: '90%',
  },
  picker: {
    marginVertical: 10,
    height: 60,
    width: '90%',
  },
  textInput: {
    marginVertical: 15,
    height: 60,
    width: '90%',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  slider: {
    width: '80',
    opacity: 1,
    height: 50,
    marginTop: 10,
  },
});
