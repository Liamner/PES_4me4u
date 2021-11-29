import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function ProductSearch({ navigation }: RootTabScreenProps<'ProductSearch'>) {

  const [products, setProducts] = useState();
  const [text, onChangeText] = useState("");

  const getPNameInfo = async () => {

    let response = await axios.get('https://app4me4u.herokuapp.com/api/product/name/'+text);
    
  };
	
  return (
    <View style={styles.container}>
      <View style={styles.container}>
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
      <ScrollView>
        <Text>Resultados</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginHorizontal: '10%',
    marginVertical: 5,
  },
});


