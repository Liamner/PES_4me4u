import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function SearchProduct({ navigation }: RootTabScreenProps<'SearchProduct'>) {
	const [selectedValue, setSelectedValue] = useState("java");
	
  return (
    <View style={styles.container}>
      <TextInput
				onChangeText={()=>console.log("Texto cambiado")}
				placeholder="Buscar..."
			/>
			<View>
				<Button
					onPress={()=>console.log("Buscar por categoria")}
					title="Categoria"
				/>
				<Button
					onPress={()=>console.log("Buscar por tipo intercambio")}
					title="Tipo intercambio"
				/>
				<Picker
					selectedValue={selectedValue}
					style={{ height: 50, width: 150 }}
					onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
				>
					<Picker.Item label="Java" value="java" />
					<Picker.Item label="JavaScript" value="js" />
      </Picker>
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
  }
});


