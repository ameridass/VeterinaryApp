import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, ActivityIndicator, Alert } from 'react-native';
import {API} from "../../constants/Api";

// @ts-ignore
const EditPetModal = ({ visible, onClose, petId, onSave, ownerId }) => {
  const [petDetails, setPetDetails] = useState({
    nombre: '',
    especie: '',
    raza: '',
    fecha_nacimiento: '',
    historial_medico: '',
    propietario: ownerId,
    estado: 1,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (petId) {
      const fetchPetDetails = async () => {
        try {
          const response = await fetch(`${API.url_dev}${API.endpoint.mascotas}${petId}`);
          const data = await response.json();
          setPetDetails(data);
        } catch (error) {
          console.error('Error fetching pet details:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchPetDetails();
    } else {
      setLoading(false);
    }
  }, [petId]);

  const handleSave = async () => {
    try {
      const method = petId ? 'PUT' : 'POST';
      const url = petId
        ? `${API.url_dev}${API.endpoint.mascotas}${petId}/`
        : `${API.url_dev}${API.endpoint.mascotas}`;
      console.log('url:', url);
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(petDetails),
      });

      if (response.ok) {
        Alert.alert('Exito', 'La mascota fue agregada correctamente!');
        onSave();
        onClose();
      } else {
        Alert.alert('Notificación', 'Ha fallado la operación, por favor intente de nuevo más tarde');
      }
    } catch (error) {
      console.error('Error saving pet details:', error);
      Alert.alert('Error', 'Ha ocurrido un error al guardar los detalles de la mascota, por favor intente de nuevo más tarde');
    }
  };

  if (loading) {
    return (
      <Modal visible={visible} transparent={true}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{petId ? 'Edit Pet Details' : 'Add New Pet'}</Text>
          <TextInput
            style={styles.input}
            value={petDetails.nombre}
            onChangeText={(text) => setPetDetails({ ...petDetails, nombre: text })}
            placeholder="Nombre"
          />
          <TextInput
            style={styles.input}
            value={petDetails.especie}
            onChangeText={(text) => setPetDetails({ ...petDetails, especie: text })}
            placeholder="Especie"
          />
          <TextInput
            style={styles.input}
            value={petDetails.raza}
            onChangeText={(text) => setPetDetails({ ...petDetails, raza: text })}
            placeholder="Raza"
          />
          <TextInput
            style={styles.input}
            value={petDetails.fecha_nacimiento}
            onChangeText={(text) => setPetDetails({ ...petDetails, fecha_nacimiento: text })}
            placeholder="Fecha de Nacimiento"
          />
          <TextInput
            style={styles.input}
            value={petDetails.historial_medico}
            onChangeText={(text) => setPetDetails({ ...petDetails, historial_medico: text })}
            placeholder="Historial Médico"
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>{petId ? 'Guardar' : 'Agregar'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditPetModal;
