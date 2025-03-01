import { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Star, MapPin, Clock, Calendar, ChevronRight } from 'lucide-react-native';
import Modal from 'react-native-modal';

const { width } = Dimensions.get('window');

const clubs = {
  '1': {
    id: '1',
    name: 'Kampus Padel',
    images: [
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    ],
    rating: 4.8,
    reviews: 124,
    location: 'Mumbai',
    address: '123 Sports Avenue, Mumbai, India',
    description: 'Kampus Padel is a premier padel facility featuring 3 indoor and 1 outdoor courts. Our state-of-the-art facilities provide the perfect environment for players of all levels.',
    hours: 'Mon-Fri: 7:00 AM - 10:00 PM\nSat-Sun: 8:00 AM - 9:00 PM',
    amenities: ['Changing Rooms', 'Showers', 'Pro Shop', 'Parking', 'Cafe'],
    courts: [
      { id: '1', name: 'Court 1', type: 'Indoor', price: '₹800/hour' },
      { id: '2', name: 'Court 2', type: 'Indoor', price: '₹800/hour' },
      { id: '3', name: 'Court 3', type: 'Indoor', price: '₹800/hour' },
      { id: '4', name: 'Court 4', type: 'Outdoor', price: '₹700/hour' },
    ],
    availableTimeSlots: [
      { id: '1', time: '09:00 AM', available: true },
      { id: '2', time: '10:00 AM', available: false },
      { id: '3', time: '11:00 AM', available: true },
      { id: '4', time: '12:00 PM', available: true },
      { id: '5', time: '01:00 PM', available: false },
      { id: '6', time: '02:00 PM', available: true },
      { id: '7', time: '03:00 PM', available: true },
      { id: '8', time: '04:00 PM', available: false },
      { id: '9', time: '05:00 PM', available: true },
      { id: '10', time: '06:00 PM', available: false },
      { id: '11', time: '07:00 PM', available: true },
      { id: '12', time: '08:00 PM', available: true },
    ],
  },
  '2': {
    id: '2',
    name: 'Tennis Paradise',
    images: [
      'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    ],
    rating: 4.6,
    reviews: 98,
    location: 'Delhi',
    address: '456 Tennis Lane, Delhi, India',
    description: 'Tennis Paradise offers 5 premium outdoor courts with professional-grade surfaces. Perfect for casual play, lessons, or competitive matches.',
    hours: 'Mon-Fri: 6:00 AM - 9:00 PM\nSat-Sun: 7:00 AM - 8:00 PM',
    amenities: ['Pro Shop', 'Coaching', 'Equipment Rental', 'Parking', 'Lounge'],
    courts: [
      { id: '1', name: 'Court 1', type: 'Outdoor', price: '₹600/hour' },
      { id: '2', name: 'Court 2', type: 'Outdoor', price: '₹600/hour' },
      { id: '3', name: 'Court 3', type: 'Outdoor', price: '₹600/hour' },
      { id: '4', name: 'Court 4', type: 'Outdoor', price: '₹600/hour' },
      { id: '5', name: 'Court 5', type: 'Outdoor', price: '₹600/hour' },
    ],
    availableTimeSlots: [
      { id: '1', time: '09:00 AM', available: true },
      { id: '2', time: '10:00 AM', available: true },
      { id: '3', time: '11:00 AM', available: false },
      { id: '4', time: '12:00 PM', available: true },
      { id: '5', time: '01:00 PM', available: false },
      { id: '6', time: '02:00 PM', available: true },
      { id: '7', time: '03:00 PM', available: true },
      { id: '8', time: '04:00 PM', available: false },
      { id: '9', time: '05:00 PM', available: true },
      { id: '10', time: '06:00 PM', available: false },
      { id: '11', time: '07:00 PM', available: true },
      { id: '12', time: '08:00 PM', available: true },
    ],
  },
  '3': {
    id: '3',
    name: 'Football Arena',
    images: [
      'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
      'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
      'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    ],
    rating: 4.5,
    reviews: 156,
    location: 'Bangalore',
    address: '789 Football Street, Bangalore, India',
    description: 'Football Arena features 2 indoor and 3 outdoor fields with high-quality artificial turf. Perfect for 5-a-side and 7-a-side matches.',
    hours: 'Mon-Fri: 8:00 AM - 11:00 PM\nSat-Sun: 8:00 AM - 10:00 PM',
    amenities: ['Changing Rooms', 'Showers', 'Equipment Rental', 'Parking', 'Cafe', 'Spectator Area'],
    courts: [
      { id: '1', name: 'Field 1', type: 'Indoor', price: '₹1200/hour' },
      { id: '2', name: 'Field 2', type: 'Indoor', price: '₹1200/hour' },
      { id: '3', name: 'Field 3', type: 'Outdoor', price: '₹1000/hour' },
      { id: '4', name: 'Field 4', type: 'Outdoor', price: '₹1000/hour' },
      { id: '5', name: 'Field 5', type: 'Outdoor', price: '₹1000/hour' },
    ],
    availableTimeSlots: [
      { id: '1', time: '09:00 AM', available: true },
      { id: '2', time: '10:00 AM', available: false },
      { id: '3', time: '11:00 AM', available: true },
      { id: '4', time: '12:00 PM', available: true },
      { id: '5', time: '01:00 PM', available: false },
      { id: '6', time: '02:00 PM', available: true },
      { id: '7', time: '03:00 PM', available: true },
      { id: '8', time: '04:00 PM', available: false },
      { id: '9', time: '05:00 PM', available: true },
      { id: '10', time: '06:00 PM', available: false },
      { id: '11', time: '07:00 PM', available: true },
      { id: '12', time: '08:00 PM', available: true },
    ],
  },
};

export default function ClubDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const club = clubs[id as keyof typeof clubs];
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCourt, setSelectedCourt] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [isBookingModalVisible, setBookingModalVisible] = useState(false);
  const [isConfirmationModalVisible, setConfirmationModalVisible] = useState(false);

  if (!club) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Club not found</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBookNow = () => {
    setBookingModalVisible(true);
  };

  const handleConfirmBooking = () => {
    setBookingModalVisible(false);
    setConfirmationModalVisible(true);
  };

  const handleCloseConfirmation = () => {
    setConfirmationModalVisible(false);
    router.push('/bookings');
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.imageContainer}>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={(event) => {
                const slideSize = event.nativeEvent.layoutMeasurement.width;
                const index = Math.floor(event.nativeEvent.contentOffset.x / slideSize);
                setActiveImageIndex(index);
              }}
              scrollEventThrottle={200}
            >
              {club.images.map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image }}
                  style={styles.clubImage}
                  resizeMode="cover"
                />
              ))}
            </ScrollView>
            
            <View style={styles.pagination}>
              {club.images.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.paginationDot,
                    { backgroundColor: index === activeImageIndex ? '#fff' : 'rgba(255, 255, 255, 0.5)' },
                  ]}
                />
              ))}
            </View>
            
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.contentContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.clubName}>{club.name}</Text>
              <View style={styles.ratingContainer}>
                <Star size={16} color="#FFD700" fill="#FFD700" />
                <Text style={styles.ratingText}>{club.rating}</Text>
                <Text style={styles.reviewsText}>({club.reviews} reviews)</Text>
              </View>
              
              <View style={styles.locationContainer}>
                <MapPin size={16} color="#666" />
                <Text style={styles.locationText}>{club.address}</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>About</Text>
              <Text style={styles.descriptionText}>{club.description}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Opening Hours</Text>
              <View style={styles.hoursContainer}>
                <Clock size={16} color="#666" style={styles.hoursIcon} />
                <Text style={styles.hoursText}>{club.hours}</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Amenities</Text>
              <View style={styles.amenitiesContainer}>
                {club.amenities.map((amenity, index) => (
                  <View key={index} style={styles.amenityItem}>
                    <Text style={styles.amenityText}>{amenity}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Courts</Text>
              <View style={styles.courtsContainer}>
                {club.courts.map((court) => (
                  <View key={court.id} style={styles.courtItem}>
                    <View>
                      <Text style={styles.courtName}>{court.name}</Text>
                      <Text style={styles.courtType}>{court.type}</Text>
                    </View>
                    <Text style={styles.courtPrice}>{court.price}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>

        <Modal
          isVisible={isBookingModalVisible}
          onBackdropPress={() => setBookingModalVisible(false)}
          backdropOpacity={0.5}
          style={styles.modal}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Book a Court</Text>
            
            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>Select Date</Text>
              <TouchableOpacity style={styles.dateSelector}>
                <Calendar size={20} color="#3498db" />
                <Text style={styles.dateSelectorText}>{formatDate(selectedDate)}</Text>
                <ChevronRight size={20} color="#ccc" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>Select Court</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.courtSelector}>
                {club.courts.map((court) => (
                  <TouchableOpacity
                    key={court.id}
                    style={[
                      styles.courtOption,
                      selectedCourt === court.id && styles.selectedCourtOption,
                    ]}
                    onPress={() => setSelectedCourt(court.id)}
                  >
                    <Text
                      style={[
                        styles.courtOptionText,
                        selectedCourt === court.id && styles.selectedCourtOptionText,
                      ]}
                    >
                      {court.name}
                    </Text>
                    <Text
                      style={[
                        styles.courtOptionType,
                        selectedCourt === court.id && styles.selectedCourtOptionText,
                      ]}
                    >
                      {court.type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            
            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>Select Time</Text>
              <View style={styles.timeSlotContainer}>
                {club.availableTimeSlots.map((slot) => (
                  <TouchableOpacity
                    key={slot.id}
                    style={[
                      styles.timeSlot,
                      !slot.available && styles.unavailableTimeSlot,
                      selectedTimeSlot === slot.id && styles.selectedTimeSlot,
                    ]}
                    onPress={() => slot.available && setSelectedTimeSlot(slot.id)}
                    disabled={!slot.available}
                  >
                    <Text
                      style={[
                        styles.timeSlotText,
                        !slot.available && styles.unavailableTimeSlotText,
                        selectedTimeSlot === slot.id && styles.selectedTimeSlotText,
                      ]}
                    >
                      {slot.time}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setBookingModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.confirmButton,
                  (!selectedCourt || !selectedTimeSlot) && styles.disabledButton,
                ]}
                onPress={handleConfirmBooking}
                disabled={!selectedCourt || !selectedTimeSlot}
              >
                <Text style={styles.confirmButtonText}>Confirm Booking</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          isVisible={isConfirmationModalVisible}
          backdropOpacity={0.5}
          style={styles.modal}
        >
          <View style={styles.confirmationModal}>
            <View style={styles.successIcon}>
              <Text style={styles.successIconText}>✓</Text>
            </View>
            <Text style={styles.confirmationTitle}>Booking Confirmed!</Text>
            <Text style={styles.confirmationText}>
              Your booking at {club.name} has been confirmed for {formatDate(selectedDate)}.
            </Text>
            <TouchableOpacity
              style={styles.doneButton}
              onPress={handleCloseConfirmation}
            >
              <Text style={styles.doneButtonText}>View My Bookings</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    height: 250,
    position: 'relative',
  },
  clubImage: {
    width,
    height: 250,
  },
  pagination: {
    position: 'absolute',
    bottom: 15,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  backButton: {
    position: 'absolute',
    top: 15,
    left: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    padding: 20,
  },
  headerContainer: {
    marginBottom: 20,
  },
  clubName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 5,
  },
  reviewsText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
    flex: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  hoursContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  hoursIcon: {
    marginTop: 2,
    marginRight: 5,
  },
  hoursText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityItem: {
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  amenityText: {
    fontSize: 14,
    color: '#333',
  },
  courtsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  courtItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  courtName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
  },
  courtType: {
    fontSize: 14,
    color: '#666',
  },
  courtPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3498db',
  },
  footer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  bookButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalSection: {
    marginBottom: 20,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  dateSelectorText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
  },
  courtSelector: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  courtOption: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginRight: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  selectedCourtOption: {
    backgroundColor: '#3498db',
  },
  courtOptionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
  },
  courtOptionType: {
    fontSize: 12,
    color: '#666',
  },
  selectedCourtOptionText: {
    color: '#fff',
  },
  timeSlotContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  timeSlot: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
    width: '30%',
    alignItems: 'center',
  },
  unavailableTimeSlot: {
    backgroundColor: '#f8f8f8',
    borderColor: '#eee',
    borderWidth: 1,
  },
  selectedTimeSlot: {
    backgroundColor: '#3498db',
  },
  timeSlotText: {
    fontSize: 14,
    color: '#333',
  },
  unavailableTimeSlotText: {
    color: '#ccc',
  },
  selectedTimeSlotText: {
    color: '#fff',
    fontWeight: '500',
  },
  modalFooter: {
    flexDirection: 'row',
    marginTop: 10,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginRight: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#666',
  },
  confirmButton: {
    flex: 2,
    backgroundColor: '#3498db',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#b3d9f2',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  confirmationModal: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4cd964',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  successIconText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  confirmationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  confirmationText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  doneButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#3498db',
    fontWeight: 'bold',
  },
});