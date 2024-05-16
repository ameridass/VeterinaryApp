import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import {DewormingRecord} from "../DewormingRecordCard/DewormingRecordCars";


interface DewormingRecordFormProps {
  record: DewormingRecord;
  onSave: (updatedRecord: DewormingRecord) => void;
  onCancel: () => void;
}

const DewormingRecordForm = ({ record, onSave, onCancel }: DewormingRecordFormProps) => {
  const [formData, setFormData] = useState<DewormingRecord>(record);

  const handleChange = (name: keyof DewormingRecord, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Fecha</Text>
      <TextInput
        style={styles.input}
        value={formData.fecha}
        onChangeText={(text) => handleChange('fecha', text)}
      />
      <Text style={styles.label}>Motivo</Text>
      <TextInput
        style={styles.input}
        value={formData.motivo}
        onChangeText={(text) => handleChange('motivo', text)}
      />
      <Text style={styles.label}>Diagnóstico</Text>
      <TextInput
        style={styles.input}
        value={formData.diagnostico}
        onChangeText={(text) => handleChange('diagnostico', text)}
      />
      <Text style={styles.label}>Tratamiento</Text>
      <TextInput
        style={styles.input}
        value={formData.tratamiento}
        onChangeText={(text) => handleChange('tratamiento', text)}
      />
      <Text style={styles.label}>Paciente</Text>
      <TextInput
        style={styles.input}
        value={formData.paciente.toString()}
        onChangeText={(text) => handleChange('paciente', text)}
      />
      <Text style={styles.label}>Empleado</Text>
      <TextInput
        style={styles.input}
        value={formData.empleado.toString()}
        onChangeText={(text) => handleChange('empleado', text)}
      />
      <Text style={styles.label}>Sala</Text>
      <TextInput
        style={styles.input}
        value={formData.sala.toString()}
        onChangeText={(text) => handleChange('sala', text)}
      />
      <Text style={styles.label}>Estado</Text>
      <TextInput
        style={styles.input}
        value={formData.estado.toString()}
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

export default DewormingRecordForm;
