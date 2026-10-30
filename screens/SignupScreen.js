
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

export default function SignupScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    if (!username.trim() || !email.trim() || !password) {
      Alert.alert('Signup Error', 'Please fill in all fields.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      Alert.alert('Signup Error', 'Please enter a valid email.');
      return;
    }

    if (password.length < 8) {
      Alert.alert(
        'Signup Error',
        'Password must contain at least 8 characters.'
      );
      return;
    }

    try {
      const existingUser = await SecureStore.getItemAsync(
        'foodie_user'
      );

      if (existingUser) {
        Alert.alert(
          'Signup Error',
          'An account already exists on this device.'
        );
        return;
      }

      const user = {
        username: username.trim(),
        email: email.trim().toLowerCase(),
      };

      await SecureStore.setItemAsync(
        'foodie_user',
        JSON.stringify(user)
      );

      // Demo only: this is not secure password authentication.
      await SecureStore.setItemAsync(
        'foodie_demo_password',
        password
      );

      Alert.alert('Success', 'Registration completed!', [
        {
          text: 'Go to Login',
          onPress: () => navigation.navigate('Login'),
        },
      ]);
    } catch (error) {
      Alert.alert('Signup Error', 'Unable to register. Try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🍽️ Foodie</Text>
      <Text style={styles.heading}>Create Account</Text>
      <Text style={styles.subtitle}>Join Foodie today!</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSignup}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.link}>
          Already have an account? Login
        </Text>
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
    fontSize: 27,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#222',
  },
  subtitle: {
    textAlign: 'center',
    color: '#777',
    marginBottom: 25,
    marginTop: 8,
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
    marginTop: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    color: '#FF6B35',
    textAlign: 'center',
    marginTop: 20,
  },
});
