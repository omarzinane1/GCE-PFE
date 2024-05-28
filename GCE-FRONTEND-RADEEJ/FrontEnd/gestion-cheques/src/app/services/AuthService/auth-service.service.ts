import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  apiUrl: string = `http://127.0.0.1:8000/api`;
  private cachedUser: any = null;
  constructor(private http: HttpClient, private toastr: ToastrService) {}

  findUserById(id: number): Observable<any> {
    if (this.cachedUser) {
      return of(this.cachedUser);
    } else {
      return this.http.get(`${this.apiUrl}/user/${id}`).pipe(
        tap((user: any) => {
          this.cachedUser = user;
        })
      );
    }
  }
  //service Methode Login
  PostLogin(data: any): Observable<any> {
    const url: string = `http://127.0.0.1:8000/api/login`;
    return this.http.post<{ token: string }>(url, data);
  }
  // service for register
  postRegister(data: any):Observable<any>{
    return this.http.post(`${this.apiUrl}/register`,data);
  }
  // findUserById(id: number): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/user/${id}`);
  // }
  //User Data
  getUserData() {
    return this.http.get('http://127.0.0.1:8000/api/admindisplay');
  }
  showSuccess() {
    this.toastr.success('Connexion réussie. Bienvenue!', 'Succès');
  }
  showError() {
    this.toastr.error('Adresse e-mail ou mot de passe incorrect.', 'Erreur');
  }
  logout() {
    localStorage.removeItem('accel');
    localStorage.removeItem('elr');
    localStorage.removeItem('token');
  }

  //récuperation de donnée dans  le cas de  login
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  setUser(user: any) {
    this.userSubject.next(user);
  }

  getUser() {
    return this.userSubject.value;
  }

  // forgot Password
  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/resetPassword', { email });
  }

}
