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

  codigo: number | number = 0;
  register: string | string = "0";
  person: string | string = "0";
  name: string | null = null;
  cpf: string | null = null;
  ativeStatus: boolean | boolean = true;

  typeClient: number | number = 0;
  shortName: string | null = null;
  alterName: boolean | boolean = false;
  rg: string | null = null;
  fone: string | null = null;
  cell: string | null = null;

  automaticDescAplic: boolean | boolean = false;

  cep: number | number = 0;
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

  handleEditClient() {
    const editClient = {
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
        descricao: this.description,
        ativo: true,
        endereco: this.adress,
        endereco_numero: this.number,
        endereco_bairro: this.neighborhood,
        endereco_cep: this.cep,
        endereco_municipio_codigo_ibge: this?.ibge,
        principal: false,
        cobranca: false,
        ie_produtor_rural: this.ieProdRural,
      },
    };
    this.authService.editUser(this.codigo, editClient)
    .then(() =>{
      this.router.navigate(['/clients']);
    })
    .catch((error) => {
      console.error('Error', error);
    });
  }

  handleDisableClient() {
    const disableClient = {
      id: this.codigo,
      nome: this.name,
      ativo: false,
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
        descricao: this.description,
        ativo: true,
        endereco: this.adress,
        endereco_numero: this.number,
        endereco_bairro: this.neighborhood,
        endereco_cep: this.cep,
        endereco_municipio_codigo_ibge: this?.ibge,
        principal: false,
        cobranca: false,
        ie_produtor_rural: this.ieProdRural,
      },
    };
    this.authService.editUser(this.codigo, disableClient)
    .then(() =>{
      this.router.navigate(['/clients']);
    })
    .catch((error) => {
      console.error('Error', error);
    });
  }
}
