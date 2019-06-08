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

  getProgramma(){
    let headers = new HttpHeaders({});
    return this.http.get(environment.apiUrl + '/admin/programma', { headers: headers });
  }

  getProgrammazione(){
    let headers = new HttpHeaders({});
    return this.http.get(environment.apiUrl + '/admin/programmazione', { headers: headers });
  }

  getProgrammazioneGiorno(){
    let headers = new HttpHeaders({});
    return this.http.get(environment.apiUrl + '/admin/programmazione/giorno', { headers: headers });
  }

  getScheda(){
    let headers = new HttpHeaders({});
    return this.http.get(environment.apiUrl + '/admin/scheda', { headers: headers });
  }

  getProgressione(){
    let headers = new HttpHeaders({});
    return this.http.get(environment.apiUrl + '/admin/progressione', { headers: headers });
  }
}
