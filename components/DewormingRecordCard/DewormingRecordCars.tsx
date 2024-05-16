import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export interface DewormingRecord {
  id: string;
  fecha: string;
  motivo: string;
  diagnostico: string;
  tratamiento: string;
  paciente: number;
  empleado: number;
  sala: number;
  estado: number;
}

interface DewormingRecordCardProps {
  record: DewormingRecord;
  onEdit: () => void;
  onDelete: () => void;
}

const DewormingRecordCard = ({ record, onEdit, onDelete }: DewormingRecordCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.title}>Fecha: {record.fecha}</Text>
        <Text style={styles.text}>Motivo: {record.motivo}</Text>
        <Text style={styles.text}>Diagnóstico: {record.diagnostico}</Text>
        <Text style={styles.text}>Tratamiento: {record.tratamiento}</Text>
        <Text style={styles.text}>Paciente: {record.paciente}</Text>
        <Text style={styles.text}>Empleado: {record.empleado}</Text>
        <Text style={styles.text}>Sala: {record.sala}</Text>
        <Text style={styles.text}>Estado: {record.estado}</Text>
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

export default DewormingRecordCard;
