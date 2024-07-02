import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const auth = getAuth();

    const handleLogin = async () => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            Alert.alert('Éxito', 'Sesión iniciada correctamente', [
                { text: 'OK', onPress: () => navigation.navigate('Home') },
            ]);
        } catch (error) {
            console.error('Error al iniciar sesión', error);
            Alert.alert('Error', 'Falló el inicio de sesión. Por favor verifica tus credenciales e intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    const navigateToRegister = () => {
        navigation.navigate('Register');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    keyboardType='email-address'
                    autoCapitalize='none'
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Contraseña:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry={true}
                    autoCapitalize='none'
                />
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Iniciar sesión</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={navigateToRegister}>
                        <Text style={styles.buttonText}>Registrarse</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        paddingLeft: 8,
        width: '100%',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    },
    inputContainer: {
        width: '100%',
        padding: 16,
        backgroundColor: '#f8f9fa',
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#0288d1',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
