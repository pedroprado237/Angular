import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth.service';

interface StringValue {
  value: string;
  viewValue: string;
}

interface BooleanValue {
  value: boolean;
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

  codigo: number | null = null;
  register: string | null = null;
  person: string | null = null;
  name: string | null = null;
  cpf: string | null = null;
  ativeStatus: boolean | null = null;
  typeClient: number | null = null;
  date: string | null = null;
  shortName: string | null = null;
  alterName: boolean | null = null;
  rg: string | null = null;
  fone: string | null = null;
  cell: string | null = null;
  typeSale: string | null = null;
  automaticDesc: number | null = null;
  disponibleCed: number | null = null;
  cep: string | null = null;
  stateUF: string | null = null;
  mun: number | null = null;
  adress: string | null = null;
  neighborhood: string | null = null;
  number: string | null = null;
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

  typeSaleEdit: StringValue[] = [
    { value: '0', viewValue: 'Selecione' },
    { value: 'SomenteVenda', viewValue: 'Somente Venda' },
    { value: 'SomenteAtacado', viewValue: 'Somente Atacado' },
    { value: 'VendaAtacado', viewValue: 'Venda ou Atacado' },
  ];

  selectedTypePersonEdit: string | undefined;
  selectedTypeRegisterEdit: string | undefined;
  selectedTypeClientEdit: number | undefined;
  selectedTypeSaleEdit: string | undefined;

  constructor(private authService: AuthService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.clientData = navigation.extras.state;
    }
  }

  ngOnInit(): void {
    if (this.clientData) {
      console.log('Data: ', this.clientData);

      this.codigo = this.clientData?.clientData?.id;
      this.register = this.clientData?.clientData?.tipo_cadastro;
      this.person = this.clientData?.clientData?.tipo_pessoa;
      this.name = this.clientData?.clientData?.nome;
      this.cpf = this.clientData?.clientData?.cpf_cnpj;
      this.ativeStatus = this.clientData?.clientData?.ativo;
      this.typeClient = this.clientData?.clientData?.cadastro_tipo_id;
      this.date = this.clientData?.clientData?.dt_nascimento;
      this.shortName = this.clientData?.clientData?.fantasia;
      this.alterName = this.clientData?.clientData?.chk_alterar_nome;
      this.rg = this.clientData?.clientData?.rg_ie;
      this.fone = this.clientData?.clientData?.fone;
      this.cell = this.clientData?.clientData?.celular;
      this.typeSale = this.clientData?.clientData?.tipo_preco_venda;
      this.automaticDesc = this.clientData?.clientData?.desconto_auto_aliq;
      this.disponibleCed = this.clientData?.clientData?.vlr_limite_credito;

      this.cep =
        this.clientData?.clientData?.cadastro_endereco_padrao?.endereco_cep;
      this.stateUF =
        this.clientData?.clientData?.cadastro_endereco_padrao?.endereco_uf_codigo;
      this.mun =
        this.clientData?.clientData?.cadastro_endereco_padrao?.endereco_municipio_codigo_pais;
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
      | 'selectedTypeSaleEdit'
  ) {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;

    if (field === 'selectedTypeClientEdit') {
      this[field] = parseInt(value, 10) as any;
    } else {
      this[field] = value as any;
    }
  }
}
