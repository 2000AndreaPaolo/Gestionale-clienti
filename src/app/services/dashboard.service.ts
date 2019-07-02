import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { Programmi, Programmazioni, Schede, Progressioni } from '../model';
import { Programma, Programmazione, Scheda, Progressione } from '../model_body';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient){}

  getProgramma(id_atleta: number){
    let headers = new HttpHeaders({});
    return this.http.post(environment.apiUrl + '/atleta/programma', JSON.stringify(id_atleta), { headers: headers });
  }

  getProgrammazione(){
    let headers = new HttpHeaders({});
    return this.http.get(environment.apiUrl + '/admin/programmazione', { headers: headers });
  }

  getProgrammazioneGiorno(id_programma: number){
    let headers = new HttpHeaders({});
    return this.http.post(environment.apiUrl + '/atleta/programmazione/giorno', JSON.stringify(id_programma), { headers: headers });
  }

  getScheda(id_atleta: number){
    let headers = new HttpHeaders({});
    return this.http.post(environment.apiUrl + '/atleta/scheda', JSON.stringify(id_atleta), { headers: headers });
  }

  getProgressione(id_scheda: number){
    let headers = new HttpHeaders({});
    return this.http.post(environment.apiUrl + '/atleta/progressione', JSON.stringify(id_scheda), { headers: headers });
  }

  getMassimale(id_atleta: number){
    let headers = new HttpHeaders({});
    return this.http.post(environment.apiUrl + '/admin/prestazione/massimale', JSON.stringify(id_atleta), { headers: headers });
  }
}
