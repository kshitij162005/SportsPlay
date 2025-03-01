import { useState, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search, Bell, ChevronRight, Star, MapPin } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const featuredClubs = [
  {
    id: '1',
    name: 'Kampus Padel',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    rating: 4.8,
    location: 'Mumbai',
    courts: '3 indoor, 1 outdoor',
    sport: 'Padel',
  },
  {
    id: '2',
    name: 'Tennis Paradise',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    rating: 4.6,
    location: 'Delhi',
    courts: '5 outdoor',
    sport: 'Tennis',
  },
  {
    id: '3',
    name: 'Football Arena',
    image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    rating: 4.5,
    location: 'Bangalore',
    courts: '2 indoor, 3 outdoor',
    sport: 'Football',
  },
];

const popularSports = [
  {
    id: '1',
    name: 'Padel',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: '2',
    name: 'Tennis',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: '3',
    name: 'Football',
    image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
  },
  {
    id: '4',
    name: 'Basketball',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2090&q=80',
  },
];

const nearbyClubs = [
  {
    id: '1',
    name: 'Kampus Padel',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    distance: '2.5 km',
    sport: 'Padel',
  },
  {
    id: '2',
    name: 'Tennis Paradise',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    distance: '3.2 km',
    sport: 'Tennis',
  },
  {
    id: '3',
    name: 'Football Arena',
    image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    distance: '4.1 km',
    sport: 'Football',
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const renderFeaturedItem = ({ item, index }: { item: typeof featuredClubs[0], index: number }) => (
    <TouchableOpacity 
      style={styles.featuredItem}
      onPress={() => router.push(`/club/${item.id}`)}
    >
      <Image source={{ uri: item.image }} style={styles.featuredImage} />
      <View style={styles.featuredOverlay}>
        <View style={styles.featuredContent}>
          <Text style={styles.featuredName}>{item.name}</Text>
          <View style={styles.featuredDetails}>
            <View style={styles.ratingContainer}>
              <Star size={16} color="#FFD700" fill="#FFD700" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
            <View style={styles.locationContainer}>
              <MapPin size={16} color="#fff" />
              <Text style={styles.locationText}>{item.location}</Text>
            </View>
          </View>
          <Text style={styles.courtsText}>{item.courts}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderSportItem = ({ item }: { item: typeof popularSports[0] }) => (
    <TouchableOpacity 
      style={styles.sportItem}
      onPress={() => router.push(`/search?sport=${item.name}`)}
    >
      <Image source={{ uri: item.image }} style={styles.sportImage} />
      <View style={styles.sportOverlay}>
        <Text style={styles.sportName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderNearbyItem = ({ item }: { item: typeof nearbyClubs[0] }) => (
    <TouchableOpacity 
      style={styles.nearbyItem}
      onPress={() => router.push(`/club/${item.id}`)}
    >
      <Image source={{ uri: item.image }} style={styles.nearbyImage} />
      <View style={styles.nearbyContent}>
        <Text style={styles.nearbyName}>{item.name}</Text>
        <View style={styles.nearbyDetails}>
          <Text style={styles.nearbyDistance}>{item.distance}</Text>
          <Text style={styles.nearbySport}>{item.sport}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.floor(event.nativeEvent.contentOffset.x / slideSize);
    if (index !== activeSlide) {
      setActiveSlide(index);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, Player!</Text>
          <Text style={styles.subGreeting}>Find your perfect court today</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Search size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Bell size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.featuredSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Clubs</Text>
            <TouchableOpacity 
              style={styles.seeAllButton}
              onPress={() => router.push('/search')}
            >
              <Text style={styles.seeAllText}>See All</Text>
              <ChevronRight size={16} color="#3498db" />
            </TouchableOpacity>
          </View>

          <FlatList
            ref={flatListRef}
            data={featuredClubs}
            renderItem={renderFeaturedItem}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            snapToInterval={width - 40}
            decelerationRate="fast"
            contentContainerStyle={styles.featuredList}
          />

          <View style={styles.pagination}>
            {featuredClubs.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  { backgroundColor: index === activeSlide ? '#3498db' : '#ddd' },
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.sportsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Sports</Text>
            <TouchableOpacity 
              style={styles.seeAllButton}
              onPress={() => router.push('/search')}
            >
              <Text style={styles.seeAllText}>See All</Text>
              <ChevronRight size={16} color="#3498db" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={popularSports}
            renderItem={renderSportItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.sportsList}
          />
        </View>

        <View style={styles.nearbySection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby Clubs</Text>
            <TouchableOpacity 
              style={styles.seeAllButton}
              onPress={() => router.push('/locations')}
            >
              <Text style={styles.seeAllText}>See All</Text>
              <ChevronRight size={16} color="#3498db" />
            </TouchableOpacity>
          </View>

          {nearbyClubs.map((club) => (
            <TouchableOpacity 
              key={club.id}
              style={styles.nearbyItem}
              onPress={() => router.push(`/club/${club.id}`)}
            >
              <Image source={{ uri: club.image }} style={styles.nearbyImage} />
              <View style={styles.nearbyContent}>
                <Text style={styles.nearbyName}>{club.name}</Text>
                <View style={styles.nearbyDetails}>
                  <Text style={styles.nearbyDistance}>{club.distance}</Text>
                  <Text style={styles.nearbySport}>{club.sport}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  subGreeting: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
    marginLeft: 10,
  },
  scrollView: {
    flex: 1,
  },
  featuredSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 14,
    color: '#3498db',
    marginRight: 2,
  },
  featuredList: {
    paddingRight: 20,
  },
  featuredItem: {
    width: width - 40,
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
    marginRight: 15,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
  },
  featuredContent: {
    padding: 15,
  },
  featuredName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  featuredDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  ratingText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 14,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 14,
  },
  courtsText: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.8,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  sportsSection: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  sportsList: {
    paddingRight: 20,
  },
  sportItem: {
    width: 120,
    height: 160,
    borderRadius: 15,
    overflow: 'hidden',
    marginRight: 15,
  },
  sportImage: {
    width: '100%',
    height: '100%',
  },
  sportOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 15,
  },
  sportName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  nearbySection: {
    marginTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  nearbyItem: {
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
  nearbyImage: {
    width: 100,
    height: 100,
  },
  nearbyContent: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  nearbyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  nearbyDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nearbyDistance: {
    fontSize: 14,
    color: '#666',
  },
  nearbySport: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: '500',
  },
});