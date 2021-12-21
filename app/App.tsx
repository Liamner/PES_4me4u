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
    user:"",
    token:""
  });

  
  const getData = async () => {
    const sess = await retrieveSession();
      console.log(sess)
      setSession(sess);
    }

    React.useEffect(() => {
      getData();
    }, []);  

    /*const logOut = async () => {  
      await AsyncStorage.removeItem('userSession');
      console.log("logout")
    };

  logOut();*/

  if (session == undefined) {
    console.log("hello");
  }

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
