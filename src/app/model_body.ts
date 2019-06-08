export class Auth { 
    username: string;
    password: string;
}

export class Scheda{
    id_scheda: number;
    nome: string;
    durata: number;
    data_inizio: Date;
    data_fine: Date;
    id_atleta: number;
}

export class Progressione{
    id_progressione: number;
    id_scheda: number;
    id_esercizio: number;
    giorno: number;
    serie: number;
    ripetizioni: number;
    note: string;
}

export class Programma{
    id_programma: number;
    id_atleta: number;
    data_inizio: Date;
    data_fine: Date;
    note: string;
};

export class Programmazione{
    id_programmazione: number;
    id_programma: number;
    id_esercizio: number;
    data: Date;
    settimana: number;
    giorno: number;
    serie: number;
    carico: number;
    ripetizioni: number;
    note: string;
};