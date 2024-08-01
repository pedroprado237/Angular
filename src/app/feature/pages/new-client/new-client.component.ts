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
    nome: 'NOME',
    ativo: true,
    fantasia: 'NOME',
    cpf_cnpj: '47329234028',
    rg_ie: '123456',
    tipo_pessoa: 'Fisica',
    tipo_cadastro: 'Cliente',
    cadastro_tipo_id: 2,
    fone: '63984989898',
    chk_alterar_nome: false,
    desconto_auto_aplicar: false,
    cadastro_endereco_padrao: {
      descricao: 'PRINCIPAL',
      ativo: true,
      endereco: 'Quadra ARSE 121 Alameda 8',
      endereco_numero: '34',
      endereco_bairro: 'Plano Diretor Sul',
      endereco_cep: '77019514',
      endereco_municipio_codigo_ibge: 1721000,
      principal: false,
      cobranca: false,
      ie_produtor_rural: '1111',
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
