import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/app/types/interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  apiUrl: string="http://127.0.0.1:8000/api";
  constructor(private http: HttpClient) { }
  //getItems Data
  getItems() {
    return this.http.get<Item[]>('http://127.0.0.1:8000/api/admin/admindisplay');
  }
  // private apiUrl = 'http://127.0.0.1:8000/api/admin/deleteUser';
  // drop item par admin
  DropItems(id: number): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8000/api/admin/deleteUser/${id}`);
  }
  // update les roles des utilisateurs
  updateRoleByEmail(email: string, role: string) {
    return this.http.put(`${this.apiUrl}/admin/updaterolebyemail`, { email, role });
  }
  //

  getWithnullvalues() {
    return this.http.get('http://127.0.0.1:8000/api/sc/cheques/with-null-values');
  }

}
