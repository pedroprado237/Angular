import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  showAlert: boolean = false;
  loadingLogin: boolean = false;
  alertMessage: string = '';
  alertStyle: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  displayAlert(alertStyle: string, alertMessage: string) {
    this.alertStyle = alertStyle;
    this.showAlert = true;
    this.alertMessage = alertMessage;
    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }

  onLogin() {
    this.loadingLogin = true;
    if (!this.email || !this.password) {
      this.loadingLogin = false;
      this.displayAlert('alert-danger', 'Usuário ou senha inválidos.');
      return;
    }
    this.authService
      .login(this.email, this.password)
      .then((response) => {
        response ?? localStorage.setItem('access_token', response?.data.access_token);
          this.router.navigate(['/clients']);
      })
      .catch((error) => {
        this.displayAlert('alert-danger', 'Falha ao realizar o Login.');
        console.error('Erro ao realizar o Login.', error);
      })
      .finally(() => {
        this.loadingLogin = false;
        console.log('Operação de login finalizada.');
      });
  }
}
