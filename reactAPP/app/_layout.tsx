import { SQLiteProvider } from "expo-sqlite";
import { Slot } from "expo-router";
import { initializeDatabase } from "@/database/initializeDatabase";

export default function layout(){
    return(
        <SQLiteProvider databaseName="petcare.db" onInit={initializeDatabase}>
            <Slot/>
        </SQLiteProvider>
    )
}