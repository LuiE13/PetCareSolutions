import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 70,
        backgroundColor: '#805BEF',
        position: 'absolute',
        bottom: 0,
        width: '80%',
        paddingBottom: 10,
        paddingTop: 10,
    },
    navItem: {  
        alignItems: 'center',
    },
    navText: {
        fontSize: 12,
        marginTop: 4,
        color: '#333',
    },
});