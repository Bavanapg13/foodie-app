
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Switch,
} from 'react-native';

import {
  requestNotificationPermission,
  sendTestNotification,
} from './NotificationService';

export default function SettingsScreen({ navigation }) {
  const [notifications, setNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleNotifications = async (value) => {
    if (!value) {
      setNotifications(false);
      Alert.alert(
        'Notifications',
        'Turn off notifications from your phone settings.'
      );
      return;
    }

    try {
      const granted = await requestNotificationPermission();

      if (granted) {
        setNotifications(true);
        Alert.alert('Success', 'Notifications enabled!');
      } else {
        setNotifications(false);
        Alert.alert(
          'Permission Required',
          'Please allow notifications in your phone settings.'
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to configure notifications.');
    }
  };

  const handleTestNotification = async () => {
    try {
      await sendTestNotification();

      Alert.alert(
        'Notification Scheduled',
        'Your test notification will appear in 5 seconds.'
      );
    } catch (error) {
      Alert.alert(
        'Notification Error',
        error.message || 'Unable to send notification.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>
      <Text style={styles.subtitle}>
        Manage your Foodie app preferences
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>

        <View style={styles.row}>
          <Text style={styles.item}>Enable Notifications</Text>
          <Switch
            value={notifications}
            onValueChange={handleNotifications}
            trackColor={{ true: '#FF6B35' }}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.item}>Dark Mode</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ true: '#FF6B35' }}
          />
        </View>

        <TouchableOpacity
          style={styles.testButton}
          onPress={handleTestNotification}
        >
          <Text style={styles.testButtonText}>
            Send Test Notification
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() =>
            Alert.alert('Profile', 'Foodie user profile')
          }
        >
          <Text style={styles.item}>My Profile</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() =>
            Alert.alert('About', 'Foodie Recipe App v1.0')
          }
        >
          <Text style={styles.item}>About Foodie</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() =>
            Alert.alert('Help', 'Contact support for assistance.')
          }
        >
          <Text style={styles.item}>Help & Support</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          })
        }
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F3',
    padding: 20,
  },
  heading: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  subtitle: {
    color: '#777',
    marginTop: 6,
    marginBottom: 25,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#FF6B35',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  item: {
    fontSize: 15,
    color: '#333',
  },
  arrow: {
    fontSize: 22,
    color: '#999',
  },
  testButton: {
    backgroundColor: '#FF6B35',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  testButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#FF6B35',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
