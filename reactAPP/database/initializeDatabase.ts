import { type SQLiteDatabase } from "expo-sqlite";

export async function initializeDatabase(database: SQLiteDatabase) {
    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS usuarios(
            Id_Usuario interger PRIMARY KEY NOT NULL,
            Nome varchar(100),
            Senha varchar(50),
            Email varchar(150),
            Premium tinyint(1) DEFAULT '0',
            Data_Nascimento date,
            Foto blob,
            Tema text DEFAULT 'Claro',
            Idioma text,
            Notificacao tinyint(1) DEFAULT '0'
        );
    `)
    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS alimentador (
            id_Alimentador int(11) PRIMARY KEY NOT NULL,
            id_pet int(11) NOT NULL,
            Id_Usuario int(11) NOT NULL,
            tipo_raçao text,
            Gramagem int(11) NOT NULL,
            ultima_refeicao datetime,
            intervalo_horas int(11) NOT NULL DEFAULT '6',
            Ra_Extra tinyint(1) DEFAULT '0'
        );
    `)
    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS chatperguntas (
            id_chatPerguntas int(11) PRIMARY KEY NOT NULL,
            Id_Usuario int(11),
            id_pet int(11),
            conteudo text
        );`)
    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS compromissos (
            id_compromissos int(11) PRIMARY KEY NOT NULL,
            id_pet int(11) NOT NULL,
            Id_Usuario int(11) NOT NULL,
            titulo varchar(150),
            descricao text,
            Data date NOT NULL,
            horario time
        );
        CREATE TABLE IF NOT EXISTS likes (
            Id_likes int(11) PRIMARY KEY NOT NULL,
            Id_Usuario int(11),
            Id_post int(11)
        );
        CREATE TABLE IF NOT EXISTS pet (
            id_pet int(11) PRIMARY KEY NOT NULL,
            Id_Usuario int(11) NOT NULL,
            Nome varchar(100) NOT NULL,
            Especie text NOT NULL,
            data_nascimento date NOT NULL,
            Raca varchar(100),
            Peso decimal(5,2),
            Cor varchar(50),
            Porte text NOT NULL,
            descricao_saude text,
            foto blob NOT NULL,
            sexo text NOT NULL DEFAULT 'macho'
        );
        CREATE TABLE IF NOT EXISTS postagens (
            Id_post int(11) PRIMARY KEY NOT NULL,
            Id_Usuario int(11) NOT NULL,
            Titulo varchar(100),
            Conteudo text,
            likes int(11),
            DataPost date
        );
        CREATE TABLE IF NOT EXISTS vacinas (
            Id_vacinas int(11) PRIMARY KEY NOT NULL,
            id_usuario int(11),
            id_pet int(11),
            nomeVac varchar(100)
        );
        CREATE TABLE IF NOT EXISTS respostas (
            Id_respostas int(11) PRIMARY KEY NOT NULL,
            Id_Usuario int(11) NOT NULL,
            Id_post int(11) NOT NULL,
            Conteudo text,
            likes int(11),
            DataPost date
        )
    `)


    
}