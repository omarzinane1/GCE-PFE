import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/AuthService/auth-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  email: string ='';
  forgotForm: FormGroup;
  emailError: boolean = true;

  constructor(
    private authService: AuthServiceService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {

    this.authService.forgotPassword(this.email).subscribe(
      response => {
        this.toastr.success('Un email de réinitialisation de mot de passe a été envoyé.', 'Mot de passe oublié');
        this.forgotForm.reset();
      },
      error => {
        this.toastr.error("Une erreur s'est produite lors de la tentative de connexion", 'Error');
      }
    );
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }
}
