class Usuario {
    public Id_usuario: number | undefined
    public nome: string | undefined
    public email: string | undefined
    public senha: string | undefined
    public dataNascimento: Date | undefined
    public fotoPerfil?: string
    public premium: boolean = false
    public notificacoes: boolean = true
    public tema: String = "Claro"
    public idioma: string = 'Portugues'

    constructor( Nome: string , Email: string , Senha: string , Data_nascimento: Date) {
        this.nome = Nome
        this.email = Email
        this.senha = Senha
        this.dataNascimento = Data_nascimento
        console.log(this)
    }

    public async register(): Promise<number> {
        var resposta = 0;
        await fetch('https://api-rest-comedouro-2poss.onrender.com/usuario/cadastro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Nome: this.nome,
                Email: this.email,
                Senha: this.senha,
                Data_nascimento: this.dataNascimento
            })
        }).then(response => {
            if (response.status == 400) {
                resposta = 400;
            }
            if(response.status == 409){
                resposta = 409;
            }
            if (response.status == 500) {
                resposta = 500;
            }
            return response.json()
        })
        return resposta;
    }

    public login(email: string, senha:string): void {
        fetch("https://api-rest-comedouro-2poss.onrender.com/usuario/login?Email="+email+"&Senha="+senha,).then(response => {
            if (!response.ok) {
                throw new Error('Erro ao fazer login.')
            }
            return response.json()
        })
    }        
}

export { Usuario };