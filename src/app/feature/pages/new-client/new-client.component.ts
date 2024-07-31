import { Component } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrl: './new-client.component.css'
})
export class NewClientComponent {

  constructor(private authService: AuthService, private router: Router) { }

  typeRegisterNew = {
    "0": "Selecione",
    "Cliente": "Cliente",
    "Fornecedor": "Fornecedor",
    "ClienteFornecedor": "Cliente / Fornecedor",
    "Transportadora": "Transportadora",
    "Funcionario": "Funcionario"
  }

  typePersonNew = {
    "0": "Selecione",
    "Fisica": "Fisica",
    "Juridica": "Juridica"
  }

  typeClientNew = {
    "0": "Selecione",
    1: "Contribuinte",
    2: "Não Contribuinte",
    3: "Produtor Rural",
  }

  typeSaleNew = {
    "0": "Selecione",
    "SomenteVenda": "Somente Venda",
    "SomenteAtacado": "Somente Atacado",
    "VendaAtacado": "Venda ou Atacado"
  }

  typeAccountNew = {
    "Corrente": "Corrente",
    "Poupança": "Poupança",
    "Salario": "Salario",
  }

  registerData = {
    "nome": "NOME",
    "ativo": true,
    "fantasia": "NOME",
    "cpf_cnpj": "47329234028",
    "rg_ie": "123456",
    "tipo_pessoa": "Fisica",
    "tipo_cadastro": "Cliente",
    "cadastro_tipo_id": 2,
    "fone": "63984989898",
    "chk_alterar_nome": false,
    "desconto_auto_aplicar": false,
    "cadastro_endereco_padrao": {
      "descricao": "PRINCIPAL",
      "ativo": true,
      "endereco": "Quadra ARSE 121 Alameda 8",
      "endereco_numero": "34",
      "endereco_bairro": "Plano Diretor Sul",
      "endereco_cep": "77019514",
      "endereco_municipio_codigo_ibge": 1721000,
      "principal": false,
      "cobranca": false,
      "ie_produtor_rural": "1111"
    }
  }

  selectedTypePersonNew: string | undefined;
  selectedTypeRegisterNew: string | undefined;
  selectedTypeClientNew: number | undefined;
  selectedTypeSaleNew: string | undefined;
  selectedTypeAccountNew: string | undefined;

  onSelectionChange(event: Event, field: 'selectedTypePersonNew' | 'selectedTypeRegisterNew' | 'selectedTypeClientNew' | 'selectedTypeSaleNew' | 'selectedTypeAccountNew') {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;

    if (field === 'selectedTypeClientNew') {
      this[field] = parseInt(value, 10);
    } else {
      this[field] = value;
    }
  }

  onRegister() {
    this.authService.register(this.registerData)
      .then( response => {
        console.log("Response: ", response)
        this.router.navigate(['/clients']);
        return
      })
      .catch(error => {
        console.error('error', error);
        return
      });
  }

}
