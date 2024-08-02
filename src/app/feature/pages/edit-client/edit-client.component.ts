import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth.service';
import { response } from 'express';

interface StringValue {
  value: string;
  viewValue: string;
}

interface NumberValue {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css'],
})
export class EditClientComponent implements OnInit {
  clientData: any;
  fieldsRoute: any;
  fieldsAddress: any;

  showAlert: boolean = false;
  alertMessage: string = '';
  alertStyle: string = '';

  // Inputs front
  codigo: number = 0;
  register: string = '0';
  person: string = '0';
  name: string | null = null;
  cpf: string | null = null;
  ativeStatus: boolean = true;

  typeClient: number = 0;
  shortName: string | null = null;
  alterName: boolean = false;
  rg: string | null = null;
  fone: string | null = null;
  cell: string | null = null;

  automaticDescAplic: boolean = false;

  cep: string | string = '';
  stateUF: string | null = null;
  mun: string | null = null;
  adress: string | null = null;
  neighborhood: string | null = null;
  number: string | null = null;
  ibge: number | null = null;
  ieProdRural: string | null = null;
  description: string | null = null;

  typeRegisterEdit: StringValue[] = [
    { value: '0', viewValue: 'Selecione' },
    { value: 'Cliente', viewValue: 'Cliente' },
    { value: 'Fornecedor', viewValue: 'Fornecedor' },
    { value: 'ClienteFornecedor', viewValue: 'Cliente / Fornecedor' },
    { value: 'Transportadora', viewValue: 'Transportadora' },
    { value: 'Funcionario', viewValue: 'Funcionario' },
  ];

  typePersonEdit: StringValue[] = [
    { value: '0', viewValue: 'Selecione' },
    { value: 'Fisica', viewValue: 'Fisica' },
    { value: 'Juridica', viewValue: 'Juridica' },
  ];

  typeClientEdit: NumberValue[] = [
    { value: 0, viewValue: 'Selecione' },
    { value: 1, viewValue: 'Contribuinte' },
    { value: 2, viewValue: 'Não Contribuinte' },
    { value: 3, viewValue: 'Produtor Rural' },
  ];

  selectedTypePersonEdit: string | undefined;
  selectedTypeRegisterEdit: string | undefined;
  selectedTypeClientEdit: number | undefined;

