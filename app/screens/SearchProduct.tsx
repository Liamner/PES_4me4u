import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function SearchProduct({ navigation }: RootTabScreenProps<'SearchProduct'>) {
	
  return (
    <View style={styles.container}>
      <TextInput
				onChangeText={()=>console.log("Texto cambiado")}
				placeholder="Buscar..."
			/>
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


