import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import {Owner} from "../OwnerCard/OwnerCard";


interface OwnerFormProps {
  owner: Owner;
  onSave: (updatedOwner: Owner) => void;
  onCancel: () => void;
}

const OwnerForm = ({ owner, onSave, onCancel }: OwnerFormProps) => {
  const [formData, setFormData] = useState<Owner>(owner);

  const handleChange = (name: keyof Owner, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        value={formData.nombre}
        onChangeText={(text) => handleChange('nombre', text)}
      />
      <Text style={styles.label}>Dirección</Text>
      <TextInput
        style={styles.input}
        value={formData.direccion}
        onChangeText={(text) => handleChange('direccion', text)}
      />
      <Text style={styles.label}>Teléfono</Text>
      <TextInput
        style={styles.input}
        value={formData.telefono}
        onChangeText={(text) => handleChange('telefono', text)}
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={formData.email}
        onChangeText={(text) => handleChange('email', text)}
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

export default OwnerForm;
