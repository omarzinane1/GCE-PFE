import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { saveAs } from 'file-saver';


@Injectable({
  providedIn: 'root'
})
export class ClientService {


  constructor(private http: HttpClient) {}

  // Méthode pour créer un nouveau client
  // private baseUrl = 'http://127.0.0.1:8000/api/sc/createClient';
  // createClient(cheque: any): Observable<any> {
  //   return this.http.post<any>(this.baseUrl, cheque);
  // }
  //Méthode pour affichier les cheques
  private UrlChaques = 'http://127.0.0.1:8000/api/sc/display';
  getCheques(){
    return this.http.get(this.UrlChaques);
  }
  // la service pour genere une file pdF
  baseUrlEX: string = 'http://127.0.0.1:8000/api/sc';
  exportPDF(cin: string | null, numcheque: string | null): Observable<void> {
    let params = new HttpParams();

    if (cin) {
      params = params.set('cin', cin);
    }

    if (numcheque) {
      params = params.set('numcheque', numcheque);
    }

    return this.http
      .get(`${this.baseUrlEX}/export-pdf`, { params, responseType: 'blob' })
      .pipe(
        map((blob) => {
          const file = new Blob([blob], { type: 'application/pdf' });
          saveAs(file, 'clients.pdf');
        })
      );
  }


private apiUrl = 'http://127.0.0.1:8000/api/sc/data-filtered';
  search(params: any): Observable<any> {
    return this.http.get(this.apiUrl, { params });
  }

  //exportation form excel
  //export Cheques forma excl
  exportClients(): void {
    const url = 'http://127.0.0.1:8000/api/sc/export-clients';
    this.http.get(url, { responseType: 'blob' }).subscribe((blob) => {
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = 'cheques.xlsx'; // Nom du fichier
      a.click();
    });
  }
   //modifier les cheque
   baseUrlPay = 'http://127.0.0.1:8000/api/sc/pay';
   updatePay(id: number, statut: string): Observable<any> {
     const url = `${this.baseUrlPay}/${id}`;
     return this.http.put(url, { statut });
   }
   //Méthode pour share Cheque dans SJ
   apiUrlshareCheque: string = 'http://127.0.0.1:8000/api/sc';
   insertCheque(cheque: any): Observable<any> {
     return this.http.post(`${this.apiUrlshareCheque}/shareCheque`, cheque);
   }


}


