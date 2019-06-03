import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthUser } from '../model';
import { Auth } from '../model_body'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<AuthUser>;
  public currentUser: Observable<AuthUser>;
  user: AuthUser;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<AuthUser>(JSON.parse(sessionStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  currentUserValue(): AuthUser {
    return this.currentUserSubject.value;
  }

  login(auth:Auth): Observable<number> {
    let headers = new HttpHeaders({});
    return this.http.post<AuthUser>(environment.apiUrl + "/atleta/auth", JSON.stringify(auth), { headers: headers}).pipe(
        map((user: AuthUser) => {
         if (user.id_atleta) {
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return 1;
          }else if(user.code === 401)
            return 2;
        })
    )
  }

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
