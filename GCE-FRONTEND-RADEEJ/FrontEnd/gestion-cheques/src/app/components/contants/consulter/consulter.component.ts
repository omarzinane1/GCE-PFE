import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/AuthService/auth-service.service';
import { ConsulterService } from 'src/app/services/ServiceConsulter/consulter.service';

@Component({
  selector: 'app-consulter',
  templateUrl: './consulter.component.html',
  styleUrls: ['./consulter.component.css'],
})
export class ConsulterComponent implements OnInit {
  Role: any = '';
  searchParams = {
    numero_cheque: '',
    montant: '',
    date_reception: '',
    CIN: '',
    telephone: '',
    ville: '',
    banque: '',
    motif: '',
    statut: '',
  };

  cheques: any[] = [];

  constructor(
    private Service: ConsulterService,
    private AuthServ: AuthServiceService
  ) {}

  ngOnInit(): void {}

  onSearch(): void {
    this.Service.search(this.searchParams).subscribe((result) => {
      this.cheques = result;
      this.calculerStatistiques(this.cheques);
    });
  }
  geTlocalStorage() {
    const user = this.AuthServ.getUser();
    this.Role = user.role;
  }
  activeIndex: number | null = null;

  toggleAccordion(index: number) {
    if (this.activeIndex === index) {
      this.activeIndex = null;
    } else {
      this.activeIndex = index;
    }
  }

  activeIndex2: number | null = null;
  toggleAccordion2(index: number) {
    if (this.activeIndex2 === index) {
      this.activeIndex2 = null;
    } else {
      this.activeIndex2 = index;
    }
  }

  statistiques = {
    chequesImpayes: 0,
    chequesPayes: 0,
    lignesObtenues: 0,
    montantMax: 0,
    montantMin: 0
  };
  // Méthode pour calculer les statistiques
  calculerStatistiques(cheques: any[]): void {
    this.statistiques.chequesImpayes = cheques.filter(c => c.statut === 'impaye').length;
    this.statistiques.chequesPayes = cheques.filter(c => c.statut === 'paye').length;
    this.statistiques.lignesObtenues = cheques.length;

    if (cheques.length > 0) {
      const montants = cheques.map(c => c.montant);
      this.statistiques.montantMax = Math.max(...montants);
      this.statistiques.montantMin = Math.min(...montants);
    } else {
      this.statistiques.montantMax = 0;
      this.statistiques.montantMin = 0;
    }
  }

}
