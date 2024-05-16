// src/components/AppointmentForm/AppointmentForm.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

interface Appointment {
  id: string;
  fecha_hora: string;
  observaciones: string;
  paciente: string;
  empleado: string;
  estado: string;
}

interface AppointmentFormProps {
  appointment: Appointment;
  onSave: (updatedAppointment: Appointment) => void;
  onCancel: () => void;
}

const AppointmentForm = ({ appointment, onSave, onCancel }: AppointmentFormProps) => {
  const [formData, setFormData] = useState<Appointment>(appointment);

  const handleChange = (name: keyof Appointment, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Fecha y Hora</Text>
      <TextInput
        style={styles.input}
        value={formData.fecha_hora}
        onChangeText={(text) => handleChange('fecha_hora', text)}
      />
      <Text style={styles.label}>Observaciones</Text>
      <TextInput
        style={styles.input}
        value={formData.observaciones}
        onChangeText={(text) => handleChange('observaciones', text)}
      />
      <Text style={styles.label}>Paciente</Text>
      <TextInput
        style={styles.input}
        value={formData.paciente}
        onChangeText={(text) => handleChange('paciente', text)}
      />
      <Text style={styles.label}>Empleado</Text>
      <TextInput
        style={styles.input}
        value={formData.empleado}
        onChangeText={(text) => handleChange('empleado', text)}
      />
      <Text style={styles.label}>Estado</Text>
      <TextInput
        style={styles.input}
        value={formData.estado}
        onChangeText={(text) => handleChange('estado', text)}
      />
      <View style={styles.buttons}>
        <Button title="Guardar" onPress={() => onSave(formData)} />
        <Button title="Cancelar" onPress={onCancel} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default AppointmentForm;
