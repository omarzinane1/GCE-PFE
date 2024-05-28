import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/AuthService/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  imageUrl: string = 'assets/images/gce1.png';
  email = '';
  password = '';
  errorMessage = '';
  userRole = '';

  constructor(
    private AuthServ: AuthServiceService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onSubmit() {
    const credentials = {
      email: this.email,
      password: this.password,
    };

    this.AuthServ.PostLogin(credentials).subscribe(
      (response: any) => {
        if (
          response.status === 'success' &&
          response.user &&
          response.authorization
        ) {
          this.AuthServ.setUser(response.user);
          if(response.user.role != "user"){
            this.router.navigate(['/sidebar']);
            this.AuthServ.showSuccess();
          }else{
            this.router.navigate(['Permission']);
          }

        } else {
          this.AuthServ.showError();
        }
      },
      (error) => {
        this.toastr.error('Erreur lors de la connexion', 'Erreur');
      }
    );
  }
}
