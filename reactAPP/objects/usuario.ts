class Usuario {
    public Id_usuario: number | undefined
    public nome: string | undefined
    public email: string | undefined
    public senha: string | undefined
    public dataNascimento: Date | undefined
    public fotoPerfil?: string
    public premium: boolean = false
    public notificacoes: boolean = true
    public tema: string = "Claro"
    public idioma: string = 'Portugues'
    public pets?: any[]


    constructor(  Email: string , Senha: string ,Nome?: string , Data_nascimento?: Date) {
        this.nome = Nome
        this.email = Email
        this.senha = Senha
        this.dataNascimento = Data_nascimento
        
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
            return response.json().then(data => {   
                this.Id_usuario = data.Id_usuario;
            })
            
            

        })
        return resposta;
    }

    public login(): Promise<any> {
        const dados = fetch("https://api-rest-comedouro-2poss.onrender.com/usuario/login?Email="+this.email+"&Senha="+this.senha,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response =>response.json())
            .then(jsonBody=>{
                jsonBody.results.map((item:any)=>{
                    this.Id_usuario = item.Id_usuario
                    this.nome = item.Nome
                    this.email = item.Email
                    this.senha = item.Senha
                    this.dataNascimento = new Date(item.Data_nascimento)
                    this.fotoPerfil = item.Foto_perfil
                    this.premium = item.Premium
                    this.notificacoes = item.Notificacoes
                    this.tema = item.Tema
                    this.idioma = item.Idioma
                })
                return jsonBody
            })
        return dados
    }   
    public update(): Promise<Response> {
        const dados = fetch("https://api-rest-comedouro-2poss.onrender.com/usuario/atualizar",{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Id_usuario: this.Id_usuario,
                Nome: this.nome,
                Email: this.email,
                Senha: this.senha,
                Data_nascimento: this.dataNascimento,
                Foto_perfil: this.fotoPerfil,
                Premium: this.premium,
                Notificacoes: this.notificacoes,
                Tema: this.tema,
                Idioma: this.idioma
            })
        })
        return dados
    }
    
    public addPet(pet: any){
        if(this.pets){
            this.pets.push(pet)
        }else{
            this.pets = [pet]
        }   
    }
}

export { Usuario };