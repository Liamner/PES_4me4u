import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import retrieveSession from './hooks/retrieveSession'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [session, setSession] = React.useState({
    id: "",
    token:"",
    user:""
  });
  const [logged, setlogged] = React.useState(false);


  // const getData = async () => {
  //   let aux = null
  //   try {
  //     const value = await AsyncStorage.getItem('userSession')
  //     if (value !== null) {
  //       aux = JSON.parse(value);
  //       console.log(aux)
  //     }
  //   }
  //   catch(error) {
  //     console.log(error)
  //   }
  //   if (aux == null)
  //   {
  //     console.log('no logueado')
  //   }
  //   else 
  //       console.log('logueado ' + aux.user);
  //   }
  
  //   React.useEffect(() => {
  //     getData();
  //   }, []);  
    
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar
        animated={true}
        hidden={false}
        backgroundColor="#a2cff0"/>
      </SafeAreaProvider>
    );
  }
}
