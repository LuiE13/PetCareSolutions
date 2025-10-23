import { View , Text} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
export default function Pet() {
    const { id } = useLocalSearchParams<{ id: string }>();
    // so fazer a tela e por as infos no banco........sokkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk 
    return (
        <View>
            <Text>Página do Pet</Text>
        </View>
    )
}