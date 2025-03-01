import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
  return (
    <LinearGradient
      colors={['#1a2a6c', '#b21f1f', '#fdbb2d']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>SportsPlay</Text>
          </View>
          
          <View style={styles.heroContainer}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1029&q=80' }}
              style={styles.heroImage}
              resizeMode="cover"
            />
          </View>
          
          <View style={styles.textContainer}>
            <Text style={styles.title}>Book Sports Facilities</Text>
            <Text style={styles.subtitle}>
              Find and book the best clubs in your city for Padel, Tennis, Football, and more
            </Text>
          </View>
          
          <View style={styles.buttonContainer}>
            <Link href="/(tabs)" asChild>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Continue as Player</Text>
              </TouchableOpacity>
            </Link>
            
            <Link href="/(auth)/manager-inquiry" asChild>
              <TouchableOpacity style={styles.outlineButton}>
                <Text style={styles.outlineButtonText}>Club Manager? Get Started</Text>
              </TouchableOpacity>
            </Link>
            
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account?</Text>
              <Link href="/(auth)/login" asChild>
                <TouchableOpacity>
                  <Text style={styles.loginLink}>Log In</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
  },
  heroContainer: {
    height: '40%',
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 20,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a2a6c',
  },
  outlineButton: {
    borderWidth: 2,
    borderColor: '#fff',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  outlineButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  loginText: {
    color: '#fff',
    marginRight: 5,
  },
  loginLink: {
    color: '#fff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});