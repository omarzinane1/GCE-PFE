import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { SjchequesService } from 'src/app/services/ServiceSJcheque/sjcheques.service';
import { Cheque } from 'src/app/types/interface';


@Component({
  selector: 'app-sjccheque',
  templateUrl: './sjccheque.component.html',
  styleUrls: ['./sjccheque.component.css'],
})
export class SJCChequeComponent {
  SJCchequesArray: any[] = [];
  ItemsArray: any[] = [];
  Role: any;
  cin: string = '';
  numcheque: string = '';
  data: any[] = [];
  clients: any;
  anything: string = '';
  statusFilter: string = 'impaye';
  searchTerm$ = new Subject<string>();

  constructor(
    private servicejn: SjchequesService,
    private toastr: ToastrService,
    private http: HttpClient
  ) {
    this.searchTerm$
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((searchTerm) => {
        this.onSearchByAnything(searchTerm);
      });
  }
  ngOnInit(): void {
    this.getChequesArray();
  }
   //get Data for SJN cheques
   getChequesArray() {
    this.servicejn.SJCgetCheques().subscribe((res: any) => {
      this.SJCchequesArray = res;
      console.log(this.SJCchequesArray)
    });
  }

  //Méthode Pay
  pay(id: number) {
    this.servicejn.SJCupdatePay(id, 'payé').subscribe(
      (response) => {
        this.toastr.success('Paiement effectué avec succès', 'Succès');
        this.getChequesArray();
      },
      (error) => {
        this.toastr.error('Échec du paiement', 'Erreur');
      }
    );
  }

  //Recherche lorsque le statut change
  onStatusChange(): void {
    this.onSearchByAnything(this.statusFilter);
  }
  onSearchByAnything(searchTerm: string): void {
    this.http
      .get<Cheque[]>(
        `http://127.0.0.1:8000/api/sjc/SJCsearchCheques?statut=${this.statusFilter}&search=${searchTerm}`
      )
      .subscribe(
        (data) => {
          this.SJCchequesArray = data;
        },
        (error) => {
          console.error('Erreur lors de la recherche:', error);
        }
      );
  }
}
