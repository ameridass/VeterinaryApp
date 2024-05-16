import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Alert, Modal } from 'react-native';
import { API } from '../constants/Api';
import OwnerCard from '../components/OwnerCard/OwnerCard';
import OwnerForm from '../components/OwnerForm/OwnerForm';
import CreateButton from '../components/CreateButton/CreateButton';
import {Owner} from "../constants/Types";

const OwnerManagementScreen = () => {
  const [owners, setOwners] = useState<Owner[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOwner, setSelectedOwner] = useState<Owner | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchOwners();
  }, []);

  const fetchOwners = async () => {
    try {
      const response = await fetch(API.url_dev + API.endpoint.duenos);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setOwners(data);
    } catch (error) {
      console.error('Error fetching owners:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (owner: Owner) => {
    setSelectedOwner(owner);
    setModalVisible(true);
  };

  const handleSave = async (updatedOwner: Owner) => {
    try {
      const response = await fetch(`${API.url_dev + API.endpoint.duenos}${updatedOwner.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedOwner),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setOwners((prevOwners) =>
        prevOwners.map((item) => (item.id === data.id ? data : item))
      );
    } catch (error) {
      console.error('Error updating owner:', error);
    } finally {
      setModalVisible(false);
      setSelectedOwner(null);
    }
  };

  const handleDelete = (owner: Owner) => {
    Alert.alert(
      'Eliminar',
      `¿Estás seguro de que deseas eliminar al dueño: ${owner.nombre}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'OK', onPress: () => deleteOwner(owner) },
      ],
      { cancelable: false }
    );
  };

  const deleteOwner = async (owner: Owner) => {
    try {
      const response = await fetch(`${API.url_dev + API.endpoint.duenos}${owner.id}/`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setOwners((prevOwners) =>
        prevOwners.filter((item) => item.id !== owner.id)
      );
    } catch (error) {
      console.error('Error deleting owner:', error);
    }
  };

  const handleCreate = (newOwner: Owner) => {
    setOwners((prevOwners) => [newOwner, ...prevOwners]);
  };

  const renderItem = ({ item }: { item: Owner }) => (
    <OwnerCard
      owner={item}
      onEdit={() => handleEdit(item)}
      onDelete={() => handleDelete(item)}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Dueños</Text>
      <CreateButton type="owner" onCreate={handleCreate} />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={owners}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      {selectedOwner && (
        <Modal
          visible={isModalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <OwnerForm
              owner={selectedOwner}
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

export default OwnerManagementScreen;
