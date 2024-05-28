import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/AuthService/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  imageUrl: string = 'assets/images/gclogo.png';
  name = '';
  email = '';
  password = '';

  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onRegister() {
    const credentials = {
      name: this.name,
      email: this.email,
      password: this.password,
    };

    this.authService.postRegister(credentials).subscribe(
      (response :any )=>{
        if(response.status === 'success'){
          this.toastr.success('Inscription réussie', 'Succès');
          this.router.navigate(['/login']);
        }else {
          this.toastr.error(`Ce courriel existe déjà`, 'Erreur');
        }
      },
      (error) => {

        this.toastr.error(`Échec de l'enregistrement`, 'Erreur');
      }
    );

  }
}
