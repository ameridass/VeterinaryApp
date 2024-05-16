import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Appointment} from "../../constants/Types";

interface AppointmentCardProps {
  appointment: Appointment;
  onEdit: () => void;
  onDelete: () => void;
}

const AppointmentCard = ({ appointment, onEdit, onDelete }: AppointmentCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.title}>Fecha y Hora: {appointment.fecha_hora}</Text>
        <Text style={styles.text}>Observaciones: {appointment.observaciones}</Text>
        <Text style={styles.text}>Paciente: {appointment.paciente}</Text>
        <Text style={styles.text}>Empleado: {appointment.empleado}</Text>
        <Text style={styles.text}>Estado: {appointment.estado}</Text>
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

export default AppointmentCard;
