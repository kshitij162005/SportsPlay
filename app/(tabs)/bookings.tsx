import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import { Clock, MapPin } from 'lucide-react-native';

type BookingStatus = 'upcoming' | 'past' | 'cancelled';

interface Booking {
  id: string;
  clubName: string;
  clubImage: string;
  sport: string;
  date: string;
  time: string;
  duration: string;
  court: string;
  price: string;
  location: string;
  status: BookingStatus;
}

const bookings: Booking[] = [
  {
    id: '1',
    clubName: 'Kampus Padel',
    clubImage: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    sport: 'Padel',
    date: '2025-06-15',
    time: '18:00',
    duration: '1 hour',
    court: 'Court 2 (Indoor)',
    price: '₹800',
    location: 'Mumbai',
    status: 'upcoming',
  },
  {
    id: '2',
    clubName: 'Tennis Paradise',
    clubImage: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    sport: 'Tennis',
    date: '2025-06-20',
    time: '10:00',
    duration: '2 hours',
    court: 'Court 1 (Outdoor)',
    price: '₹1200',
    location: 'Delhi',
    status: 'upcoming',
  },
  {
    id: '3',
    clubName: 'Football Arena',
    clubImage: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    sport: 'Football',
    date: '2025-06-10',
    time: '19:00',
    duration: '1 hour',
    court: 'Field 3 (Indoor)',
    price: '₹1200',
    location: 'Bangalore',
    status: 'past',
  },
  {
    id: '4',
    clubName: 'Basketball Court',
    clubImage: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2090&q=80',
    sport: 'Basketball',
    date: '2025-06-05',
    time: '17:00',
    duration: '1 hour',
    court: 'Court 1 (Indoor)',
    price: '₹500',
    location: 'Chennai',
    status: 'cancelled',
  },
];

export default function BookingsScreen() {
  const [selectedTab, setSelectedTab] = useState<BookingStatus>('upcoming');
  const [selectedDate, setSelectedDate] = useState('');
  
  const filteredBookings = bookings.filter(booking => {
    if (selectedDate && booking.date !== selectedDate) {
      return false;
    }
    return booking.status === selectedTab;
  });

  const markedDates = bookings.reduce((acc, booking) => {
    const color = booking.status === 'upcoming' 
      ? '#3498db' 
      : booking.status === 'cancelled' 
        ? '#e74c3c' 
        : '#7f8c8d';
    
    return {
      ...acc,
      [booking.date]: {
        marked: true,
        dotColor: color,
        selected: booking.date === selectedDate,
        selectedColor: booking.date === selectedDate ? '#e6f2ff' : undefined,
      }
    };
  }, {});

  const renderBookingItem = ({ item }: { item: Booking }) => (
    <View style={styles.bookingItem}>
      <View style={styles.bookingHeader}>
        <Image source={{ uri: item.clubImage }} style={styles.clubImage} />
        <View style={styles.bookingHeaderContent}>
          <Text style={styles.clubName}>{item.clubName}</Text>
          <View style={styles.locationContainer}>
            <MapPin size={14} color="#666" />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
        </View>
        <View style={[
          styles.statusBadge,
          item.status === 'upcoming' ? styles.upcomingBadge : 
          item.status === 'cancelled' ? styles.cancelledBadge : styles.pastBadge
        ]}>
          <Text style={[
            styles.statusText,
            item.status === 'upcoming' ? styles.upcomingText : 
            item.status === 'cancelled' ? styles.cancelledText : styles.pastText
          ]}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>
      
      <View style={styles.bookingDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Sport:</Text>
          <Text style={styles.detailValue}>{item.sport}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Date:</Text>
          <Text style={styles.detailValue}>{new Date(item.date).toLocaleDateString('en-US', { 
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          })}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Time:</Text>
          <View style={styles.timeContainer}>
            <Clock size={14} color="#666" />
            <Text style={styles.detailValue}>{item.time} ({item.duration})</Text>
          </View>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Court:</Text>
          <Text style={styles.detailValue}>{item.court}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Price:</Text>
          <Text style={styles.priceValue}>{item.price}</Text>
        </View>
      </View>
      
      {item.status === 'upcoming' && (
        <View style={styles.bookingActions}>
          <TouchableOpacity style={styles.rescheduleButton}>
            <Text style={styles.rescheduleButtonText}>Reschedule</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Bookings</Text>
      </View>

      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={(day) => {
            setSelectedDate(selectedDate === day.dateString ? '' : day.dateString);
          }}
          markedDates={markedDates}
          theme={{
            todayTextColor: '#3498db',
            arrowColor: '#3498db',
            dotColor: '#3498db',
            selectedDayBackgroundColor: '#3498db',
          }}
        />
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'upcoming' && styles.activeTab]}
          onPress={() => setSelectedTab('upcoming')}
        >
          <Text style={[styles.tabText, selectedTab === 'upcoming' && styles.activeTabText]}>
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'past' && styles.activeTab]}
          onPress={() => setSelectedTab('past')}
        >
          <Text style={[styles.tabText, selectedTab === 'past' && styles.activeTabText]}>
            Past
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'cancelled' && styles.activeTab]}
          onPress={() => setSelectedTab('cancelled')}
        >
          <Text style={[styles.tabText, selectedTab === 'cancelled' && styles.activeTabText]}>
            Cancelled
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredBookings}
        renderItem={renderBookingItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.bookingsList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No {selectedTab} bookings found</Text>
            {selectedDate && (
              <Text style={styles.emptySubtext}>
                for {new Date(selectedDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Text>
            )}
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
  calendarContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#3498db',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#3498db',
    fontWeight: '600',
  },
  bookingsList: {
    padding: 20,
  },
  bookingItem: {
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bookingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  clubImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  bookingHeaderContent: {
    flex: 1,
    marginLeft: 15,
  },
  clubName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
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
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  upcomingBadge: {
    backgroundColor: '#e6f7ff',
  },
  pastBadge: {
    backgroundColor: '#f2f2f2',
  },
  cancelledBadge: {
    backgroundColor: '#ffebee',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  upcomingText: {
    color: '#3498db',
  },
  pastText: {
    color: '#7f8c8d',
  },
  cancelledText: {
    color: '#e74c3c',
  },
  bookingDetails: {
    padding: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  bookingActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  rescheduleButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#eee',
  },
  rescheduleButtonText: {
    color: '#3498db',
    fontWeight: '600',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#e74c3c',
    fontWeight: '600',
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
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 5,
  },
});