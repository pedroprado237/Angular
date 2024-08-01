import { Component } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { Router } from '@angular/router';
interface stringValue {
  value: string;
  viewValue: string;
}

interface booleanValue {
  value: boolean;
  viewValue: string;
}

interface numberValue {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrl: './new-client.component.css',
})
export class NewClientComponent {
  constructor(private authService: AuthService, private router: Router) {}

  adressPrincipal: any;

  register: string | string = '0';
  person: string | string = '0';
  name: string | null = null;
  cpf: string | null = null;
  ativeStatus: boolean | boolean = true;

  typeClient: number | number = 0;
  shortName: string | null = null;
  alterName: boolean | boolean = false;
  rg: string | null = null;
  fone: string | null = null;
  cell: string | null = null;

  automaticDesc: number | null = null;

  cep: number | number = 0;
  stateUF: string | null = null;
  mun: number | null = null;
  adress: string | null = null;
  neighborhood: string | null = null;
  number: string | null = null;
  ieProdRural: string | null = null;
  description: string | null = null;

  typeRegisterNew: stringValue[] = [
    { value: '0', viewValue: 'Selecione' },
    { value: 'Cliente', viewValue: 'Cliente' },
    { value: 'Fornecedor', viewValue: 'Fornecedor' },
    { value: 'ClienteFornecedor', viewValue: 'Cliente / Fornecedor' },
    { value: 'Transportadora', viewValue: 'Transportadora' },
    { value: 'Funcionario', viewValue: 'Funcionario' },
  ];

  typePersonNew: stringValue[] = [
    { value: '0', viewValue: 'Selecione' },
    { value: 'Fisica', viewValue: 'Fisica' },
    { value: 'Juridica', viewValue: 'Juridica' },
  ];

  typeClientNew: numberValue[] = [
    { value: 0, viewValue: 'Selecione' },
    { value: 1, viewValue: 'Contribuinte' },
    { value: 2, viewValue: 'Não Contribuinte' },
    { value: 3, viewValue: 'Produtor Rural' },
  ];

  typeSaleNew: stringValue[] = [
    { value: '0', viewValue: 'Selecione' },
    { value: 'SomenteVenda', viewValue: 'Somente Venda' },
    { value: 'SomenteAtacado', viewValue: 'Somente Atacado' },
    { value: 'VendaAtacado', viewValue: 'Venda ou Atacado' },
  ];

  registerData = {
    nome: this.name,
    ativo: this.ativeStatus,
    fantasia: this.shortName,
    cpf_cnpj: this.cpf,
    rg_ie: this.rg,
    tipo_pessoa: this.person,
    tipo_cadastro: this.register,
    cadastro_tipo_id: this.typeClient,
    fone: this.fone,
    chk_alterar_nome: this.alterName,
    desconto_auto_aplicar: this.automaticDesc !== null ? false : true,
    cadastro_endereco_padrao: {
      descricao: this.description,
      ativo: true,
      // endereco: this.adressPrincipal?.logradouro,
      endereco_numero: this.number,
      // endereco_bairro: this.adressPrincipal?.bairro,
      endereco_cep: this.cep,
      // endereco_municipio_codigo_ibge: this.adressPrincipal?.ibge,
      principal: false,
      cobranca: false,
      ie_produtor_rural: this.ieProdRural,
    },
  };

  selectedTypePersonNew: string | undefined;
  selectedTypeRegisterNew: string | undefined;
  selectedTypeClientNew: number | undefined;
  selectedTypeSaleNew: string | undefined;

  onSelectionChange(
    event: Event,
    field:
      | 'selectedTypePersonNew'
      | 'selectedTypeRegisterNew'
      | 'selectedTypeClientNew'
      | 'selectedTypeSaleNew'
  ) {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;

    if (field === 'selectedTypeClientNew') {
      this[field] = parseInt(value, 10);
    } else {
      this[field] = value;
    }
  }

  handleCEP() {
    this.authService
      .openCEP(this.cep)
      .then((response) => {
        this.adressPrincipal = response;
        this.stateUF = response?.uf;
        this.mun = response?.localidade;
        this.adress = response?.logradouro;
        this.neighborhood = response?.bairro;
      })
      .catch((error) => {
        console.error('Error', error);
      });
  }

  onRegister() {
    this.authService
      .register(this.registerData)
      .then((response) => {
        console.log('Response: ', response);
        this.router.navigate(['/clients']);
        return;
      })
      .catch((error) => {
        console.error('error', error);
        return;
      });
  }
}
