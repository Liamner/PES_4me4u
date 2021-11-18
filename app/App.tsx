import { StatusBar } from 'expo-status-bar';
import React, {useReducer} from 'react';
import { ActivityIndicator } from 'react-native';
import { View } from 'react-native-animatable';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation/index';
import Navigation2 from './navigation/bottomtabnav'

import { AuthContext } from './components/context';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  //const[isLoading, setIsLoading] = React.useState(true);
  //const[userToken, setUserToken] = React.useState(null);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (state, action) => {
    switch(action.type) {
      case 'RETRIEVE_TOKEN':
        return{
          ...state,
          userToken: action.token,
          isLoading: false
        };
      case 'LOGIN':
        return{
          ...state,
          userName: action.id,
          userToken: action.token,
          isLoading: false
        };
      case 'LOGOUT':
        return{
          ...state,
          userName: null,
          userToken: null,
          isLoading: false
        };
    }
  };

  const [state, dispatch] = React.useReducer(loginReducer, initialLoginState);


  const authContext = React.useMemo(() => ({
    signIn: async(userName, providedToken) => {
      let userToken;
      try {
        userToken = providedToken;
        console.log('userToken:', userToken)
        await AsyncStorage.setItem('userToken', userToken)
      } catch(e) {
        console.log(e);
      }
      dispatch({type: 'LOGIN', id: userName, token: userToken})
    },
    signOut: () => {
      dispatch({type:'LOGOUT'});
    },
    signUp: () => {
      setUserToken('asdasd');
      setIsLoading(false);
    }
  }), []);

  React.useEffect(() => {
   setTimeout(async() => {
     let userToken;
     userToken = null;
    try {
      userToken = await AsyncStorage.getItem('userToken')
      console.log('userToken:', userToken)
    } catch(e) {
      console.log(e);
    }
    dispatch({type: 'RERTIEVE_TOKEN', token: userToken})
    }, 1000);
  }, []);

  if (!isLoadingComplete || state.isLoading) {
    return (
      <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } else {
    return (
      <SafeAreaProvider>
        <AuthContext.Provider value = {authContext}>
          {state.userToken === null? (
          <React.Fragment>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
          </React.Fragment>)
          :
          (<React.Fragment> 
            <Navigation2 colorScheme={colorScheme} />
          </React.Fragment>)
          }
      </AuthContext.Provider>
     </SafeAreaProvider>
    );
  }
}
