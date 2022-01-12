import * as React from 'react';
import { StyleSheet, TextInput, Image, Alert, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, View } from '../components/Themed';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { RootTabScreenProps } from '../types';
import axios from 'axios';
import GeocoderOsm from 'react-native-geocoder-osm';
import NavigationBar from '../components/NavigationBar'
import retrieveSession from '../hooks/retrieveSession';
import '../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';

export default function UserUpdateScreen({ navigation, route }: RootTabScreenProps<'UserUpdate'>) {
  const userid = route.params;
  const [name, onChangeName] = React.useState("");
  const [email, onChangeEmail] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [latlon, setlatlon] = React.useState({
    lat: null,
    lon: null,
  });
  const [session, setSession] = React.useState({
    id: "",
    user: "",
    token: ""
  })
  const { t, i18n } = useTranslation();
  const getData = async () => {
    try {
      const value = await retrieveSession()
      if (value !== null) {
        setSession(value)
        console.log(value)
      }
      else {
        console.log("empty")
      }
    } catch (e) {
      console.log(e)
    }
  }

  const url = 'https://app4me4u.herokuapp.com/api/user/' + userid;
  const url2 = 'https://app4me4u.herokuapp.com/api/user/update/' + userid;

  const ref = React.useRef();

  React.useEffect(() => {
    const willFocusSubcription = navigation.addListener('focus', () => {
      getInfo();
    })
    return willFocusSubcription;
  }, []);


  const getLatLon = async (place: string) => {
    if (place != '') {
      console.clear();
      GeocoderOsm.getGeoAddress(place).then((res) => {
        setlatlon(res[1]);

      }).catch((e: any) => {
        console.log('getGeoAddress error', e);
      });
    }
  }

  const getInfo = async () => {
    let response = await axios.get(url);
    onChangeName(response.data.userId);
    onChangeEmail(response.data.email);
  };

  const editUser = async () => {
    let place = ref.current?.getAddressText();
    getLatLon(place);
    const newInfo = {
      name: name,
      email: email,
      latitude: latlon.lat,
      longitude: latlon.lon,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${session.token}`
      }
    }
    await axios.put(url2, newInfo, config).then(
      function (response) {
        console.log(response);
      }
    )

  };

  React.useEffect(() => {
    getData();

  }, []);

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps='always' >
        <View style={styles.container}>
          <TextInput
            placeholder={t("Nombre")}
            style={styles.textInput}
            onChangeText={onChangeName}
            value={name}
          />
          <TextInput
            placeholder="Email"
            style={styles.textInput}
            onChangeText={onChangeEmail}
            value={email}
          />
          <GooglePlacesAutocomplete
            styles={styles.textInput}
            ref={ref}
            placeholder={t('Ubicación')}
            query={{
              key: 'AIzaSyC7JAeKR-u7CBU9vmztBqz-BIuhA8qu270',
              language: 'es',
            }}
          />
          <Button
            onPress={editUser}
            title={t("Aceptar")}
          />
        </View>
      </ScrollView>
      <NavigationBar navigation={navigation} profile={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    alignSelf: 'center',
    color: 'black',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#efefef',
    marginVertical: 8,
    height: 60,
    padding: 5,
    width: '98%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20
  },
  notImage: {
    marginHorizontal: 5,
    width: 100,
    height: 100,
    borderRadius: 10,
    borderColor: '#5e5c57',
    borderWidth: 3,
    backgroundColor: '#F0F0F0',
  },
  cameraImage: {
    width: 90,
    height: 90,
    marginTop: 1,
    marginLeft: 2,
    borderRadius: 3
  },
  image: {
    marginHorizontal: 5,
    width: 100,
    height: 100,
    borderRadius: 10,
    borderColor: '#5e5c57',
    borderWidth: 3,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});