import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/AuthService/auth-service.service';
import { RoleType } from 'src/app/types/interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  imageUrl: string = 'assets/images/gclogo.png';
  Role!: RoleType;
  role: RoleType | undefined;

  Menus: Record<RoleType, { icon: string; title: string; link: string }[]> = {
    admin: [
      {
        icon: 'fa-house',
        title: 'Accueil',
        link: '/sidebar',
      },
      {
        icon: 'fa-id-card',
        title: 'Consultation',
        link: '/sidebar/consulter',
      },
      {
        icon: 'fa-right-from-bracket',
        title: 'Se déconnecter',
        link: '',
      },
    ],
    SC: [
      {
        icon: 'fa-house',
        title: 'Accueil',
        link: '/sidebar',
      },
      {
        icon: 'fa-circle-check',
        title: 'Cheques',
        link: '/sidebar/clients',
      },
      {
        icon: 'fa-cloud-arrow-down',
        title: 'Exportation',
        link: '/sidebar/cheques',
      },
      {
        icon: 'fa-id-card',
        title: 'Consultation',
        link: '/sidebar/consulter',
      },
      {
        icon: 'fa-right-from-bracket',
        title: 'Se déconnecter',
        link: '',
      },
    ],
    DFC: [
      {
        icon: 'fa-house',
        title: 'Accueil',
        link: '/sidebar',
      },
      {
        icon: 'fa-cloud-arrow-down',
        title: 'Exportation',
        link: '/sidebar/cheques',
      },
      {
        icon: 'fa-id-card',
        title: 'Consultation',
        link: '/sidebar/consulter',
      },
      {
        icon: 'fa-right-from-bracket',
        title: 'Se déconnecter',
        link: '',
      },
    ],
    SJN: [
      {
        icon: 'fa-house',
        title: 'Accueil',
        link: '/sidebar',
      },
      {
        icon: 'fa-circle-check',
        title: 'Cheques',
        link: '/sidebar/SJcheques',
      },
      {
        icon: 'fa-cloud-arrow-down',
        title: 'Exportation',
        link: '/sidebar/cheques',
      },
      {
        icon: 'fa-id-card',
        title: 'Consultation',
        link: '/sidebar/consulter',
      },
      {
        icon: 'fa-right-from-bracket',
        title: 'Se déconnecter',
        link: '',
      },
    ],
    SJC: [
      {
        icon: 'fa-house',
        title: 'Accueil',
        link: '/sidebar',
      },
      {
        icon: 'fa-circle-check',
        title: 'Cheques',
        link: '/sidebar/SJCcheques',
      },
      {
        icon: 'fa-cloud-arrow-down',
        title: 'Exportation',
        link: '/sidebar/cheques',
      },
      {
        icon: 'fa-id-card',
        title: 'Consultation',
        link: '/sidebar/consulter',
      },
      {
        icon: 'fa-right-from-bracket',
        title: 'Se déconnecter',
        link: '',
      },
    ],
  };

  getMenusByRole(R: RoleType) {
    const allMenus = this.Menus[R] || [];
    return allMenus;
  }

  constructor(private AuthServ: AuthServiceService) {
    this.geTlocalStorage();
  }
  ngOnInit() {
    this.geTlocalStorage;
  }
  sidebarVisible = true;
  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  logout() {
    this.AuthServ.logout();
  }
  geTlocalStorage() {
    const user = this.AuthServ.getUser();
    this.Role = user.role;
  }
}
