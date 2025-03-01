import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Calendar, Users, Clock, TrendingUp, Award, LogOut } from 'lucide-react-native';

export default function ManagerDashboardScreen() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const todayBookings = [
    {
      id: '1',
      customerName: 'Rahul Sharma',
      court: 'Court 1 (Indoor)',
      time: '10:00 AM - 11:00 AM',
      status: 'confirmed',
    },
    {
      id: '2',
      customerName: 'Priya Patel',
      court: 'Court 2 (Indoor)',
      time: '11:00 AM - 12:00 PM',
      status: 'confirmed',
    },
    {
      id: '3',
      customerName: 'Amit Kumar',
      court: 'Court 3 (Indoor)',
      time: '02:00 PM - 03:00 PM',
      status: 'pending',
    },
    {
      id: '4',
      customerName: 'Neha Singh',
      court: 'Court 4 (Outdoor)',
      time: '05:00 PM - 06:00 PM',
      status: 'confirmed',
    },
  ];

  const handleLogout = () => {
    router.replace('/(auth)/welcome');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.clubName}>Kampus Padel</Text>
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <LogOut size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: '#e6f7ff' }]}>
              <Calendar size={24} color="#3498db" />
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statValue}>24</Text>
              <Text style={styles.statLabel}>Bookings Today</Text>
            </View>
          </View>
          
          <View style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: '#fff0e6' }]}>
              <Users size={24} color="#ff9500" />
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statValue}>156</Text>
              <Text style={styles.statLabel}>Total Customers</Text>
            </View>
          </View>
          
          <View style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: '#e6fffa' }]}>
              <Clock size={24} color="#00b894" />
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statValue}>85%</Text>
              <Text style={styles.statLabel}>Court Occupancy</Text>
            </View>
          </View>
          
          <View style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: '#f0e6ff' }]}>
              <TrendingUp size={24} color="#9b59b6" />
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statValue}>₹24,500</Text>
              <Text style={styles.statLabel}>Revenue Today</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Bookings</Text>
            <TouchableOpacity onPress={() => router.push('/(manager)/bookings')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {todayBookings.map((booking) => (
            <View key={booking.id} style={styles.bookingItem}>
              <View style={styles.bookingContent}>
                <Text style={styles.customerName}>{booking.customerName}</Text>
                <Text style={styles.bookingDetails}>{booking.court}</Text>
                <Text style={styles.bookingTime}>{booking.time}</Text>
              </View>
              <View style={[
                styles.statusBadge,
                booking.status === 'confirmed' ? styles.confirmedBadge : styles.pendingBadge
              ]}>
                <Text style={[
                  styles.statusText,
                  booking.status === 'confirmed' ? styles.confirmedText : styles.pendingText
                ]}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Court Status</Text>
            <TouchableOpacity onPress={() => router.push('/(manager)/courts')}>
              <Text style={styles.viewAllText}>Manage</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.courtsContainer}>
            <View style={styles.courtItem}>
              <View style={styles.courtInfo}>
                <Text style={styles.courtName}>Court 1 (Indoor)</Text>
                <Text style={styles.courtStatus}>Currently: Occupied</Text>
              </View>
              <View style={[styles.occupancyIndicator, styles.occupiedIndicator]} />
            </View>
            
            <View style={styles.courtItem}>
              <View style={styles.courtInfo}>
                <Text style={styles.courtName}>Court 2 (Indoor)</Text>
                <Text style={styles.courtStatus}>Currently: Available</Text>
              </View>
              <View style={[styles.occupancyIndicator, styles.availableIndicator]} />
            </View>
            
            <View style={styles.courtItem}>
              <View style={styles.courtInfo}>
                <Text style={styles.courtName}>Court 3 (Indoor)</Text>
                <Text style={styles.courtStatus}>Currently: Maintenance</Text>
              </View>
              <View style={[styles.occupancyIndicator, styles.maintenanceIndicator]} />
            </View>
            
            <View style={styles.courtItem}>
              <View style={styles.courtInfo}>
                <Text style={styles.courtName}>Court 4 (Outdoor)</Text>
                <Text style={styles.courtStatus}>Currently: Available</Text>
              </View>
              <View style={[styles.occupancyIndicator, styles.availableIndicator]} />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Tournaments</Text>
            <TouchableOpacity onPress={() => router.push('/(manager)/tournaments')}>
              <Text style={styles.viewAllText}>Manage</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tournamentCard}>
            <View style={styles.tournamentIconContainer}>
              <Award size={24} color="#3498db" />
            </View>
            <View style={styles.tournamentContent}>
              <Text style={styles.tournamentName}>Summer Padel Championship</Text>
              <Text style={styles.tournamentDate}>June 25-27, 2025</Text>
              <Text style={styles.tournamentParticipants}>24 teams registered</Text>
            </View>
          </View>
        </View>

        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsContainer}>
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => router.push('/(manager)/courts')}
            >
              <Text style={styles.quickActionText}>Manage Courts</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => router.push('/(manager)/bookings')}
            >
              <Text style={styles.quickActionText}>View Bookings</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => router.push('/(manager)/customers')}
            >
              <Text style={styles.quickActionText}>Customer List</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => router.push('/(manager)/tournaments')}
            >
              <Text style={styles.quickActionText}>Create Tournament</Text>
            </TouchableOpacity>
          </View>
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
    fontSize: 14,
    color: '#666',
  },
  clubName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollView: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  section: {
    marginBottom: 20,
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
  viewAllText: {
    fontSize: 14,
    color: '#3498db',
  },
  bookingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bookingContent: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
  },
  bookingDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  bookingTime: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  confirmedBadge: {
    backgroundColor: '#e6f7ff',
  },
  pendingBadge: {
    backgroundColor: '#fff9e6',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  confirmedText: {
    color: '#3498db',
  },
  pendingText: {
    color: '#f39c12',
  },
  courtsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
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
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  courtInfo: {
    flex: 1,
  },
  courtName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
  },
  courtStatus: {
    fontSize: 14,
    color: '#666',
  },
  occupancyIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  occupiedIndicator: {
    backgroundColor: '#e74c3c',
  },
  availableIndicator: {
    backgroundColor: '#2ecc71',
  },
  maintenanceIndicator: {
    backgroundColor: '#f39c12',
  },
  tournamentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tournamentIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e6f2ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  tournamentContent: {
    flex: 1,
  },
  tournamentName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
  },
  tournamentDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  tournamentParticipants: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: '500',
  },
  quickActionsSection: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  quickActionButton: {
    width: '48%',
    backgroundColor: '#3498db',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
});