  constructor(private authService: AuthService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.clientData = navigation.extras.state;
    }
  }

  ngOnInit(): void {
    if (this.clientData) {
      this.fieldsRoute = this.clientData?.clientData;
      this.fieldsAddress =
        this.clientData?.clientData?.cadastro_endereco_padrao;

      this.codigo = this.clientData?.clientData?.id;
      this.register = this.clientData?.clientData?.tipo_cadastro;
      this.person = this.clientData?.clientData?.tipo_pessoa;
      this.name = this.clientData?.clientData?.nome;
      this.cpf = this.clientData?.clientData?.cpf_cnpj;
      this.ativeStatus = this.clientData?.clientData?.ativo;

      this.typeClient = this.clientData?.clientData?.cadastro_tipo_id;
      this.shortName = this.clientData?.clientData?.fantasia;
      this.alterName = this.clientData?.clientData?.chk_alterar_nome;
      this.rg = this.clientData?.clientData?.rg_ie;
      this.fone = this.clientData?.clientData?.fone;
      this.cell = this.clientData?.clientData?.celular;
      this.automaticDescAplic =
        this.clientData?.clientData?.desconto_auto_aplicar;

      this.cep =
        this.clientData?.clientData?.cadastro_endereco_padrao?.endereco_cep;
      this.stateUF =
        this.clientData?.clientData?.cadastro_endereco_padrao?.endereco_uf_sigla;
      this.mun =
        this.clientData?.clientData?.cadastro_endereco_padrao?.endereco_municipio_descricao;
      this.ibge =
        this.clientData?.clientData?.cadastro_endereco_padrao?.endereco_municipio_codigo_ibge;
      this.adress =
        this.clientData?.clientData?.cadastro_endereco_padrao?.endereco;
      this.neighborhood =
        this.clientData?.clientData?.cadastro_endereco_padrao?.endereco_bairro;
      this.number =
        this.clientData?.clientData?.cadastro_endereco_padrao?.endereco_numero;
      this.ieProdRural =
        this.clientData?.clientData?.cadastro_endereco_padrao?.ie_produtor_rural;
      this.description =
        this.clientData?.clientData?.cadastro_endereco_padrao?.descricao;
    }
  }

  onSelectionChange(
    event: Event,
    field:
      | 'selectedTypePersonEdit'
      | 'selectedTypeRegisterEdit'
      | 'selectedTypeClientEdit'
  ) {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;

    if (field === 'selectedTypeClientEdit') {
      this[field] = parseInt(value, 10) as any;
    } else {
      this[field] = value as any;
    }
  }

  handleCEP() {
    this.authService
      .openCEP(this.cep)
      .then((response) => {
        this.stateUF = response?.uf;
        this.mun = response?.localidade;
        this.adress = response?.logradouro;
        this.ibge = response?.ibge;
        this.neighborhood = response?.bairro;
      })
      .catch((error) => {
        console.error('Error', error);
      });
  }

  displayAlert(alertStyle: string, alertMessage: string) {
    this.alertStyle = alertStyle;
    this.showAlert = true;
    this.alertMessage = alertMessage;
    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }

  handleEditClient() {
    if (
      !this.name ||
      !this.cpf ||
      !this.cep ||
      !this.neighborhood ||
      !this.number
    ) {
      this.displayAlert(
        'alert-warning',
        'Campos obrigatórios devem ser preechidos!'
      );
      return;
    }

    const oldFields = this.fieldsRoute;
    const oldAdress = this.fieldsAddress;
    const editClient = {
      ...oldFields,
      id: this.codigo,
      nome: this.name,
      ativo: Boolean(this.ativeStatus),
      fantasia: this.shortName,
      cpf_cnpj: this.cpf,
      rg_ie: this.rg,
      tipo_pessoa: this.person,
      tipo_cadastro: this.register,
      cadastro_tipo_id: this.typeClient,
      fone: this.fone,
      chk_alterar_nome: Boolean(this.alterName),
      desconto_auto_aplicar: this.automaticDescAplic,
      cadastro_endereco_padrao: {
        ...oldAdress,
        descricao: this.description,
        endereco: this.adress,
        endereco_numero: this.number,
        endereco_bairro: this.neighborhood,
        endereco_cep: this.cep,
        endereco_municipio_codigo_ibge: this?.ibge,
        ie_produtor_rural: this.ieProdRural,
      },
    };
    this.authService
      .editUser(this.codigo, editClient)
      .then(() => {
        this.displayAlert('alert-success', 'Cliente editado com sucesso!');
      })
      .catch((error) => {
        this.displayAlert(
          'alert-danger',
          'Falha ao editar cliente. Tente novamente.'
        );
        console.error('Erro ao editar cliente:', error);
      });
  }

  handleDisableClient() {
    if (
      !this.name ||
      !this.cpf ||
      !this.cep ||
      !this.neighborhood ||
      !this.number
    ) {
      this.displayAlert(
        'alert-warning',
        'Campos obrigatórios devem ser preechidos!'
      );
      return;
    }
    const oldFields = this.fieldsRoute;
    const disableClient = {
      ...oldFields,
      ativo: false,
    };
    this.authService
      .editUser(this.codigo, disableClient)
      .then(() => {
        this.displayAlert('alert-success', 'Cliente editado com sucesso!');
      })
      .catch((error) => {
        this.displayAlert(
          'alert-danger',
          'Falha ao editar cliente. Tente novamente.'
        );
        setTimeout(() => {
          this.router.navigate(['/clients']);
        }, 3000);
        console.error('Erro ao editar cliente:', error);
      });
  }
}
