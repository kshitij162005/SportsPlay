import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search as SearchIcon, Filter, MapPin, Star } from 'lucide-react-native';

const sportFilters = [
  { id: '1', name: 'All' },
  { id: '2', name: 'Padel' },
  { id: '3', name: 'Tennis' },
  { id: '4', name: 'Football' },
  { id: '5', name: 'Basketball' },
  { id: '6', name: 'Badminton' },
];

const cityFilters = [
  { id: '1', name: 'All Cities' },
  { id: '2', name: 'Mumbai' },
  { id: '3', name: 'Delhi' },
  { id: '4', name: 'Bangalore' },
  { id: '5', name: 'Chennai' },
  { id: '6', name: 'Hyderabad' },
];

const clubs = [
  {
    id: '1',
    name: 'Kampus Padel',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    rating: 4.8,
    location: 'Mumbai',
    courts: '3 indoor, 1 outdoor',
    sport: 'Padel',
    price: '₹800/hour',
  },
  {
    id: '2',
    name: 'Tennis Paradise',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    rating: 4.6,
    location: 'Delhi',
    courts: '5 outdoor',
    sport: 'Tennis',
    price: '₹600/hour',
  },
  {
    id: '3',
    name: 'Football Arena',
    image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    rating: 4.5,
    location: 'Bangalore',
    courts: '2 indoor, 3 outdoor',
    sport: 'Football',
    price: '₹1200/hour',
  },
  {
    id: '4',
    name: 'Basketball Court',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2090&q=80',
    rating: 4.3,
    location: 'Chennai',
    courts: '2 indoor',
    sport: 'Basketball',
    price: '₹500/hour',
  },
  {
    id: '5',
    name: 'Badminton Club',
    image: 'https://images.unsplash.com/photo-1626361969367-4c13167d2c16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    rating: 4.7,
    location: 'Hyderabad',
    courts: '6 indoor',
    sport: 'Badminton',
    price: '₹400/hour',
  },
];

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [showFilters, setShowFilters] = useState(false);

  const filteredClubs = clubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          club.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          club.sport.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSport = selectedSport === 'All' || club.sport === selectedSport;
    const matchesCity = selectedCity === 'All Cities' || club.location === selectedCity;
    
    return matchesSearch && matchesSport && matchesCity;
  });

  const renderClubItem = ({ item }: { item: typeof clubs[0] }) => (
    <TouchableOpacity 
      style={styles.clubItem}
      onPress={() => router.push(`/club/${item.id}`)}
    >
      <Image source={{ uri: item.image }} style={styles.clubImage} />
      <View style={styles.clubContent}>
        <View style={styles.clubHeader}>
          <Text style={styles.clubName}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Star size={14} color="#FFD700" fill="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        
        <View style={styles.clubDetails}>
          <View style={styles.locationContainer}>
            <MapPin size={14} color="#666" />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
          <Text style={styles.sportText}>{item.sport}</Text>
        </View>
        
        <View style={styles.clubFooter}>
          <Text style={styles.courtsText}>{item.courts}</Text>
          <Text style={styles.priceText}>{item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Find Sports Facilities</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <SearchIcon size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search clubs, sports, locations..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Filter size={20} color="#3498db" />
        </TouchableOpacity>
      </View>

      {showFilters && (
        <View style={styles.filtersContainer}>
          <Text style={styles.filterTitle}>Sport</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScrollContent}
          >
            {sportFilters.map((sport) => (
              <TouchableOpacity
                key={sport.id}
                style={[
                  styles.filterChip,
                  selectedSport === sport.name && styles.selectedFilterChip,
                ]}
                onPress={() => setSelectedSport(sport.name)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    selectedSport === sport.name && styles.selectedFilterChipText,
                  ]}
                >
                  {sport.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.filterTitle}>City</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScrollContent}
          >
            {cityFilters.map((city) => (
              <TouchableOpacity
                key={city.id}
                style={[
                  styles.filterChip,
                  selectedCity === city.name && styles.selectedFilterChip,
                ]}
                onPress={() => setSelectedCity(city.name)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    selectedCity === city.name && styles.selectedFilterChipText,
                  ]}
                >
                  {city.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <FlatList
        data={filteredClubs}
        renderItem={renderClubItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.clubsList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No clubs found matching your criteria</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#e6f2ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginTop: 5,
  },
  filterScrollContent: {
    paddingBottom: 10,
  },
  filterChip: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    marginRight: 10,
  },
  selectedFilterChip: {
    backgroundColor: '#3498db',
  },
  filterChipText: {
    fontSize: 14,
    color: '#666',
  },
  selectedFilterChipText: {
    color: '#fff',
    fontWeight: '500',
  },
  clubsList: {
    padding: 20,
  },
  clubItem: {
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
  clubImage: {
    width: 120,
    height: 120,
  },
  clubContent: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  clubHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  clubName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff9e6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 3,
  },
  clubDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
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
  sportText: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: '500',
  },
  clubFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  courtsText: {
    fontSize: 13,
    color: '#666',
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});