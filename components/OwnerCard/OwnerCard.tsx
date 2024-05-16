import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export interface Owner {
  id: string;
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  estado: number;
}

export interface OwnerCardProps {
  owner: Owner;
  onEdit: () => void;
  onDelete: () => void;
}

const OwnerCard = ({ owner, onEdit, onDelete }: OwnerCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.title}>Nombre: {owner.nombre}</Text>
        <Text style={styles.text}>Dirección: {owner.direccion}</Text>
        <Text style={styles.text}>Teléfono: {owner.telefono}</Text>
        <Text style={styles.text}>Email: {owner.email}</Text>
        <Text style={styles.text}>Estado: {owner.estado}</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={onEdit} style={styles.button}>
          <Icon name="edit" size={20} color="#4CAF50" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.button}>
          <Icon name="trash" size={20} color="#F44336" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    marginLeft: 10,
  },
});

export default OwnerCard;
