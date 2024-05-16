import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API} from "../constants/Api";

// @ts-ignore
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user'); // 'user' or 'collaborator'
  const [error, setError] = useState('');

  const handleLogin = async () => {
    let endpoint = '';
    if (userType === 'user') {
      endpoint = API.endpoint.duenos+'login/';
    } else if (userType === 'collaborator') {
      endpoint = 'API_ENDPOINT_FOR_COLLABORATOR';
    }

    try {
      if(email === '' ) {
        setError('Debe de completar todos los campos')
        return;
      }
      const response = await fetch(API.url_dev + endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data) {
        console.log('Login successful:', data.mensaje);
        // Store user type and user ID in AsyncStorage
        await AsyncStorage.setItem('userType', userType);
        await AsyncStorage.setItem('userId', data.id.toString());

        navigation.navigate('Main');
      } else {
        setError('Usuario o contraseña no válidos');
      }
    } catch (error) {
      setError('Error al conectarse al servidor');
      console.error('Login error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Picker
        selectedValue={userType}
        onValueChange={(itemValue) => setUserType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Usuario" value="user" />
        <Picker.Item label="Colaborador" value="collaborator" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Iniciar sesión" onPress={handleLogin} />
      <Button
        title="Registrarme"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default LoginScreen;
