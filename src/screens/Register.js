import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, ActivityIndicator } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const Register = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false); 

    const auth = getAuth();

    
    const handleRegister = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden');
            return;
        }

        setLoading(true); 
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            Alert.alert('Registro exitoso', 'Usuario registrado correctamente', [
                { text: 'OK', onPress: () => navigation.navigate('Login') },
            ]);
        } catch (error) {
            console.error('Error al registrar el usuario', error);
            Alert.alert('Error', 'Falló el registro. Por favor verifica los datos e intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro de usuario</Text>
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
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirmar Contraseña:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setConfirmPassword}
                    value={confirmPassword}
                    secureTextEntry={true}
                    autoCapitalize='none'
                />
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#0288d1" />
            ) : (
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Registrar</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default Register;

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
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
        width: '100%'
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
        textAlign: 'center',
    },
});
