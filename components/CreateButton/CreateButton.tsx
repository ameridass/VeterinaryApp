import React, { useState } from 'react';
import { View, Button, Modal, StyleSheet } from 'react-native';
import OwnerForm from '../OwnerForm/OwnerForm';
import AppointmentForm from '../AppointmentForm/AppointmentForm';
import DewormingRecordForm from '../DewormingRecordForm/DewormingRecordForm';
import { API } from '../../constants/Api';
import {Appointment, buttonTitles, DewormingRecord, Owner} from "../../constants/Types";


type FormType = 'owner' | 'appointment' | 'deworming';

interface CreateButtonProps {
  type: FormType;
  onCreate: (data: any) => void;
}

const CreateButton: React.FC<CreateButtonProps> = ({ type, onCreate }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const getDefaultData = (): Owner | Appointment | DewormingRecord => {
    switch (type) {
      case 'owner':
        return { id: undefined, nombre: '', direccion: '', telefono: '', email: '', estado: 1 };
      case 'appointment':
        return { id: undefined, fecha_hora: '', observaciones: '', paciente: 0, empleado: 0, estado: 1 };
      case 'deworming':
        return { id: undefined, fecha: '', motivo: '', diagnostico: '', tratamiento: '', paciente: 0, empleado: 0, sala: 0, estado: 1 };
      default:
        throw new Error('Invalid type');
    }
  };

  const handleSave = async (data: any) => {
    const endpointMap: Record<FormType, string> = {
      'owner': API.endpoint.duenos,
      'appointment': API.endpoint.citas,
      'deworming': API.endpoint.desparasitaciones,
    };

    try {
      const response = await fetch(`${API.url_dev}${endpointMap[type]}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const newData = await response.json();
      onCreate(newData); // Actualiza la lista en el componente padre
    } catch (error) {
      console.error('Error creating new entry:', error);
    } finally {
      setModalVisible(false);
    }
  };

  const renderForm = () => {
    const defaultData = getDefaultData();
    switch (type) {
      case 'owner':
        return <OwnerForm owner={defaultData as Owner} onSave={handleSave} onCancel={() => setModalVisible(false)} />;
      case 'appointment':
        return <AppointmentForm appointment={defaultData as Appointment} onSave={handleSave} onCancel={() => setModalVisible(false)} />;
      case 'deworming':
        return <DewormingRecordForm record={defaultData as DewormingRecord} onSave={handleSave} onCancel={() => setModalVisible(false)} />;
      default:
        return null;
    }
  };

  return (
    <View>
      <Button title={`Crear ${ buttonTitles[type]}`} onPress={() => setModalVisible(true)} />
      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContent}>
          {renderForm()}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
});

export default CreateButton;
