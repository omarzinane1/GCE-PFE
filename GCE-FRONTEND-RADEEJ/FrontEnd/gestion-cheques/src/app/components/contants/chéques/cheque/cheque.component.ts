import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { DashboardService } from 'src/app/services/ServiceDashboard/dashboard.service';
import { ChequeService } from 'src/app/services/servicecheque/cheque.service';

@Component({
  selector: 'app-cheque',
  templateUrl: './cheque.component.html',
  styleUrls: ['./cheque.component.css'],
})
export class ChequeComponent implements OnInit {
  numCheque: string = '';
  montant?: string;
  dateReception: string = '';
  clientId: string = '';
  ItemsArray: any[] = [];
  Role: any = '';
  isFormVisible = false;
  ChequesArray: any[] = [];
  data: any[] = [];
  //SC
  dateReception1: string = '';
  dateReception2: string = '';
  statusFilter: string = 'impaye';
  //SJN
  dateReception1sjn: string = '';
  dateReception2sjn: string = '';
  statusFiltersjn: string = 'impaye';
  //SJC
  dateReception1sjc: string = '';
  dateReception2sjc: string = '';
  statusFiltersjc: string = 'impaye';

  anything:string = ''
  searchTerm$ = new Subject<string>();

  constructor(
    private chequeService: ChequeService,
    private toastr: ToastrService,
    private DashbordServ: DashboardService
  ) {}

