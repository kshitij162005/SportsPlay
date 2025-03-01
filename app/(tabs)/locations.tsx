import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { MapPin, List, Map as MapIcon, Star } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const clubs = [
  {
    id: '1',
    name: 'Kampus Padel',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    rating: 4.8,
    location: 'Mumbai',
    sport: 'Padel',
    latitude: 19.0760,
    longitude: 72.8777,
  },
  {
    id: '2',
    name: 'Tennis Paradise',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    rating: 4.6,
    location: 'Delhi',
    sport: 'Tennis',
    latitude: 28.6139,
    longitude: 77.2090,
  },
  {
    id: '3',
    name: 'Football Arena',
    image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    rating: 4.5,
    location: 'Bangalore',
    sport: 'Football',
    latitude: 12.9716,
    longitude: 77.5946,
  },
  {
    id: '4',
    name: 'Basketball Court',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2090&q=80',
    rating: 4.3,
    location: 'Chennai',
    sport: 'Basketball',
    latitude: 13.0827,
    longitude: 80.2707,
  },
  {
    id: '5',
    name: 'Badminton Club',
    image: 'https://images.unsplash.com/photo-1626361969367-4c13167d2c16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    rating: 4.7,
    location: 'Hyderabad',
    sport: 'Badminton',
    latitude: 17.3850,
    longitude: 78.4867,
  },
];

export default function LocationsScreen() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [selectedClub, setSelectedClub] = useState<string | null>(null);
  
  const initialRegion = {
    latitude: 20.5937,
    longitude: 78.9629,
    latitudeDelta: 20,
    longitudeDelta: 20,
  };

  const handleMarkerPress = (clubId: string) => {
    setSelectedClub(clubId);
  };

  const selectedClubData = selectedClub ? clubs.find(club => club.id === selectedClub) : null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sports Facilities Near You</Text>
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'map' && styles.activeToggleButton]}
            onPress={() => setViewMode('map')}
          >
            <MapIcon size={18} color={viewMode === 'map' ? '#fff' : '#666'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'list' && styles.activeToggleButton]}
            onPress={() => setViewMode('list')}
          >
            <List size={18} color={viewMode === 'list' ? '#fff' : '#666'} />
          </TouchableOpacity>
        </View>
      </View>

      {viewMode === 'map' ? (
        <View style={styles.mapContainer}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={initialRegion}
          >
            {clubs.map((club) => (
              <Marker
                key={club.id}
                coordinate={{
                  latitude: club.latitude,
                  longitude: club.longitude,
                }}
                title={club.name}
                description={`${club.sport} in ${club.location}`}
                onPress={() => handleMarkerPress(club.id)}
              >
                <View style={[
                  styles.markerContainer,
                  selectedClub === club.id && styles.selectedMarkerContainer
                ]}>
                  <MapPin 
                    size={24} 
                    color={selectedClub === club.id ? '#fff' : '#3498db'} 
                    fill={selectedClub === club.id ? '#3498db' : 'transparent'}
                  />
                </View>
              </Marker>
            ))}
          </MapView>

          {selectedClubData && (
            <TouchableOpacity 
              style={styles.clubCard}
              onPress={() => router.push(`/club/${selectedClubData.id}`)}
            >
              <Image source={{ uri: selectedClubData.image }} style={styles.clubImage} />
              <View style={styles.clubContent}>
                <Text style={styles.clubName}>{ selectedClubData.name}</Text>
                <View style={styles.clubDetails}>
                  <View style={styles.ratingContainer}>
                    <Star size={14} color="#FFD700" fill="#FFD700" />
                    <Text style={styles.ratingText}>{selectedClubData.rating}</Text>
                  </View>
                  <Text style={styles.sportText}>{selectedClubData.sport}</Text>
                </View>
                <View style={styles.locationContainer}>
                  <MapPin size={14} color="#666" />
                  <Text style={styles.locationText}>{selectedClubData.location}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={styles.listContainer}>
          {clubs.map((club) => (
            <TouchableOpacity 
              key={club.id}
              style={styles.listItem}
              onPress={() => router.push(`/club/${club.id}`)}
            >
              <Image source={{ uri: club.image }} style={styles.listItemImage} />
              <View style={styles.listItemContent}>
                <Text style={styles.listItemName}>{club.name}</Text>
                <View style={styles.listItemDetails}>
                  <View style={styles.ratingContainer}>
                    <Star size={14} color="#FFD700" fill="#FFD700" />
                    <Text style={styles.ratingText}>{club.rating}</Text>
                  </View>
                  <Text style={styles.sportText}>{club.sport}</Text>
                </View>
                <View style={styles.locationContainer}>
                  <MapPin size={14} color="#666" />
                  <Text style={styles.locationText}>{club.location}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    padding: 3,
  },
  toggleButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 17,
  },
  activeToggleButton: {
    backgroundColor: '#3498db',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
    borderWidth: 2,
    borderColor: '#3498db',
  },
  selectedMarkerContainer: {
    backgroundColor: '#3498db',
    borderColor: '#fff',
  },
  clubCard: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    flexDirection: 'row',
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  clubImage: {
    width: 100,
    height: 100,
  },
  clubContent: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  clubName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  clubDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 3,
  },
  sportText: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: '500',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  listContainer: {
    flex: 1,
    padding: 20,
  },
  listItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  listItemImage: {
    width: 100,
    height: 100,
  },
  listItemContent: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  listItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  listItemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
});