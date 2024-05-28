import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { AuthServiceService } from 'src/app/services/AuthService/auth-service.service';
import { DashboardService } from 'src/app/services/ServiceDashboard/dashboard.service';
import { ClientService } from 'src/app/services/serviceclient/client.service';
import { Cheque } from 'src/app/types/interface';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  chequesArray: any[]=[];
  ItemsArray: any[]=[];
  Role: any;
  cin: string='';
  numcheque: string='';
  data: any[]=[];
  clients: any;
  anything:string = ''
  statusFilter: string = 'impaye';
  searchTerm$ = new Subject<string>();

  constructor(private clientService: ClientService,
     private AuthServ: AuthServiceService,
     private toastr: ToastrService,
     private http: HttpClient
    ){
      this.searchTerm$.pipe(
        debounceTime(300),
        distinctUntilChanged()
      ).subscribe((searchTerm) => {
        this.onSearchByAnything(searchTerm);
      });
    }
  ngOnInit(): void {
    this.getChequesArray();
    this.geTlocalStorage();
  }

  //get users data
  geTlocalStorage() {
    const user = this.AuthServ.getUser();
    this.Role = user.role;
    console.log(this.Role);
  }
  isFormVisible = false;

  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }
  //get Data for cheques sc
  getChequesArray() {
    this.clientService.getCheques().subscribe((res: any) => {
      this.chequesArray = res;
      console.log(this.chequesArray)
    });
  }
  //Recherche lorsque le statut change
  onStatusChange(): void {
    this.onSearchByAnything(this.statusFilter);
  }
  onSearchByAnything(searchTerm: string): void {
    this.http.get<Cheque[]>(`http://127.0.0.1:8000/api/sc/searchCheques?statut=${this.statusFilter}&search=${searchTerm}`).subscribe(
      (data) => {
        this.chequesArray = data;
      },
      (error) => {
        console.error('Erreur lors de la recherche:', error);
      }
    );
  }
  // obj: any = {};
  // getElementObj(id: any): any {
  //   this.clientService.getClients().subscribe((res: any) => {
  //     this.ClientsArray = res;
  //     this.ClientsArray.map((element) => {
  //       if (element.id == id) this.obj = element;
  //     });
  //   });
  // }
  // chequeArray: any[] = [];
  // getElement(id: any): any {
  //   this.clientService.getClients().subscribe((res: any) => {
  //     this.ClientsArray = res;
  //     this.ClientsArray.map((element) => {
  //       if (element.id == id) return element;
  //     });
  //   });
  // }

  // searchParams = {
  //   cin: '',
  //   numcheque: '',

  // };
  // onSearch(searchTerm: string): void {
  //   this.clientService.search(this.searchParams).subscribe((result) => {
  //     this.clients = result;
  //   });
  // }

  //Méthode Pay
  pay(id: number) {
    this.clientService.updatePay(id, 'payé').subscribe(
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
    console.log(cheque)
    this.clientService.insertCheque(cheque).subscribe(
      (response) => {
        this.toastr.success('votre chéque est bien transféré', 'Succès');
        this.getChequesArray();
      },
      (error) => {
        this.toastr.error("votre chéque est bien transféré", 'Erreur');
      }
    );
  }



}
