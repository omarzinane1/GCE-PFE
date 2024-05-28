import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsulterService {

  private apiUrl = 'http://127.0.0.1:8000/api/dfc/search';

  constructor(private http: HttpClient) {}

  search(params: any): Observable<any> {
    return this.http.get(this.apiUrl, { params });
  }
}
