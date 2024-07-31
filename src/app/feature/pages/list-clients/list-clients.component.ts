import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth.service';

interface stringValue {
  value: string,
  viewValue: string
}

interface booleanValue {
  value: boolean,
  viewValue: string
}

interface numberValue {
  value: number,
  viewValue: string
}


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

  typePerson : stringValue[] = [
    {value : "0", viewValue:  "Selecione"},
    {value : "Fisica", viewValue : "Fisica"},
    {value : "Juridica", viewValue : "Juridica"}
  ]

  typeVisualization : stringValue[] = [
    {value: "Todos", viewValue : "Todos"},
    {value : "Ativos", viewValue : "Ativos"},
    {value : "Inativos", viewValue : "Inativos"}
  ]

  groupClient : stringValue[] = [
    {value: "Selecione", viewValue : "Selecione"},
    {value : "Farmacias", viewValue : "Farmacias"},
    {value : "Supermecados", viewValue : "Supermecados"},
    {value : "Autopecas", viewValue : "Autopeças"},
    {value : "Restaurantes", viewValue : "Restaurantes"},
    {value : "PostoGasolina", viewValue : "Posto de Gasolina"},


  ]

  selectedTypePerson: string | undefined;
  selectedTypeVisualization: string | undefined;
  selectedGroupClient: string | undefined;


  onSelectedTypePerson(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedTypePerson = selectElement.value;
  }

  onSelectedTypeVisualization(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedTypeVisualization = selectElement.value;
  }

  onSelectedGroupClient(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedGroupClient = selectElement.value;
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

  handleEditClient(id: number) {
    this.authService.dataClientUnic(id)
      .then(response => {
        this.router.navigate(['/editClient/'], { state: { clientData: response } });
      })
      .catch(error => {
        console.error('Error', error);
      });
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
