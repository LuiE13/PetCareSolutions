import { ScrollView, View, Text ,StyleSheet, TouchableOpacity, FlatList, TouchableWithoutFeedback, Image,ImageBackground} from "react-native";
import {router} from 'expo-router';
import {useCreatePersister} from 'tinybase/ui-react';
import{ createStore } from "tinybase";
import * as sqlite from "expo-sqlite";
import { createExpoSqlitePersister } from "tinybase/persisters/persister-expo-sqlite";




export default function Home() {
    const store = createStore();
    const db = sqlite.openDatabaseSync('petcare.db');
    const persister = createExpoSqlitePersister(store, db);
    return(
        <View style={styles.tela}>
            <View style={{width: "100%", height: 85, alignItems: "center"}}>
                <View style={styles.topBarShadow} />
                <View style={styles.topBar}>
                    <View>
                        <Text style={styles.pagTitle}>
                            Olá, {store.getCell('usuario', 'info', 'nome')?store.getCell('usuario', '1', 'nome'):"Usuário"}!
                        </Text>
                        <Text>
                            Todo cuidado em um so lugar...
                        </Text>
                    </View>
                    <TouchableWithoutFeedback >
                        <Image style={styles.perfil} source={require("../assets/images/user.png")}></Image>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{alignItems:"center", gap:30, paddingBottom:100}}>
            <View style={styles.lembrete}>
                <View style={{gap:10, padding:15}}>
                    <View style={{flexDirection:"row", alignItems:"center", gap:10, marginBottom:5}}>
                        <Image style={styles.pata} source={require("@/assets/images/pata.png")}></Image>
                        <Text style={styles.lembreteText}>Vacina contra Raiva</Text>
                    </View>
                    <View style={{flexDirection:"row", alignItems:"center", gap:10, marginBottom:5}}>
                        <Image style={styles.clock} source={require("@/assets/images/clock.png")}></Image>
                        <Text style={styles.lembreteText}>10:00 AM - 20/10/2024</Text>
                    </View>
                </View>
                <View style={{paddingRight:20}}>
                    <Image style={styles.pataColor} source={require("@/assets/images/pataColor.png")}></Image>
                </View>
            </View>
            

            <View style={{width:"100%", height:330}}>
                <Text style={styles.listTitle}>Meus Pets</Text>
                <FlatList
                    style={styles.petList}
                    horizontal
                    data={[{id: '1', name: 'Rex',sexo:"macho",especie:"Cachorro"}, {id: '2', name: 'Luna',sexo:"femea",especie:"Gato"}, {id: '3', name: 'Max',sexo:"macho",especie:"Cachorro"}]}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity activeOpacity={1} style={[styles.petItem]}>
                            <Image style={styles.imageItem} source={(item.especie=="Cachorro"?require("@/assets/images/cachorro.jpeg"):require("@/assets/images/gato.jpeg"))}></Image>
                            <View style={{flexDirection:"row", alignItems:"center",width:"90%"}}>
                                <Text style={{fontSize:20,color:"#000000",fontWeight:"bold"}}>{item.name}</Text>
                                <Image style={styles.imageSexoItem} source={(item.sexo=="macho"?require("@/assets/images/macho.png"):require("@/assets/images/femea.png"))}></Image>
                            </View>
                            <Text style={{color:"#686868ff",width:"90%",marginBottom:15}}>{item.especie}</Text>
                        </TouchableOpacity>
                    )}
                    showsHorizontalScrollIndicator={false}
                    ListFooterComponent={
                        <View style={styles.addPet}>
                            <TouchableOpacity activeOpacity={0.8} style={styles.addButton} onPress={() => router.push('/cadastroPet')}>
                                <Image style={{height:40,width:40}} source={require("../assets/images/add.png")}></Image>
                            </TouchableOpacity>
                            <Text style={{fontSize:20,color:"#000000"}}>Adicionar Pet</Text>
                        </View>
                    }
                />
            </View>

            
            <TouchableOpacity activeOpacity={0.8} style={styles.anuncio} onPress={() => router.push('/home')}>
                <Image style={styles.anuncioImage} source={require("@/assets/images/anuncioC.png")}></Image>
            </TouchableOpacity>
        </ScrollView>
            
               

            
            <View style={styles.navbar}>
                <TouchableWithoutFeedback style={styles.navItem} onPress={() => router.push('/home')}>
                    <Image style={styles.pata} source={require("../assets/images/forum.png")}></Image>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback style={styles.navItem} onPress={() => router.push('/home')}>
                    <Image style={styles.pata} source={require("../assets/images/pet.png")}></Image>
                </TouchableWithoutFeedback>
                <View style={styles.here}>
                    <TouchableWithoutFeedback style={styles.navItem} onPress={() => router.push('/home')}>
                        <Image style={styles.pata} source={require("../assets/images/home.png")}></Image>
                    </TouchableWithoutFeedback>
                </View>
                
                <TouchableWithoutFeedback style={styles.navItem} onPress={() => router.push('/home')}>
                    <Image style={styles.pata} source={require("../assets/images/premium.png")}></Image>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback style={styles.navItem} onPress={() => router.push('/home')}>
                    <Image style={styles.pata} source={require("../assets/images/chatbot.png")}></Image>
                </TouchableWithoutFeedback>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    tela:{
        gap:50,
        alignItems:"center",
        backgroundColor:"#FFFFFF",
        height:"100%",
    },
    pagTitle:{
        fontSize:24,
    },
    topBarShadow: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 85,
        backgroundColor: "#D2C3FF",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 25,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        zIndex: 0,
    },
    topBar:{
        position: "relative",
        zIndex: 1,
        backgroundColor: "#D2C3FF",
        elevation: 10,
        shadowColor: '#000000ff',
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.25,
        shadowRadius: 5,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        width:"100%",
        height:85,
    },
    perfil:{
        height:50,
        width:50,
    },
    lembrete:{
        backgroundColor:"#805BEF",
        width:"80%",
        zIndex:1,
        borderRadius:20,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"flex-end",
        elevation: 15,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.9,
        shadowRadius: 5,
    },
    lembreteText:{
        color:"#FFFFFF"
    },
    pata:{
        height:35,
        width:35
    },
    clock:{
        height:20,
        width:20
    },
    pataColor:{
        height:85,
        width:85
    },
    listTitle:{
        fontSize:28,
        fontWeight:"bold",
        marginLeft:20,
        marginBottom:10,
    },
    petList:{
        height:270,
        paddingRight:20,
        paddingTop:10,
        paddingBottom:10,
        //backgroundColor:"#FF0000"
    },
    petItem:{
        height:250,
        width:200,
        backgroundColor:"#FFFFFF",
        justifyContent:"center",
        alignItems:"center",
        elevation: 10,
        shadowColor: '#000000ff',
        borderRadius:20,
        marginHorizontal:10,
    },
    imageItem:{
        height:"70%",
        width:"90%",
        borderRadius:20,
        marginBottom:10,
    },
    imageSexoItem:{
        height:20,
        width:20,
        marginLeft:3,
    },
    addPet:{
        height:250,
        width:200,
        backgroundColor:"#FFFFFF",
        justifyContent:"center",
        alignItems:"center",
        marginRight:30,
        fontSize:16,
    },
    addButton:{
        height:100,
        width:100,
        backgroundColor:"#ffffffff",
        elevation: 10,
        shadowColor: '#000000ff',
        shadowOffset: {width: 0, height: 0},
        justifyContent:"center",
        alignItems:"center",
        borderRadius:50,
        marginBottom:30,
    },
    anuncio:{
        width:"90%",
        elevation: 15,
        shadowColor: '#000000ff',
    },
    anuncioImage:{
        width:"100%",
        height:220,
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