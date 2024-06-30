import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  senha: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    if (!this.email || !this.senha) {
      this.errorMessage = 'Please enter both email and password.';
      return;
    }
    this.authService.login(this.email, this.senha)

      .then( response => {
        response ?? localStorage.setItem('access_token', response?.data?.access_token)
        console.log("Return Login: ", response.data)
        this.router.navigate(['/clients']);
        return
      })
      .catch(error => {
        console.error('Login error', error);
        this.errorMessage = 'Login failed: ' + error;
        return
      });
  }
}