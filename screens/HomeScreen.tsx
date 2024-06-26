import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../constants/Api";
import EditPetModal from "../components/EditPetModal/EditPetModal";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [avatars, setAvatars] = useState<string[]>([]);
  const [userType, setUserType] = useState<string | null>(null);
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ownerId, setOwnerId] = useState<string | null>(null);
  const avatarUrl = 'https://via.placeholder.com/150';

  const fetchUserData = async () => {
    const storedUserType = await AsyncStorage.getItem('userType');
    setUserType(storedUserType);

    if (storedUserType !== 'collaborator') {
      const userId = await AsyncStorage.getItem('userId');
      setOwnerId(userId);
      if (userId) {
        try {
          const response = await fetch(`${API.url_dev}${API.endpoint.duenos}${userId}${API.endpoint.mascotas}`);
          const data = await response.json();
          setMascotas(data);

          const avatarPromises = data.map(() =>
            fetch('https://api.thedogapi.com/v1/images/search')
              .then(response => response.json())
              .then(data => data[0].url)
          );
          const avatarUrls = await Promise.all(avatarPromises);
          setAvatars(avatarUrls);
        } catch (error) {
          console.error('Error fetching mascotas or avatar images:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handlePetPress = (petId: number) => {
    setSelectedPetId(petId);
    setIsModalVisible(true);
  };

  const handleAddPet = () => {
    setSelectedPetId(null);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedPetId(null);
  };

  const handleSave = async () => {
    setLoading(true);
    await fetchUserData();
    setLoading(false);
  };

  const navigateToScreen = (screen: string) => {
    // @ts-ignore
    navigation.navigate(screen);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {userType !== 'collaborator' && (
        <>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Bienvenido a Mascota Feliz!</Text>
            <Image
              source={{ uri: avatarUrl }}
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.subHeader}>Mascotas</Text>
          <View style={styles.petsContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {mascotas.map((mascota: any, index: number) => (
                <TouchableOpacity key={mascota.id} onPress={() => handlePetPress(mascota.id)}>
                  <View style={styles.petCard}>
                    <Image source={{ uri: avatars[index] }} style={styles.petImage} />
                    <Text style={styles.petName}>{mascota.nombre}</Text>
                  </View>
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={styles.addPetButton} onPress={handleAddPet}>
                <Text style={styles.addPetText}>+</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </>
      )}
      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={() => navigateToScreen('Gestión de Citas')} style={styles.menuItem}>
          <Text style={styles.menuItemText}>Gestión de Citas</Text>
        </TouchableOpacity>
        {userType !== 'user' && (
          <TouchableOpacity onPress={() => navigateToScreen('Administración de Dueños')} style={styles.menuItem}>
            <Text style={styles.menuItemText}>Administración de Dueños</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => navigateToScreen('Administración de Fichas de Desparasitación')} style={styles.menuItem}>
          <Text style={styles.menuItemText}>Fichas de Desparasitación</Text>
        </TouchableOpacity>
      </View>
      {isModalVisible && (
        <EditPetModal
          visible={isModalVisible}
          onClose={closeModal}
          petId={selectedPetId}
          onSave={handleSave}
          ownerId={ownerId}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '500',
    paddingHorizontal: 20,
  },
  petsContainer: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  petCard: {
    alignItems: 'center',
    marginRight: 10,
  },
  petImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  petName: {
    fontSize: 14,
    textAlign: 'center',
  },
  addPetButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPetText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  menuContainer: {
    padding: 20,
  },
  menuItem: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItemText: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default HomeScreen;
