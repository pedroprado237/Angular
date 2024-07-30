import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.css']
})
export class ListClientsComponent implements OnInit {
  dataClients: any = '';
  dataPagination: any = '';
  pagination: number = 1
  paginationTotal: number = 1

  typePerson = {
    "Fisica":"Fisica",
    "Juridica":"Juridica"
  }

  typeVisualization = {
    "Todos":"Todos",
    "Ativos":"Ativos",
    "Inativos":"Inativos"
  }

  selectedTypePerson: string | undefined;
  selectedTypeVisualization: string | undefined;

  onSelectedTypePerson(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedTypePerson = selectElement.value;
  }

  onSelectedTypeVisualization(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedTypeVisualization = selectElement.value;
  }

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
      });
  }

  handleNewClient(){
    this.router.navigate(['/newClient'])
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