  ngOnInit(): void {
    this.getChequesArray();
    this.geTlocalStorage();
  }

  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }

  service: string = 'SC';

  //get Data for CHeques
  getChequesArray() {
    this.chequeService.getCheques().subscribe((res: any) => {
      this.ChequesArray = res;
      this.ChequesArray.splice(res, 1);
    });
  }
  //get users data
  getUsers() {
    this.DashbordServ.getItems().subscribe((res: any) => {
      this.ItemsArray = res;
    });
  }
  //get role in localStorage
  geTlocalStorage() {
    const roleFromStorage = localStorage.getItem('elr');
    if (roleFromStorage) {
      this.Role = JSON.parse(roleFromStorage);
    }
  }
  // update cheque methode

  updateCheque(id: any) {
    let cheque = {
      NumCHEQUE: this.numCheque,
      montant: this.montant,
      date_reception: this.dateReception,
      CNI: this.clientId,
    };
    this.chequeService.updateCheque(id, cheque).subscribe(
      (updatedUser) => {
        this.chequeArray = this.chequeArray.filter(
          (cheque) => cheque.CNI !== this.clientId
        );
        this.toastr.success('Chèque modifier avec succès:', 'Succès');
      },
      (error) => {
        this.toastr.error(`Échec lors de la modification du chèque`, 'Erreur');
      }
    );
  }
  isFormVisibleUpdate: boolean = false;
  toggleFormUpdate() {
    this.isFormVisibleUpdate = !this.isFormVisibleUpdate;
  }

  obj: any = {};
  getElementObj(id: any): any {
    this.chequeService.getCheques().subscribe((res: any) => {
      this.chequeArray = res;
      this.chequeArray.map((element) => {
        if (element.id == id) this.obj = element;
      });
    });
  }
  chequeArray: any[] = [];
  getElement(id: any): any {
    this.chequeService.getCheques().subscribe((res: any) => {
      this.chequeArray = res;
      this.chequeArray.map((element) => {
        if (element.id == id) return element;
      });
    });
  }
  //End update cheque methode

  //delete cheque
  deleteCheque(id: any, index: any) {
    this.chequeService.DropCheque(id).subscribe(
      (res) => {
        this.ChequesArray.splice(index, 1);
        this.toastr.success('Suppression terminée avec succès.', 'Succès');
      },
      (error) => {
        console.error('Erreur lors de la suppression du chèque:', error);
        this.toastr.error('Erreur lors de la suppression du chèque.', 'Erreur');
      }
    );
  }
  //end delete cheque
  // the methode for generate PDF
  logoBase64: string = 'assets/images/radeejicon.png';

  generateRandomDate(start: Date, end: Date): Date {
    const startMillis = start.getTime();
    const endMillis = end.getTime();
    const randomMillis =
      Math.floor(Math.random() * (endMillis - startMillis)) + startMillis;
    return new Date(randomMillis);
  }

  generatePDF(cheque: any) {
    // const doc = new jsPDF({
    //   orientation: 'portrait',
    //   unit: 'mm',
    //   format: 'a4',
    // });
    // const margin = 10;
    // const startX = margin;
    // const startY = margin;
    // const pageWidth = doc.internal.pageSize.getWidth();
    // const pageHeight = doc.internal.pageSize.getHeight();
    // //le logo en haut à gauche
    // const logoSize = { width: 40, height: 30 };
    // doc.addImage(
    //   this.logoBase64,
    //   'PNG',
    //   startX,
    //   startY,
    //   logoSize.width,
    //   logoSize.height
    // );
    // //un titre centré en haut du PDF
    // const title = 'Formulaire de Suivi le cheque';
    // doc.setFontSize(18);
    // const titleX = pageWidth / 2 - doc.getTextWidth(title) / 2;
    // doc.text(title, titleX, startY + logoSize.height + 10); // Centrer le titre sous le logo
    // doc.line(
    //   margin,
    //   startY + logoSize.height + 15,
    //   pageWidth - margin,
    //   startY + logoSize.height + 15
    // );
    // // Section Information du Chèque
    // const section1Y = startY + logoSize.height + 30;
    // doc.text('Information du Chèque', startX, section1Y);
    // const chequeDetails = [
    //   { label: 'N° Cheque', value: cheque.NumCHEQUE },
    //   { label: 'Montant', value: cheque.montant.toString() + 'DH' },
    //   { label: 'Date de Réception', value: cheque.date_reception },
    // ];
    // chequeDetails.forEach((detail, index) => {
    //   const yPos = section1Y + 10 + index * 10;
    //   doc.text(`${detail.label}: ${detail.value}`, startX, yPos);
    // });
    // //Section Information du Bénéficiaire
    // const section2Y = section1Y + 45;
    // doc.text('Information du Bénéficiaire', startX, section2Y);
    // const beneficiaryDetails = [
    //   { label: 'Nom Complet', value: '______' },
    //   { label: 'N° Cheque', value: cheque.NumCHEQUE },
    //   { label: 'N° CNI', value: cheque.CNI },
    // ];
    // beneficiaryDetails.forEach((detail, index) => {
    //   const yPos = section2Y + 10 + index * 10;
    //   doc.text(`${detail.label}: ${detail.value}`, startX, yPos);
    // });
    // // Section Statut
    // const section3Y = section2Y + 40;
    // doc.text('Statut', startX, section3Y);
    // const statusOptions = [
    //   'En cours de traitement dans le service DFC',
    //   `L'état du chèque est : ${cheque.statut}`,
    // ];
    // statusOptions.forEach((option, index) => {
    //   const yPos = section3Y + 10 + index * 10;
    //   doc.text(`[ ] ${option}`, startX, yPos); //Case à cocher
    // });
    // // Section Commentaires
    // const section4Y = section3Y + 35;
    // doc.text('Commentaires', startX, section4Y);
    // doc.text(
    //   'Nous vous rappelons de venir payer votre chèque à notre bureau,',
    //   startX,
    //   section4Y + 10
    // );
    // doc.text('à la date indiquée ci-dessous.', startX, section4Y + 20);
    // doc.text(
    //   'Veuillez apporter les documents nécessaires pour le paiement.',
    //   startX,
    //   section4Y + 30
    // );
    // doc.text('Merci pour votre coopération.', startX, section4Y + 40);
    // // Générer une date aléatoire en bas à droite
    // const startDate = new Date(2024, 4, 29);
    // const endDate = new Date(2024, 11, 31);
    // const randomDate = this.generateRandomDate(
    //   startDate,
    //   endDate
    // ).toLocaleDateString();
    // const dateX = pageWidth - margin;
    // const dateY = pageHeight - 20;
    // doc.text(`Date : ${randomDate}`, dateX, dateY, { align: 'right' });
    // // Enregistrement du PDF avec un nom unique
    // const filename = `formulaire_suivi_cheque.pdf`;
    // doc.save(filename);
  }

  exportChequesTOExcel(){
    const statut = this.statusFilter;
    const dateReception1 = this.dateReception1;
    const dateReception2 = this.dateReception2;
    this.chequeService.exportCheques(statut, dateReception1, dateReception2);
  }

  // generatePDF(cheques: any[]) {
  //   const doc = new jsPDF({
  //     orientation: 'landscape', // Vous pouvez utiliser 'portrait' ou 'landscape'
  //     unit: 'mm',
  //     format: 'a4',
  //   });

  //   const margin = 10;
  //   const startX = margin;
  //   const startY = 20; // Position de départ pour le contenu
  //   const lineHeight = 10;

  //   // En-têtes de la table
  //   const headers = [
  //     'N° Cheque',
  //     'Montant',
  //     'Date Reception',
  //     'Statut',
  //     'Ville',
  //     'Banque',
  //     'Order',
  //     'Date Validation',
  //   ];

  //   // Ajouter les en-têtes au PDF
  //   headers.forEach((header, index) => {
  //     doc.text(header, startX + (index * 25), startY);
  //   });

  //   // Dessiner une ligne sous les en-têtes
  //   doc.line(startX, startY + lineHeight, 290 - margin, startY + lineHeight);

  //   // Ajouter les données des chèques
  //   cheques.forEach((row, rowIndex) => {
  //     row.forEach((value: { toString: () => string | string[]; }, colIndex: number) => {
  //       const xPosition = startX + (colIndex * 25);
  //       const yPosition = startY + (lineHeight * (rowIndex + 1));

  //       doc.text(value.toString(), xPosition, yPosition + lineHeight);
  //     });
  //   });

  //   // Enregistrer le PDF
  //   doc.save('cheques.pdf');
  // }

  downloadPdf() {
    const statut = this.statusFilter;
    const dateReception1 = this.dateReception1;
    const dateReception2 = this.dateReception2;

    this.chequeService
      .downloadPdf(statut, dateReception1, dateReception2)
      .subscribe(
        (pdfBlob) => {
          const blob = new Blob([pdfBlob], { type: "application/pdf" });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "cheques.pdf";
          a.click();
          window.URL.revokeObjectURL(url);
        },
        (error) => {
          console.error("Erreur lors du téléchargement du PDF:", error);
        }
      );
  }


  getFilteredData() {
    const statut = this.statusFilter;
    const dateReception1 = this.dateReception1;
    const dateReception2 = this.dateReception2;

    this.chequeService
      .getFilteredData(statut, dateReception1, dateReception2)
      .subscribe(
        (res) => {
          this.data = res;
        },
        (error) => {
          console.error("Erreur lors de la récupération des données filtrées:", error);
        }
      );
  }


}
