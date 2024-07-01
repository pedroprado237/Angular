import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.css']
})
export class ListClientsComponent implements OnInit {
  errorMessage: string = '';
  dataClients: any = '';
  dataPagination: any = '';
  pagination: number = 1
  paginationTotal: number = 1

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loadDataClients();
  }

  loadDataClients() {
    this.authService.dataClientAll()
      .then(response => {
        this.dataClients = response?.itens
        this.dataPagination = response?.paginacao;
        this.paginationTotal = Math.ceil(response?.paginacao?.total_registros/20)
      })
      .catch(error => {
        console.error('Error loading clients', error);
        this.errorMessage = 'Failed to load clients: ' + error.message;
      });
  }

  handleEditClient(){
    this.router.navigate(['/editClient'])
  }

  handlePaginationPrev(){
    this.pagination--
  }

  handlePaginationNext(){
    this.pagination++
  }

  handleSearch() {
    this.loadDataClients()
    console.log('Search button clicked');
  }
}
