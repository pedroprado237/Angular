import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.css',
})
export class EditClientComponent {

  tipoCliente = {
    "Contribuinte":"Contribuinte",
    "NaoContribuinte":"Não Contribuinte",
    "ProdutorRural":"Produtor Rural"
  }

  tipoVenda = {
    "Venda":"Somente Venda",
    "Atacado":"Somente Atacado",
    "VendaAtacado":"Venda ou Atacado"
  }

  tipoConta = {
    "Corrente":"Corrente",
    "Poupanca":"Poupança",
    "Salario":"Salário"

  }

  sexos = {
    "Masculino":"Masculino",
    "Feminino":"Feminino",
    "Outro":"Outro",
  }

  estadoCivil = {
    "Casado":"Casado(a)",
    "Solteiro":"Solteiro(a)",
    "Divorciado":"Divorciado(a)",
    "Separado":"Separado(a)",
    "Viuvo":"Viuvo(a)",
    "Outro":"Outro(a)",
  }

  estadosBrasil = {
    "AC": "Acre",
    "AL": "Alagoas",
    "AP": "Amapá",
    "AM": "Amazonas",
    "BA": "Bahia",
    "CE": "Ceará",
    "DF": "Distrito Federal",
    "ES": "Espírito Santo",
    "GO": "Goiás",
    "MA": "Maranhão",
    "MT": "Mato Grosso",
    "MS": "Mato Grosso do Sul",
    "MG": "Minas Gerais",
    "PA": "Pará",
    "PB": "Paraíba",
    "PR": "Paraná",
    "PE": "Pernambuco",
    "PI": "Piauí",
    "RJ": "Rio de Janeiro",
    "RN": "Rio Grande do Norte",
    "RS": "Rio Grande do Sul",
    "RO": "Rondônia",
    "RR": "Roraima",
    "SC": "Santa Catarina",
    "SP": "São Paulo",
    "SE": "Sergipe",
    "TO": "Tocantins"
  };

  selectedTipoCliente: string | undefined;
  selectedTipoVenda: string | undefined;
  selectedTipoConta:string | undefined;
  selectedSexo: string | undefined
  selectedEstadoCivil: string | undefined
  selectedEstado: string | undefined;


  onSelectTipoCliente(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedTipoCliente = selectElement.value;
  }
  
  onSelectTipoVenda(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedTipoVenda = selectElement.value;
  }

  onSelectTipoConta(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedTipoConta = selectElement.value;
  }

  onSelectSexo(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedSexo = selectElement.value;
  }

  onSelectEstadoCivil(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedEstadoCivil = selectElement.value;
  }

  onSelectEstado(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedEstado = selectElement.value;
  }

  constructor(private authService: AuthService, private router: Router) { }



}
