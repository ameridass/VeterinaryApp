import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import DewormingRecords from "./components/DewormingRecords";
import OwnerManagementScreen from "./screens/OwnerManagementScreen";
import AppointmentManagementScreen from "./screens/AppointmentManagementScreen";
import {createDrawerNavigator} from "@react-navigation/drawer";
import HomeScreen from "./screens/HomeScreen";


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Inicio" component={HomeScreen} />
      <Drawer.Screen name="Gestión de Citas" component={AppointmentManagementScreen} />
      <Drawer.Screen name="Administración de Dueños" component={OwnerManagementScreen} />
      <Drawer.Screen name="Administración de Fichas de Desparasitación" component={DewormingRecords} />
    </Drawer.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={DrawerNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
