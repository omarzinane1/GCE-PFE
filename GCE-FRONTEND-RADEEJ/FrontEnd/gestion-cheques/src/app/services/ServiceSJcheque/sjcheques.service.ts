import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SjchequesService {
  constructor(private http: HttpClient) {}

   //Méthode pour affichier les cheques
   private UrlChaques = 'http://127.0.0.1:8000/api/sjn/display';
   SJNgetCheques(){
     return this.http.get(this.UrlChaques);
   }

  //SJN
  SJNexportCheques(
    statut: string,
    dateReception1: string,
    dateReception2: string
  ): void {
    const url = `http://127.0.0.1:8000/api/sjn/export-cheques?statut=${statut}&date_reception=${dateReception1}&date_validation=${dateReception2}`;
    this.http.get(url, { responseType: 'blob' }).subscribe((blob) => {
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = 'cheques_excel.xlsx';
      a.click();
    });
  }
  private apiUrl3 = 'http://127.0.0.1:8000/api/sjn/data-filtered';
  SJNgetFilteredData(
    statut: string,
    dateReception1: string,
    dateReception2: string
  ): Observable<any> {
    return this.http.get(
      `${this.apiUrl3}?statut=${statut}&date_reception=${dateReception1}&date_validation=${dateReception2}`
    );
  }
  // la service pour genere une file pdF
  SJNdownloadPdf(
    statut: string,
    startDate: string,
    endDate: string
  ): Observable<Blob> {
    return this.http.get(
      `http://127.0.0.1:8000/api/sjn/export-pdf?statut=${statut}&date_reception=${startDate}&date_validation=${endDate}`,
      { responseType: 'blob' }
    );
  }
  //modifier les cheque
  baseUrlPay = 'http://127.0.0.1:8000/api/sjn/pay';
  SJNupdatePay(id: number, statut: string): Observable<any> {
    const url = `${this.baseUrlPay}/${id}`;
    return this.http.put(url, { statut });
  }
  //Méthode pour share Cheque dans SJ
  apiUrlshareCheque: string = 'http://127.0.0.1:8000/api/sjn';
  SJNinsertCheque(cheque: any): Observable<any> {
    return this.http.post(`${this.apiUrlshareCheque}/SJNshareCheque`, cheque);
  }

  //SJC
   //Méthode pour affichier les cheques
   private UrlSJCChaques = 'http://127.0.0.1:8000/api/sjc/SJCdisplay';
   SJCgetCheques(){
     return this.http.get(this.UrlSJCChaques);
   }
  SJCexportCheques(
    statut: string,
    dateReception1: string,
    dateReception2: string
  ): void {
    const url = `http://127.0.0.1:8000/api/sjc/export-cheques?statut=${statut}&date_reception=${dateReception1}&date_validation=${dateReception2}`;
    this.http.get(url, { responseType: 'blob' }).subscribe((blob) => {
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = 'cheques_excel.xlsx';
      a.click();
    });
  }
  private apiUrl2 = 'http://127.0.0.1:8000/api/sjc/data-filtered';
  SJCgetFilteredData(
    statut: string,
    dateReception1: string,
    dateReception2: string
  ): Observable<any> {
    return this.http.get(
      `${this.apiUrl2}?statut=${statut}&date_reception=${dateReception1}&date_validation=${dateReception2}`
    );
  }
  // la service pour genere une file pdF
  SJCdownloadPdf(
    statut: string,
    startDate: string,
    endDate: string
  ): Observable<Blob> {
    return this.http.get(
      `http://127.0.0.1:8000/api/sjc/export-pdf?statut=${statut}&date_reception=${startDate}&date_validation=${endDate}`,
      { responseType: 'blob' }
    );
  }
  //modifier les cheque
  baseUrlPaySJC = 'http://127.0.0.1:8000/api/sjc/pay';
  SJCupdatePay(id: number, statut: string): Observable<any> {
    const url = `${this.baseUrlPaySJC}/${id}`;
    return this.http.put(url, { statut });
  }
}
