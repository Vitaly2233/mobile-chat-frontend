import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import AuthInput from '../components/AuthInput';
import {Themes} from '../themes';
import {RootStackParamsList} from '../types/RootStackParamsList';
import Button from '../components/Button';
import {useStore} from '../store';
import {LoginData} from '../models/LoginData';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<RootStackParamsList, 'Login'>;

const Login = ({route, navigation}: Props) => {
  const {
    control,
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const {userStore} = useStore();

  const submit = async (data: LoginData) => {
    try {
      const token = await userStore.login(data);
      await AsyncStorage.setItem('access_token', token);
      userStore.setToken(token);
      await userStore.setMe();
    } catch (e) {
      alert('cannot get token');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.text}>First Name</Text>
        <Controller
          control={control}
          name="firstName"
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <AuthInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Enter here"
            />
          )}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Last Name</Text>
        <Controller
          control={control}
          name="lastName"
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <AuthInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Enter here"
            />
          )}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Username</Text>
        <Controller
          control={control}
          name="username"
          rules={{required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/}}
          render={({field: {onChange, onBlur, value}}) => (
            <AuthInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Enter here"
            />
          )}
        />
      </View>
      <Button text="Login" onPress={handleSubmit(submit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center'},
  inputContainer: {marginBottom: 16},
  text: {
    fontSize: Themes.FONT_SIZE_SMALL,
    color: Themes.BLACK_COLOR,
    marginBottom: 6,
  },
});

export default Login;
