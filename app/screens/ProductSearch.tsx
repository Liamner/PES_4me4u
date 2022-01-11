import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, ScrollView, TextInput, Button, Alert, Modal, Pressable, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
import ProductCard from '../components/ProductCard';
import NavigationBar from '../components/NavigationBar';
import { LinearGradient } from 'expo-linear-gradient';
import retrieveSession from '../hooks/retrieveSession';


export default function ProductSearch({ navigation, route }: RootTabScreenProps<'ProductSearch'>) {
  const [products, setProducts] = useState(null);
  const [text, onChangeText] = useState(null);
  const [category, setCategory] = useState(route.params);
  const [type, setType] = useState();
  const [session, setSession] = React.useState({
    id: "",
    user: "",
    token: ""
  });

  const getData = async () => {
    try {
      const value = await retrieveSession()
      if (value !== null) {
        setSession(value)
      }
      else {
        console.log("empty")
      }
    } catch (e) {
      console.log(e)
    }
    console.log(session)
  }
  console.log("categoria: " + route.params)
  const getPNameInfo = async () => {
    console.log('haciendo llamada ...');
    let response = await axios.get('https://app4me4u.herokuapp.com/api/filter/products', {
      params: {
        category: category,
        exchange: type,
        productName: text
      }
    });
    setProducts(response.data);
    console.log(response.data)
    console.log('llamada hecha');
  };
  React.useEffect(() => {
    getData()
    if (route.params != null) getPNameInfo();
  }, []);

  return (
    <View style={styles.container}>
    <ScrollView style={{ flex: 1 }}>

      <View style={[styles.row]}>
        <TextInput
          style={{ width: '80%' }}
          onChangeText={onChangeText}
          value={text}
          placeholder="Buscar..."
        />
{/*}        <Button
          style={{ width: '10%' }}
          onPress={getPNameInfo}
          title="Buscar"
        />*/}

        <TouchableOpacity
          onPress={getPNameInfo}
          style={{ width: '20%', marginTop: 5 }}
        >
          <LinearGradient
            colors={['#a2cff0', '#ADE8F4']}
            style={styles.followButon}
          >
            <Text style={[styles.textFollow,
            { color: '#fff' }]}>
              Buscar
            </Text>
          </LinearGradient>
        </TouchableOpacity>

      </View>
      <View style={styles.row}>
        <Picker
          style={{ width: '50%' }}
          selectedValue={category}
          onValueChange={(itemValue, itemIndex) =>
            setCategory(itemValue)}
        >
          <Picker.Item label="Categoria" />
          <Picker.Item label="fashion" value="fashion" />
          <Picker.Item label="computer" value="computer" />
          <Picker.Item label="homeApplicances" value="homeApplicances" />
          <Picker.Item label="sports" value="sports" />
          <Picker.Item label="home" value="home" />
          <Picker.Item label="videogames" value="videogames" />
          <Picker.Item label="movies" value="movies" />
          <Picker.Item label="children" value="children" />
          <Picker.Item label="construction" value="construction" />
          <Picker.Item label="pets" value="pets" />
          <Picker.Item label="games" value="games" />
          <Picker.Item label="other" value="other" />
        </Picker>
        
        <Picker
          style={{ width: '50%' }}
          selectedValue={type}
          onValueChange={(itemValue, itemIndex) =>
            setType(itemValue)}
        >
          <Picker.Item label="Tipo intercambio" />
          <Picker.Item label="Prestar" value="provide" />
          <Picker.Item label="Intercambiar" value="exchange" />
          <Picker.Item label="Dar" value="present" />
        </Picker>
      </View>
      <FlatList
        numColumns={2}
        data={products}
        renderItem={({ item }) => (
          <ProductCard id={item._id} navigation={navigation} name={item.name} guardado={false} arrayTratos={item.exchange} imageUri={item.img[0].url} uid={session.id} token={session.token} />
        )}
        keyExtractor={item => item._id}
      />
    </ScrollView>

      <NavigationBar navigation={navigation} search={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: '5%',
    marginVertical: 5,
  },
  followButon: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7
  },
  textFollow: {
    fontSize: 18,
    fontWeight: 'bold'
  },
});


