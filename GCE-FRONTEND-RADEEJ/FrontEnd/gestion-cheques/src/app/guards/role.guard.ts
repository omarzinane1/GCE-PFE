// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { AuthServiceService } from '../services/AuthService/auth-service.service';

// @Injectable({
//     providedIn: 'root',
// })
// export class AuthGuard implements CanActivate {
//     constructor(private authService: AuthServiceService, private router: Router) {}

//     canActivate(): boolean {
//         if (this.authService.isAuthenticated()) {  // Vérifier l'authentification
//             return true;
//         } else {
//             this.router.navigate(['/login']);  // Rediriger vers le login
//             return false;
//         }
//     }
// }
