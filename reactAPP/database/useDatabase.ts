import { Pet } from "@/objects/pet"
import { Usuario } from "@/objects/usuario"
import { useSQLiteContext } from "expo-sqlite"

export function useDatabase(){
    const database = useSQLiteContext() 
    async function create(dados : Usuario|Pet) {
       
        if(dados instanceof Usuario){
            try {
                
                const statement = await database.prepareAsync(
                     `INSERT INTO usuarios (Id_Usuario, Nome, Senha, Email, Premium, Data_Nascimento, Foto, Tema, Idioma, Notificacao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
                 );
                var passar = {
                    id : Number(dados.Id_usuario),
                    nome:String(dados.nome),
                    foto: String(dados.fotoPerfil),
                    data : Number(dados.dataNascimento)
                }
              
                const result = await statement.executeAsync([
                    passar.id,
                    passar.nome,
                    dados.senha,
                    dados.email,
                    dados.premium,
                    passar.data,
                    passar.foto||"",
                    dados.tema,
                    dados.idioma,
                    dados.notificacoes
                ])
                const insertedRowId = result.lastInsertRowId.toLocaleString()
                
                statement.finalizeAsync()
                return { insertedRowId }
            } catch (error) {
                throw error
            }
        }
                
            
        
    }
    async function getUser() {
        try{
            const query = "SELECT * FROM usuarios"
            type userData = {
                Id_Usuario: number
                Nome: string
                Email: string 
                Senha: string 
                Data_Nascimento: Date
                Foto: string
                Premium: boolean 
                Notificacao: boolean 
                Tema: string 
                Idioma: string 
            }
            const response = await database.getAllAsync<userData>(query)
            return response
        }catch(error) {
                throw error
        }
        
    }
    async function sair() {
        const del = await database.execAsync("DELETE FROM usuarios")
        
        return del
    }
    return{create,getUser,sair}
}