import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { flush } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/AuthService/auth-service.service';
import { DashboardService } from 'src/app/services/ServiceDashboard/dashboard.service';
import { ChequeService } from 'src/app/services/servicecheque/cheque.service';
import { ClientService } from 'src/app/services/serviceclient/client.service';
import { Item } from 'src/app/types/interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user: any = {};
  UserArray: any[] = [];
  Role: any = '';
  items: Item[] = [];
  Name: string = '';

  email: string = '';
  selectedRole: string = '';
  //client
  Cin?: string;
  Nom?: string;
  Prenom?: string;
  email2?: string;
  Telephone?: string;
  Adresse?: string;
  Ville2?: string;
  numCHEQUE?: string;

  //cheque
  numCheque: string = '';
  montant?: string;
  dateReception: string = '';
  Ville: string = '';
  Banque: string = '';
  Motif: string = '';

  public step1Color: string = '';
  public step2Color: string = '';
  public step3Color: string = '';

  data: any[] = [];
  selectedCheque: any | null = null;

  constructor(
    private AuthServ: AuthServiceService,
    private dashbordservice: DashboardService,
    private chequeService: ChequeService,
    private clientService: ClientService,
    private toastr: ToastrService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getUserUnique();
    this.getAllUser();
    this.geTlocalStorage();
    this.assignColorsBasedOnRole();
    this.getWithnullvalues();
  }

  geTlocalStorage() {
    const user = this.AuthServ.getUser();
    this.Name = user.name;
    this.Role = user.role;
  }

  getUserUnique() {
    this.user = this.AuthServ.getUser();
    if (this.user) {
      this.AuthServ.findUserById(this.user.id).subscribe(
        (res: any) => {
          this.UserArray = res;
        },
        (error) => {
          console.error(
            "Erreur lors de la récupération de l'utilisateur :",
            error
          );
        }
      );

      localStorage.setItem('elr', JSON.stringify(this.user.role));
      localStorage.setItem('accel', this.user.email);
    } else {
      console.error('Erreur : Utilisateur non trouvé.');
    }
  }

  isFormVisible = false;

  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }
  isFormClientVisible = false;
  toggleFormClient() {
    this.isFormClientVisible = !this.isFormClientVisible;
  }
  isFormRoleVisible = false;
  toggleFormRole() {
    this.isFormRoleVisible = !this.isFormRoleVisible;
  }
  //for accordion
  activeIndex: number | null = 1;
  toggle(index: number) {
    if (this.activeIndex === index) {
      this.activeIndex = null;
    } else {
      this.activeIndex = index;
    }
  }
  // data for all costmers
  getAllUser() {
    this.dashbordservice.getItems().subscribe((data: Item[]) => {
      this.items = data;
    });
  } // data for all costmers
  getWithnullvalues() {
    this.dashbordservice.getWithnullvalues().subscribe((cheques: any) => {
      this.data = cheques;
      console.log(this.data);
    });
  }
  //Méthode pour la selection d'un ligne
  onSelect(cheque: any): void {
    this.selectedCheque = cheque;
  }
  //Chèque mis à jour
  updateCheque(): void {
    const NewCheque = {
      CIN: this.Cin,
      telephone: this.Telephone,
      motif: this.Motif,
    };
    if (this.selectedCheque) {
      this.http
        .put(
          `http://127.0.0.1:8000/api/sc/cheques/${this.selectedCheque.id}`,
          NewCheque
        )
        .subscribe(
          (response: any) => {
            this.toastr.success('Le chèque a été modifié avec succès');
            this.getWithnullvalues();
          },
          (error) => {
            this.toastr.error('Le CIN existe déjà');
          }
        );
    }
  }

  //get data with values null

  onDeleteUser(userId: number) {
    const confirmed = window.confirm(
      'Êtes-vous sûr de vouloir supprimer cet utilisateur ?'
    );

    if (confirmed) {
      this.dashbordservice.DropItems(userId).subscribe({
        next: () => {
          this.items = this.items.filter((Item) => Item.id !== userId);
          this.toastr.success('Utilisateur supprimé avec succès', 'Succès');
        },
        error: (err) => {
          this.toastr.error(
            "Erreur lors de la suppression de l'utilisateur",
            'Erreur'
          );
          console.error(
            "Erreur lors de la suppression de l'utilisateur :",
            err
          );
        },
      });
    }
  }
  //update role by email with admin
  onUpdateRole() {
    if (this.email && this.selectedRole) {
      this.dashbordservice
        .updateRoleByEmail(this.email, this.selectedRole)
        .subscribe({
          next: () => {
            this.toastr.success('Le rôle a été mis à jour avec succès');
          },
          error: (err) => {
            this.toastr.error(
              'Erreur lors de la mise à jour du rôle',
              this.selectedRole
            );
            console.error('Erreur lors de la mise à jour du rôle :', err);
          },
        });
    } else {
      this.toastr.warning('Veuillez remplir tous les champs');
    }
  }
  // cette methode pour ajouter une chéque
  onSubmit() {
    const credentials = {
      NumCHEQUE: this.numCheque,
      montant: this.montant,
      date_reception: this.dateReception,
      ville: this.Ville,
      banque: this.Banque,
    };

    this.chequeService.createCheque(credentials).subscribe(
      (response: any) => {
        if (response) {
          this.toastr.success('Chèque créé avec succès:', 'Succès');
        } else {
          this.toastr.error(`Échec lors de la création du chèque`, 'Erreur');
        }
      },
      (error) => {
        console.log(credentials);
        this.toastr.error('Erreur lors de la création du chèque:', 'Erreur');
      }
    );
  }

  // cette methode pour ajouter une client
  // CreateClient() {
  //   const credentials = {
  //     CNI: this.Cin,
  //     nom: this.Nom,
  //     prenom: this.Prenom,
  //     email: this.email2,
  //     telephone: this.Telephone,
  //     adresse: this.Adresse,
  //     ville: this.Ville2,
  //     NumCHEQUE: this.numCHEQUE,
  //   };

  //   this.clientService.createClient(credentials).subscribe(
  //     (response: any) => {
  //       if (response) {
  //         this.toastr.success('Client créé avec succès:', 'Succès');
  //       } else {
  //         this.toastr.error(`Échec lors de la création du chèque`, 'Erreur');
  //       }
  //     },
  //     (error) => {
  //       console.log(credentials);
  //       this.toastr.error('Erreur lors de la création du chèque:', 'Erreur');
  //     }
  //   );
  // }
  assignColorsBasedOnRole() {
    if (this.Role === 'DFC') {
      this.step1Color = 'bg-green-500';
      this.step2Color = 'bg-blue-700';
      this.step3Color = 'bg-blue-700';
    } else if (this.Role === 'SC') {
      this.step1Color = 'bg-green-700';
      this.step2Color = 'bg-green-500';
      this.step3Color = 'bg-blue-700';
    } else if (this.Role === 'SJN') {
      this.step1Color = 'bg-blue-700';
      this.step2Color = 'bg-blue-700';
      this.step3Color = 'bg-green-500';
    }
  }
}
