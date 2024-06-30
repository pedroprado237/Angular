import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'https://desenvolvimento.maxdata.com.br/api/v1/Auth/login';
  private maxDataUrl = 'https://desenvolvimento.maxdata.com.br/api/v1/cadastro';

  constructor() { }

  login(email: string, senha: string) {
    const loginData = { email, senha };
    return axios.post(this.loginUrl, loginData)
      .then(response => {
        localStorage.setItem('access_token', response?.data?.access_token);
        return response?.data;
      })
      .catch(error => {
        console.error('Login error!', error);
        throw error;
      });
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('No token found in local storage');
    }
    return {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
  }

  register(userData: any) {
    return axios.post(this.maxDataUrl, userData, this.getAuthHeaders())
      .then(response => response?.data)
      .catch(error => {
        console.error('Registration error!', error);
        throw error;
      });
  }

  dataClientAll() {
    return axios.get(this.maxDataUrl, this.getAuthHeaders())
      .then(response => response?.data)
      .catch(error => {
        console.error('Fetch all clients error!', error);
        throw error;
      });
  }

  dataClientUnic(userId: string) {
    return axios.get(`${this.maxDataUrl}/${userId}`, this.getAuthHeaders())
      .then(response => response?.data)
      .catch(error => {
        console.error('Fetch single client error!', error);
        throw error;
      });
  }

  editUser(userId: string, userData: any) {
    return axios.put(`${this.maxDataUrl}/${userId}`, userData, this.getAuthHeaders())
      .then(response => response?.data)
      .catch(error => {
        console.error('Edit error!', error);
        throw error;
      });
  }
}
