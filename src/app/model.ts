export class AuthUser {
    id_atleta: number;
    id_specializzazione: number;
    nome: string;
    cognome: string;
    data_nascita: Date;
    token: string;
    message?:string;
    code?:number;
}

export class Schede{
    id_scheda: number;
    nome: string;
    durata: number;
    data_inizio: Date;
    data_fine: Date;
    id_atleta: number;
}

export class Progressioni{
    id_progressione: number;
    id_scheda: number;
    id_esercizio: number;
    giorno: number;
    serie: number;
    ripetizioni: number;
    note: string;
}

export class Programmi{
    id_programma: number;
    id_atleta: number;
    data_inizio: Date;
    data_fine: Date;
    note: string;
};

export class Programmazioni{
    id_programmazione: number;
    id_programma: number;
    id_esercizio: number;
    settimana: number;
    giorno: number;
    data: Date;
    serie: number;
    carico: number;
    ripetizioni: number;
    note: string;
};

export class Note{
    id_note: number;
    id_atleta: number;
    data: Date;
    note: string;
}

export class Pesi{
    id_peso: number;
    id_atleta: number;
    peso: number;
    data: Date;
    note: string;
}