import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
import ProductCard from '../components/ProductCard';

export default function ProductSearch({ navigation }: RootTabScreenProps<'ProductSearch'>) {

  const [products, setProducts] = useState();
  const [text, onChangeText] = useState("");

  const getPNameInfo = async () => {
    let response = await axios.get('https://app4me4u.herokuapp.com/api/product/name/'+text);
    setProducts(response.data);
    console.log(response.data[0].img);
  };
	
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TextInput
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
				<Button
					onPress={()=>console.log("Buscar por categoria")}
					title="Categoria"
				/>
				<Button
					onPress={()=>console.log("Buscar por tipo intercambio")}
					title="Tipo intercambio"
				/>
			</View>
      <ScrollView style={styles.flex}>
        <FlatList
          numColumns={2}
          data={products}
          renderItem={({ item }) => (
            <ProductCard name={item.name} guardado={false} arrayTratos={item.exchange} imageUri={item.img[0].url}/>
          )}
          keyExtractor={item => item.id}
          />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginHorizontal: '10%',
    marginVertical: 5,
  },
});


