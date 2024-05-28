import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cheque } from 'src/app/types/interface';

@Injectable({
  providedIn: 'root',
})
export class ChequeService {
  private baseUrl = 'http://127.0.0.1:8000/api/dfc/store';

  constructor(private http: HttpClient) {}

  // Méthode pour créer un nouveau chèque
  createCheque(cheque: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, cheque);
  }
  //Méthode pour affichier les cheques
  private UrlChaques = 'http://127.0.0.1:8000/api/dfc/display';
  getCheques() {
    return this.http.get(this.UrlChaques);
  }
  //modifier les cheque
  baseUrlUp: string = 'http://127.0.0.1:8000/api/dfc/cheques';
  updateCheque(id: number, chequeData: any): Observable<any> {
    return this.http.put(`${this.baseUrlUp}/${id}`, chequeData);
  }
  // supprimier le cheque par dfc
  DropCheque(id: number): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8000/api/dfc/deleteCheque/${id}`);
  }

  //export Cheques forma excl DFC
  exportCheques(
    statut: string,
    dateReception1: string,
    dateReception2: string
  ): void {
    const url = `http://127.0.0.1:8000/api/dfc/export-cheques?statut=${statut}&date_reception=${dateReception1}&date_validation=${dateReception2}`;
    this.http.get(url, { responseType: 'blob' }).subscribe((blob) => {
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = 'cheques_excel.xlsx';
      a.click();
    });
  }

  private apiUrl = 'http://127.0.0.1:8000/api/dfc/data-filtered';
  getFilteredData(
    statut: string,
    dateReception1: string,
    dateReception2: string
  ): Observable<any> {
    return this.http.get(
      `${this.apiUrl}?statut=${statut}&date_reception=${dateReception1}&date_validation=${dateReception2}`
    );
  }
  // la service pour genere une file pdF
  downloadPdf(
    statut: string,
    startDate: string,
    endDate: string
  ): Observable<Blob> {
    return this.http.get(
      `http://127.0.0.1:8000/api/dfc/export-pdf?statut=${statut}&date_reception=${startDate}&date_validation=${endDate}`,
      { responseType: 'blob' }
    );
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
  //Méthode pour affichier les SJcheques
  private UrlSJcheques = 'http://127.0.0.1:8000/api/sj/display';
  getSJcheques() {
    return this.http.get(this.UrlSJcheques);
  }
}
