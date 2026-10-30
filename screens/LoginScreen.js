
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

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Login Error', 'Please enter email and password.');
      return;
    }

    try {
      const savedUser = await SecureStore.getItemAsync('foodie_user');
      const savedPassword = await SecureStore.getItemAsync(
        'foodie_demo_password'
      );

      if (!savedUser || !savedPassword) {
        Alert.alert(
          'Login Error',
          'No account found. Please sign up first.'
        );
        return;
      }

      const user = JSON.parse(savedUser);

      if (
        email.trim().toLowerCase() !== user.email ||
        password !== savedPassword
      ) {
        Alert.alert(
          'Login Error',
          'Invalid email or password. Please try again.'
        );
        return;
      }

      Alert.alert('Success', `Welcome, ${user.username}!`, [
        {
          text: 'Continue',
          onPress: () => navigation.replace('Tabs'),
        },
      ]);
    } catch (error) {
      Alert.alert('Login Error', 'Unable to login. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🍽️ Foodie</Text>
      <Text style={styles.heading}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Login to continue</Text>

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
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.link}>
          Don't have an account? Sign Up
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
  onPress={() => navigation.navigate('ForgotPassword')}
>
  <Text style={styles.link}>Forgot Password?</Text>
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
    marginTop: 8,
    marginBottom: 25,
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
