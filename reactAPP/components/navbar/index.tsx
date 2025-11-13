import { TouchableWithoutFeedback, View, Image, ViewProps } from "react-native";
import { Link } from "expo-router";
import { styles } from './styles';
import { useState } from "react";

export type TabType ={
    here: string,
    idPet:string,
    idNextPet: string
}

export function NavBar({here,idPet,idNextPet, ...rest}:TabType){
    const [destaque,setDestaque] = useState(here)
    return(
        <View style={styles.navbar}>
            <TouchableWithoutFeedback style={styles.navItem} onPress={() => console.log('/home')}>
                <Image style={styles.pata} source={require("@/assets/images/forum.png")}></Image>
            </TouchableWithoutFeedback>
            <Link style={styles.navItem} href={{pathname : "/pet", params : {id : idPet , nextPet: idNextPet}}}>
                <Image style={styles.pata} source={require("@/assets/images/pet.png")}></Image>
            </Link>
            <TouchableWithoutFeedback style={styles.navItem}>
                <Image style={styles.pata} source={require("@/assets/images/home.png")}></Image>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback style={styles.navItem} onPress={() => console.log('/home')}>
                <Image style={styles.pata} source={require("@/assets/images/premium.png")}></Image>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback style={styles.navItem} onPress={() => console.log('/home')}>
                <Image style={styles.pata} source={require("@/assets/images/chatbot.png")}></Image>
            </TouchableWithoutFeedback>
        </View>
    )
}