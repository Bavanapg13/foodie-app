
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleReset = async () => {
    if (!email.trim() || !newPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (newPassword.length < 8) {
      Alert.alert('Error', 'Password must contain at least 8 characters.');
      return;
    }

    try {
      const savedUser = await SecureStore.getItemAsync('foodie_user');

      if (!savedUser) {
        Alert.alert('Error', 'No registered account found.');
        return;
      }

      const user = JSON.parse(savedUser);

      if (email.trim().toLowerCase() !== user.email) {
        Alert.alert('Error', 'Email address does not match.');
        return;
      }

      await SecureStore.setItemAsync(
        'foodie_demo_password',
        newPassword
      );

      Alert.alert(
        'Success',
        'Password reset successfully. Please login.',
        [{ text: 'Login', onPress: () => navigation.navigate('Login') }]
      );
    } catch (error) {
      Alert.alert('Error', 'Unable to reset password.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🍽️ Foodie</Text>
      <Text style={styles.heading}>Forgot Password?</Text>
      <Text style={styles.subtitle}>
        Enter your registered email and choose a new password.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Registered Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F3',
    justifyContent: 'center',
    padding: 25,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6B35',
    textAlign: 'center',
    marginBottom: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: '#777',
    marginVertical: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#FF6B35',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  link: {
    color: '#FF6B35',
    textAlign: 'center',
    marginTop: 20,
  },
});
