import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import '../model';
import '../model_body';
import { Pesi } from '../model';
import { Peso } from '../model_body';
@Injectable({
  providedIn: 'root'
})
export class PesoService {

  private pesi:Subject<Pesi[]>;

  constructor(private http: HttpClient){
    this.pesi = new Subject<Pesi[]>();
  }

  getPesi(): Observable<Pesi[]> {
    return this.pesi.asObservable();
  }

  loadPesi(): void {
    this.http.get<Pesi[]>(environment.apiUrl + '/admin/peso').subscribe(res => this.pesi.next(res));
  }

  addPeso(peso: Peso){
    let headers = new HttpHeaders({});
    return this.http.post(environment.apiUrl + `/admin/peso`, JSON.stringify(peso), { headers: headers });
  }

  modifyPeso(peso: Peso){
    let headers = new HttpHeaders({});
    return this.http.put(environment.apiUrl + `/admin/peso`, JSON.stringify(peso), { headers: headers });
  }

  deletPeso(id_peso: number){
    let headers  = new HttpHeaders({});
    return this.http.request('delete', environment.apiUrl + '/admin/peso', { body: { headers: headers, id_peso: id_peso } });
  }
}
