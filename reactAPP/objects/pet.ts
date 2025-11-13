import { Usuario } from "./usuario";
import{ createStore } from "tinybase";
import * as sqlite from "expo-sqlite";
import { Vacina } from "./vacina";
import { push } from "expo-router/build/global-state/routing";

class Pet{
    id?: number;
    nome: string;
    dataNasc: String
    raca: string;
    peso: number
    cor: string;
    porte: string;
    especie : string;
    genero: string;
    donoId: number;
    photo?: string;
    vacinas?: Array<Vacina>;

    constructor(especie : string,nome: string, dataNasc: Date, raca: string, peso: number, cor: string, porte: string, genero: string, donoId: number){
       
        this.nome = nome;
        this.dataNasc = String(dataNasc.getFullYear())+"-"+String(dataNasc.getMonth()+1)+"-"+String(dataNasc.getUTCDate());
        
        this.raca = raca;
        this.peso = peso;
        this.cor = cor;
        this.porte = porte;
        this.genero = genero;
        this.donoId = donoId;
        this.especie =especie
        
    }

    public async register(): Promise<number> {
        var resposta = 0;
        
        
        await fetch('https://api-rest-comedouro-2poss.onrender.com/pet/novoPet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Nome: this.nome,
                data_nascimento: this.dataNasc,
                Raca: this.raca,
                Peso: this.peso,
                Cor: this.cor,
                Porte: this.porte,
                Genero: this.genero,
                id_Usuario: this.donoId,
                Especie: this.especie
            })
        }).then(response => {
            
            if (response.status == 400) {
                resposta = 400;
            }
            if (response.status == 500) {
                resposta = 500;
            }
            //corrigir o erro daqui
            response.json().then(data => {
                this.id = data.Id_pet;
            })
            return response.json()
        })
        return resposta;
    }
    
    public async registerVac(nomeVac:string, dataVac:Date, dataProxDose:Date|null): Promise<number> {
        var resposta = 0;
        await fetch('https://api-rest-comedouro-2poss.onrender.com/pet/vacinarPet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            //id_pet, id_usuario, nomeVac, dataVacina, dataProxDose
            body: JSON.stringify({
                id_pet: this.id,
                id_usuario: this.donoId,
                nomeVac: nomeVac,
                dataVacina: dataVac,
                dataProxDose: dataProxDose
            })
        }).then(response => {
            if (response.status == 400) {
                resposta = 400;
                return response
            }
            if (response.status == 500) {
                resposta = 500;
                return response
            }
            
            if (response.status == 201) {
                resposta = 201;
                return response
            }
        })
        
        return resposta
    }

    public async searchVacinas(): Promise<number> {
        var resposta = 0;
        await fetch('https://api-rest-comedouro-2poss.onrender.com/pet/vacinasPet/'+this.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.status == 400) {
                resposta = 400;
                return
            }
            if (response.status == 500) {
                resposta = 500;
                return
            }
            if (response.status == 404) {
                resposta = 404;
                return 
            }
            return response.json()
        }).then(data => {
            this.vacinas = new Array<Vacina>();
            data.forEach((vacinaData:any) => {
                const vacina = new Vacina(
                    vacinaData.Id_vacinas,
                    vacinaData.id_pet,
                    vacinaData.id_usuario,
                    vacinaData.nomeVac,
                    new Date(vacinaData.dataVacina),
                    vacinaData.dataProxDose ? new Date(vacinaData.dataProxDose) : undefined
                );
                this.vacinas?.push(vacina);
            });
        })
        
        return resposta
    }

}

export { Pet }