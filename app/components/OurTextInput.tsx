import * as React from 'react';
import { StyleSheet } from 'react-native';

import Layout from '../constants/Layout';

import { TextInput as DefaultTextInput} from 'react-native-paper';






import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};






export type TextInputProps = ThemeProps & DefaultTextInput['props'];

export function TextInput(props: TextInputProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const marginVertical = 15;
  const height = 60;
  const width = '90%';

  return <DefaultTextInput style={[{ color }, {marginVertical}, {height}, {width}, style]} {...otherProps} />;
}


