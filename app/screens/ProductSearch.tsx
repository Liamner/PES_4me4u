import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, ScrollView, TextInput, Button, Alert, Modal, Pressable, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
import ProductCard from '../components/ProductCard';

export default function ProductSearch({ navigation, route }: RootTabScreenProps<'ProductSearch'>) {
  const [products, setProducts] = useState();
  const [text, onChangeText] = useState(null);
  const [category, setCategory] = useState(null);
  const [type, setType] = useState(null);
  console.log("categoria: " + route.params)
  const getPNameInfo = async () => {
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
	
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TextInput
          style={{width: '80%'}}
          onChangeText={onChangeText}
          value={text}
          placeholder="Buscar..."
        />
        <Button
          onPress={getPNameInfo}
          title="Buscar"
        />
      </View>
			<View style={styles.row}>
        <Picker
          style={{width: '50%'}}
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
          style={{width: '50%'}}
          selectedValue={category}
          onValueChange={(itemValue, itemIndex) =>
            setType(itemValue)}
        >
          <Picker.Item label="Tipo intercambio" />          
          <Picker.Item label="Prestar" value="provide" />
          <Picker.Item label="Intercambiar" value="exhange" />
          <Picker.Item label="Dar" value="present" />
        </Picker>
			</View>
        <FlatList
          numColumns={2}
          data={products}
          renderItem={({ item }) => (
            <ProductCard id={item._id} navigation={navigation}name={item.name} guardado={false} arrayTratos={item.exchange} imageUri={item.img[0].url}/>
          )}
          keyExtractor={item => item._id}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: '5%',
    marginVertical: 5,
  },
});


