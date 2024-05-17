// EditPetModal.tsx
import React, { useEffect, useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, ActivityIndicator, Alert} from 'react-native';
import {API} from "../../constants/Api";
import {Pet} from "../../constants/Types";


// @ts-ignore
const EditPetModal = ({ visible, onClose, petId }) => {
  const [petDetails, setPetDetails] = useState<Pet>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPetDetails = async () => {
      if (petId) {
        try {
          const response = await fetch(`${API.url_dev}${API.endpoint.mascotas}${petId}`);
          const data = await response.json();
          setPetDetails(data);
        } catch (error) {
          console.error('Error fetching pet details:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPetDetails();
  }, [petId]);

  if (loading) {
    return (
      <Modal visible={visible} transparent={true}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </Modal>
    );
  }

  if (!petDetails) {
    return null;
  }

  const handleSave = async () => {
    if (petDetails) {
      try {
        const response = await fetch(`${API.url_dev}${API.endpoint.mascotas}${petDetails.id}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(petDetails),
        });

        if (response.ok) {
          Alert.alert('Success', 'Información de mascota actualizado correctamente!');
          onClose();
        } else {
          Alert.alert('Error', 'Ha fallado la actualización de la información de mascota');
        }
      } catch (error) {
        console.error('Error updating pet details:', error);
        Alert.alert('Error', 'Ha fallado la actualización de la información de mascota, intenta de nuevo más tarde');
      }
    }
  };

  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Información de mascota</Text>
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
            <Text style={styles.saveButtonText}>Guardar cambios</Text>
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
