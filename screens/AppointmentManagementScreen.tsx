// src/screens/AppointmentManagement.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Alert, Modal } from 'react-native';
import { API } from '../constants/Api';
import AppointmentCard from '../components/AppointmentCard/AppointmentCard';
import AppointmentForm from '../components/AppointmentForm/AppointmentForm';

interface Appointment {
  id: string;
  fecha_hora: string;
  observaciones: string;
  paciente: string;
  empleado: string;
  estado: string;
}

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(API.url_dev + API.endpoint.citas);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setModalVisible(true);
  };

  const handleSave = async (updatedAppointment: Appointment) => {
    try {
      const response = await fetch(`${API.url_dev + API.endpoint.citas}${updatedAppointment.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAppointment),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAppointments((prevAppointments) =>
        prevAppointments.map((item) => (item.id === data.id ? data : item))
      );
    } catch (error) {
      console.error('Error updating appointment:', error);
    } finally {
      setModalVisible(false);
      setSelectedAppointment(null);
    }
  };

  const handleDelete = (appointment: Appointment) => {
    Alert.alert(
      'Eliminar',
      `¿Estás seguro de que deseas eliminar la cita con el paciente: ${appointment.paciente}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'OK', onPress: () => deleteAppointment(appointment) },
      ],
      { cancelable: false }
    );
  };

  const deleteAppointment = async (appointment: Appointment) => {
    try {
      const response = await fetch(`${API.url_dev + API.endpoint.citas}${appointment.id}/`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setAppointments((prevAppointments) =>
        prevAppointments.filter((item) => item.id !== appointment.id)
      );
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  const renderItem = ({ item }: { item: Appointment }) => (
    <AppointmentCard
      appointment={item}
      onEdit={() => handleEdit(item)}
      onDelete={() => handleDelete(item)}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Citas</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={appointments}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
      {selectedAppointment && (
        <Modal
          visible={isModalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <AppointmentForm
              appointment={selectedAppointment}
              onSave={handleSave}
              onCancel={() => setModalVisible(false)}
            />
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
});

export default AppointmentManagement;
