import { View, Text ,StyleSheet} from "react-native";
import { Button } from "@/components/button";
import {router} from 'expo-router';


export default function Home() {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Home Screen</Text>
            <Button title="Go Back" onPress={() => router.back()} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});