import { useState } from 'react';
import {  View, Text , StyleSheet} from 'react-native';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { router } from 'expo-router';

export default function Index() {
    // Example of using useState hook
    const [name, setName] = useState("")

    function handlenext() {
        router.navigate('/home');
    }
    return (
        <View style={styles.conteiner}>
            <Text style={styles.title}>Hello {name}</Text>

            <Input onChangeText={setName} />

            <Button title="continuar" onPress={handlenext}/>
            <Button title="sair" onPress={handlenext}/>

        </View>
    )
}

const styles = StyleSheet.create({
    conteiner:{
        flex:1,
        justifyContent: 'center',
        padding: 32,
        gap: 16,
    },
    title:{
        color: 'blue',
        fontSize: 24,
        fontWeight: 'bold',
    }});