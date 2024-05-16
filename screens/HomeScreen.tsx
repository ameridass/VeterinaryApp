import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const navigateToScreen = (screen: string) => {
    // @ts-ignore
    navigation.navigate(screen);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>VeterinaryApp</Text>
      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={() => navigateToScreen('Gestión de Citas')} style={styles.menuItem}>
          <Text style={styles.menuItemText}>Gestión de Citas</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('Administración de Dueños')} style={styles.menuItem}>
          <Text style={styles.menuItemText}>Administración de Dueños</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('Administración de Fichas de Desparasitación')} style={styles.menuItem}>
          <Text style={styles.menuItemText}>Fichas de Desparasitación</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  menuContainer: {
    padding: 20,
  },
  menuItem: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItemText: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default HomeScreen;
