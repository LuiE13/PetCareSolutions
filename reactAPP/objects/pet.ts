import { Usuario } from "./usuario";

class Pet{
    id?: number;
    nome: string;
    dataNasc: Date
    raca: string;
    peso: number
    cor: string;
    porte: string;
    genero: string;
    donoId: number;
    photo?: string;

    constructor(nome: string, dataNasc: Date, raca: string, peso: number, cor: string, porte: string, genero: string, donoId: number){
        this.nome = nome;
        this.dataNasc = dataNasc;
        this.raca = raca;
        this.peso = peso;
        this.cor = cor;
        this.porte = porte;
        this.genero = genero;
        this.donoId = donoId;
        const usuario = new Usuario("","","",new Date());
        usuario.addPet(this);
    }

    public async register(): Promise<number> {
        var resposta = 0;
        await fetch('https://api-rest-comedouro-2poss.onrender.com/pet/cadastro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Nome: this.nome,
                Data_nasc: this.dataNasc,
                Raca: this.raca,
                Peso: this.peso,
                Cor: this.cor,
                Porte: this.porte,
                Genero: this.genero,
                Id_dono: this.donoId
            })
        }).then(response => {
            if (response.status == 400) {
                resposta = 400;
            }
            if (response.status == 500) {
                resposta = 500;
            }
            response.json().then(data => {
                this.id = data.Id_pet;
            })
            return response.json()
        })
        return resposta;
    }
}

export { Pet }