import { View , Text, StyleSheet, Image, TouchableWithoutFeedback} from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useState, useEffect, use } from "react";
import { Pet } from "@/objects/pet";
import { useSQLiteContext } from "expo-sqlite";
import { useDatabase } from "@/database/useDatabase";
import LoadCat from "@/components/loadcat";
export default function PagPet() {
    const database = useDatabase()
    const [petData, setPetData] = useState<Pet>(new Pet("","0",new Date,"",0,"","","",0,));
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useLocalSearchParams<{ id: string }>();
    const { nextPet } = useLocalSearchParams<{ nextPet: string }>();
    async function fetchPetData() {
        
        const pet = new Pet("","0",new Date,"",0,"","","",0,) ;
        
        database.getPet(Number(id)).then((data)=>{
            if(data.length>0){
                pet.id = data[0].Id_pet;
                pet.donoId = data[0].Id_Usuario;
                pet.nome = data[0].Nome;    
                pet.especie = data[0].Especie;
                pet.dataNasc = new Date(data[0].Data_Nascimento);
                pet.raca = data[0].Raca;
                pet.peso = data[0].Peso;
                pet.cor = data[0].Cor;
                pet.genero = data[0].Sexo;
                pet.porte = data[0].Porte;
                setPetData(pet);
                setIsLoading(false);
                console.log(pet);
            }
        })
        
    }

    return (
        <View onLayout={fetchPetData} style={{flex:1, backgroundColor:"#FFFAEF"}}>
            {isLoading ? (
                <LoadCat/>
            ) : (
                <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                    <View style={styles.topShadow}/>
                    <Text style={{fontSize:35, fontWeight:"bold",zIndex:10,top:40, position:"absolute", color:"#000000"}}>Página do Pet</Text>
                    <View style={styles.petInfo}>
                        <Image style={styles.petImage} source={(petData.especie=="Cão"?require("@/assets/images/cachorro.jpeg"):require("@/assets/images/gato.jpeg"))}></Image>
                        <View style={styles.basicInfo}>
                            <View style={{flexDirection:"row", alignItems:"center", width:"60%"}}>
                                <Text style={styles.nome}>{petData.nome}</Text>
                                <Image style={styles.genImg} source={(petData.genero=="Macho"||"macho"?require("@/assets/images/macho.png"):require("@/assets/images/femea.png"))}/>
                            </View>
                            <Text style={styles.raca}>{petData.raca}</Text>
                        </View>
                        <Text style={{fontSize:16, color:"#000000ff"}}>{petData.especie}</Text>
                        <Text style={{fontSize:16, color:"#000000ff"}}>{Number(petData.dataNasc) - Number(new Date)}</Text>
                    </View>
                    
                    <View style={styles.navbar}>
                        <TouchableWithoutFeedback style={styles.navItem} onPress={() => console.log('/forum')}>
                            <Image style={styles.navImg} source={require("@/assets/images/forum.png")}></Image>
                        </TouchableWithoutFeedback>
                        <View style={styles.here}>
                            <Link style={styles.navItem} href={{pathname : "/pet", params : {id : nextPet, nextPet: id}}}>
                                <Image style={styles.navImg} source={require("@/assets/images/pet.png")}></Image>
                            </Link>
                        </View>
                        <TouchableWithoutFeedback style={styles.navItem} onPress={() => router.push('/home')}>
                            <Image style={styles.navImg} source={require("@/assets/images/home.png")}></Image>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback style={styles.navItem} onPress={() => console.log("Premium")}>
                            <Image style={styles.navImg} source={require("@/assets/images/premium.png")}></Image>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback style={styles.navItem} onPress={ () => console.log('/chatbot')}>
                            <Image style={styles.navImg} source={require("@/assets/images/chatbot.png")}></Image>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    topShadow:{
        width: '100%',
        height: 150,
        backgroundColor: '#F2C438',
        top: 0,
        position: 'absolute',
        left: 0,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    petInfo:{
        flex:1,
        width: '85%',
        maxHeight: '35%',
        top: 110,
        position: 'absolute',
        backgroundColor: '#FFFAEF',
        padding: 20,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    petImage:{
        maxWidth: "100%",
        maxHeight: "65%",
        borderRadius: 20,
    },
    nome:{
        fontSize:29,
        fontWeight:"bold",
        marginBottom:10,
        maxWidth:"60%",
        color:"#000000"
    },
    raca:{
        fontSize:21,
        width:"40%",
        textAlign:"right",
        color:"#555555"
    },
    genImg:{
        width:35,
        height:35,
        marginLeft:10,
    },
    basicInfo:{
        flexDirection:"row",
        width:"100%",
        alignItems:"center",
        marginBottom:10,
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 70,
        backgroundColor: '#805BEF',
        position: 'absolute',
        bottom: 0,
        width: '90%',
        paddingBottom: 10,
        paddingTop: 10,
        marginBottom: 10,
        borderRadius: 35,
        elevation: 10,
        shadowColor: '#000000ff',
    },
    navItem: {  
        alignItems: 'center',
    },
    navText: {
        fontSize: 12,
        marginTop: 4,
        color: '#333',
    },
    navImg:{
        height:35,
        width:35
    },
    here:{
        width:55,
        height:55,
        backgroundColor:"#F2C438", 
        borderRadius:35, 
        justifyContent:"center", 
        alignItems:"center", 
        paddingBottom:5,
    }
});