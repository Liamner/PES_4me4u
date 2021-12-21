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
  /*const [session, setSession] = React.useState({
    id: "",
    user:"",
    token:""
  });
  const [logged, setlogged] = React.useState(true);

  
   const getData = async () => {
    const sess = await retrieveSession();
      console.log("getData" + sess)
      setSession(sess);
    }

    function isLogged () {
      console.log(session)
      if (session.id === "")
        setlogged(false);
      else
        setlogged(true);
    }

    React.useEffect(() => {
      getData();
      isLogged();
    }, []);  

   
   /* const logOut = async () => {  
      await AsyncStorage.removeItem('userSession');
      console.log("logout")
    };

  logOut();
    console.log("esta logueado?" + logged);
    */

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
