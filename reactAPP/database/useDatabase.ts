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
                    nome : String(dados.nome),
                    foto : String(dados.fotoPerfil),
                    data : Number(dados.dataNascimento)
                }
                console.log("Dados do usuário a serem inseridos:", {
                    Id_Usuario: passar.id,
                    Nome: passar.nome,
                    Senha: dados.senha,
                    Email: dados.email,
                    Premium: dados.premium,
                    Data_Nascimento: passar.data,
                    Foto: passar.foto,
                    Tema: dados.tema,
                    Idioma: dados.idioma,
                    Notificacao: dados.notificacoes
                });
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
                
         if(dados instanceof Pet){
            try {
                
                
                const statemento = await database.prepareAsync(
                    `INSERT INTO pet (id_pet, Id_Usuario, foto, Nome, Especie, data_nascimento, Raca, Peso, Cor, sexo, Porte) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
                var passou = {
                    idPet: Number(dados.id),
                    dataNascimento: Number(dados.dataNasc),
                    peso: Number(dados.peso)
                }
                // console.log("Statement prepared:", statement);
                // console.log("Data to be inserted:", {
                //     idPet: passou.idPet,
                //     donoId: Number(dados.donoId),
                //     nome: String(dados.nome),
                //     especie: String(dados.especie),
                //     dataNascimento: passou.dataNascimento,
                //     raca: String(dados.raca),
                //     peso: passou.peso,
                //     cor: String(dados.cor),
                //     genero: String(dados.genero),
                //     porte: String(dados.porte)
                // });

                const resulto = await statemento.executeAsync([
                    passou.idPet,
                    Number(dados.donoId),
                    String(dados.photo)||"",
                    String(dados.nome),
                    String(dados.especie),
                    passou.dataNascimento,
                    String(dados.raca),
                    passou.peso,
                    String(dados.cor),
                    String(dados.genero),
                    String(dados.porte)
                ]);
                const insertedRowId = resulto.lastInsertRowId.toLocaleString()
                statemento.finalizeAsync();
                return { insertedRowId }
            }catch (error) {
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
    async function getPet(id:number) {
        try{
            const query = `SELECT * FROM pet WHERE Id_pet = ?`
            type petData = {
                Id_pet: number
                Id_Usuario: number
                Nome: string
                Especie: string 
                Data_Nascimento: Date
                Raca: string 
                Peso: number 
                Cor: string
                Sexo: string 
                Porte: string 
            }
            const response = await database.getAllAsync<petData>(query,[id])
            return response
        }catch(error) {
                throw error
        }
    }
    async function sair() {
        const del = await database.execAsync("DELETE FROM usuarios")
        const delPet = await database.execAsync("DELETE FROM pet")
        // const drop = await database.execAsync("DROP TABLE IF EXISTS usuarios")
        // const dropPet = await database.execAsync("DROP TABLE IF EXISTS pet")
        return del
    }
    return{create,getUser,getPet,sair}
}