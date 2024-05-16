import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Alert, Modal } from 'react-native';
import { API } from '../constants/Api';
import DewormingRecordForm from '../components/DewormingRecordForm/DewormingRecordForm';
import DewormingRecordCard from "../components/DewormingRecordCard/DewormingRecordCars";

interface DewormingRecord {
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

const DewormingRecordsScreen = () => {
  const [records, setRecords] = useState<DewormingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState<DewormingRecord | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await fetch(API.url_dev + API.endpoint.desparasitaciones); // Asegúrate de que esta URL es correcta
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setRecords(data);
    } catch (error) {
      console.error('Error fetching records:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (record: DewormingRecord) => {
    setSelectedRecord(record);
    setModalVisible(true);
  };

  const handleSave = async (updatedRecord: DewormingRecord) => {
    try {
      const response = await fetch(`${API.url_dev + API.endpoint.desparasitaciones}${updatedRecord.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRecord),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setRecords((prevRecords) =>
        prevRecords.map((item) => (item.id === data.id ? data : item))
      );
    } catch (error) {
      console.error('Error updating record:', error);
    } finally {
      setModalVisible(false);
      setSelectedRecord(null);
    }
  };

  const handleDelete = (record: DewormingRecord) => {
    Alert.alert(
      'Eliminar',
      `¿Estás seguro de que deseas eliminar la ficha de desparasitación del paciente ${record.paciente}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'OK', onPress: () => deleteRecord(record) },
      ],
      { cancelable: false }
    );
  };

  const deleteRecord = async (record: DewormingRecord) => {
    try {
      const response = await fetch(`${API.url_dev + API.endpoint.desparasitaciones}${record.id}/`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setRecords((prevRecords) =>
        prevRecords.filter((item) => item.id !== record.id)
      );
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  const renderItem = ({ item }: { item: DewormingRecord }) => (
    <DewormingRecordCard
      record={item}
      onEdit={() => handleEdit(item)}
      onDelete={() => handleDelete(item)}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Administración de Fichas de Desparasitación</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={records}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
      {selectedRecord && (
        <Modal
          visible={isModalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <DewormingRecordForm
              record={selectedRecord}
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

export default DewormingRecordsScreen;
