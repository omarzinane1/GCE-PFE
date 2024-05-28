import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { SjchequesService } from 'src/app/services/ServiceSJcheque/sjcheques.service';
import { Cheque } from 'src/app/types/interface';

@Component({
  selector: 'app-jscheque',
  templateUrl: './jscheque.component.html',
  styleUrls: ['./jscheque.component.css'],
})
export class JschequeComponent implements OnInit {
  SJNchequesArray: any[] = [];
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
    this.servicejn.SJNgetCheques().subscribe((res: any) => {
      this.SJNchequesArray = res;
      console.log(this.SJNchequesArray);
    });
  }

  //Méthode Pay
  pay(id: number) {
    this.servicejn.SJNupdatePay(id, 'payé').subscribe(
      (response) => {
        this.toastr.success('Paiement effectué avec succès', 'Succès');
        this.getChequesArray();
      },
      (error) => {
        this.toastr.error('Échec du paiement', 'Erreur');
      }
    );
  }
  //Méthode pour share le cheque
  shareCheque(cheque: any) {
    console.log(cheque);
    this.servicejn.SJNinsertCheque(cheque).subscribe(
      (response) => {
        this.toastr.success('Chèque inséré avec succès', 'Succès');
        this.getChequesArray();
      },
      (error) => {
        this.toastr.error("Erreur lors de l'insertion du chèque", 'Erreur');
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
        `http://127.0.0.1:8000/api/sjn/SJNsearchCheques?statut=${this.statusFilter}&search=${searchTerm}`
      )
      .subscribe(
        (data) => {
          this.SJNchequesArray = data;
        },
        (error) => {
          console.error('Erreur lors de la recherche:', error);
          console.log(this.data);
        }
      );
  }
}
