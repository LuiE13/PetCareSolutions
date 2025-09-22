import { useState } from 'react';
import {  View, Text , StyleSheet, Image, TouchableOpacity} from 'react-native';
import { router } from 'expo-router';

export default function Index() {
    // Example of using useState hook
    const [name, setName] = useState("")

    function entrar() {
        router.navigate('/home');
    }
    function cadastrar() {
        router.navigate('/cadastro');
    }
    return (
        <View style={styles.conteiner}>
            <Image style={styles.image} source={require("../assets/images/logoColor.png")} />
            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.title}>Seu pet em boas patas.</Text>
            <TouchableOpacity style={styles.entrar} activeOpacity={0.9} onPress={entrar}>
                <Text style={styles.textE}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cadastrar} activeOpacity={0.9} onPress={cadastrar}>
                <Text style={styles.textC}>Cadastrar-se</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    conteiner:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    image:{
        width: 130,
        height: 130,
        marginBottom: 20,
    },
    title:{
        color: 'black',
        fontWeight: 'bold',
        fontSize: 30,
        fontFamily: 'Roboto_700Bold',
    },
    entrar: {
        marginBlockStart: 30,
        width: 300,
        height: 50,
        backgroundColor: '#805BEF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
    },
    cadastrar: {
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    textE:{
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
        fontFamily: 'Roboto_700Bold',
    },
    textC:{
        color: '#000',
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Roboto_700Bold',
    }
});