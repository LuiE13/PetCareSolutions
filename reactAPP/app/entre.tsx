import {  View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { Input } from '@/components/input';
import { router } from 'expo-router';

export default function Entre() {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../assets/images/logoColor.png')} />
            <Text style={styles.title}>Login</Text>
            <Input placeholder="Email:" />
            <Input placeholder="Senha:" secureTextEntry />
            <TouchableOpacity style={styles.esquece} activeOpacity={0.9} onPress={() => router.navigate('/esqueceu')}>
                <Text style={styles.esqueceText}>Esqueceu a senha?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} activeOpacity={0.9} onPress={() => router.navigate('/home')}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
            <Text style={styles.text}>ou</Text>
            <View style={styles.outros}>
                <TouchableOpacity style={styles.imgeButton} activeOpacity={0.9} onPress={() => {}}>
                    <Image style={styles.img} source={require('../assets/images/google.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.imgeButton} activeOpacity={0.9} onPress={() => {}}>
                    <Image style={styles.img} source={require('../assets/images/facebok.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.imgeButton} activeOpacity={0.9} onPress={() => {}}>
                    <Image style={styles.img} source={require('../assets/images/outlok.png')} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.cadastre} activeOpacity={0.9} onPress={() => router.navigate('/cadastro')}>
                <Text style={styles.text}>Ainda não tem conta</Text>
                <Text style={[styles.text, { textDecorationLine: 'underline', fontWeight: 'bold' }]}>Cadastre-se</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 36,
        paddingTop:120,
        gap:10,
    },
    image: {
        width: 130,
        height: 130,
        marginBottom: 20,
    },
    title: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 30,
        fontFamily: 'Roboto_700Bold',
        marginBottom: 20,
    },
    esquece: {
        width: '100%',
        marginBottom: 20,
    },
    esqueceText: {
        textAlign: 'right',
        fontSize: 16,
        fontFamily: 'Roboto_400Regular',
        textDecorationLine: 'underline',
    },
    button: {
        width: "100%",
        height: 50,
        backgroundColor: '#805BEF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    text:{
        fontSize: 18,
        fontFamily: 'Roboto_400Regular',
        marginTop: 10,
    },
    cadastre:{
        gap: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    imgeButton:{
        marginTop: 10,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    img:{
        width: 50,
        height: 50,
    },
    outros:{
        flexDirection: 'row',
        gap: 30,
        marginTop: 10,
    }
});