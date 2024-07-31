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

  codigo: number | undefined;
  register: string | undefined;
  person: string | undefined;
  name: string | undefined;
  cpf: string | undefined;
  ativeStatus: boolean | undefined;
  typeClient: number | undefined;
  date: string | undefined;
  shortName: string | undefined;
  alterName: boolean | undefined;
  rg: string | undefined;
  fone: string | undefined;
  cell: string | undefined;
  typeSale: string | undefined;
  automaticDesc: number | undefined;
  disponibleCed: number | undefined;
  cep: string | undefined;
  stateUF: number | undefined;
  mun: number | undefined;
  adress: string | undefined;
  neighborhood: string | undefined;
  number: string | undefined;
  ieProdRural: string | undefined;
  description: string | undefined;

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
      console.log("Data: ", this.clientData)

      this.codigo = this.clientData?.clientData?.id ?? "Não informado";
      this.register = this.clientData?.clientData?.tipo_cadastro ?? "Não informado";
      this.person = this.clientData?.clientData?.tipo_pessoa ?? "Não informado";
      this.name = this.clientData?.clientData?.nome ?? "Não informado";
      this.cpf = this.clientData?.clientData?.cpf_cnpj ?? "Não informado";
      this.ativeStatus = this.clientData?.clientData?.ativo ?? "Não informado";
      this.typeClient = this.clientData?.clientData?.cadastro_tipo_id ?? "Não informado";
      this.date = this.clientData?.clientData?.dt_nascimento ?? "Não informado";
      this.shortName = this.clientData?.clientData?.fantasia ?? "Não informado";
      this.alterName = this.clientData?.clientData?.chk_alterar_nome ?? "Não informado";
      this.rg = this.clientData?.clientData?.rg_ie ?? "Não informado";
      this.fone = this.clientData?.clientData?.fone ?? "Não informado";
      this.cell = this.clientData?.clientData?.celular ?? "Não informado";
      this.typeSale = this.clientData?.clientData?.tipo_cadastro ?? "Não informado";
      this.automaticDesc = this.clientData?.clientData?.desconto_auto_aliq ?? "Não informado";
      this.disponibleCed = this.clientData?.clientData?.vlr_limite_credito ?? "Não informado";

      this.cep = this.clientData?.clientData?.cadastro_endereco_padrao?.endereco_cep ?? "Não informado";
      this.stateUF = this.clientData?.clientData?.cadastro_endereco_padrao?.endereco_uf_codigo ?? "Não informado";
      this.mun = this.clientData?.clientData?.cadastro_endereco_padrao?.endereco_municipio_codigo_pais ?? "Não informado";
      this.adress = this.clientData?.clientData?.cadastro_endereco_padrao?.endereco ?? "Não informado";
      this.neighborhood = this.clientData?.clientData?.cadastro_endereco_padrao?.endereco_bairro ?? "Não informado";
      this.number = this.clientData?.clientData?.cadastro_endereco_padrao?.endereco_numero ?? "Não informado";
      this.ieProdRural = this.clientData?.clientData?.cadastro_endereco_padrao?.ie_produtor_rural ?? "Não informado";
      this.description = this.clientData?.clientData?.cadastro_endereco_padrao?.descricao ?? "Não informado";
    }
  }

  onSelectionChange(
    event: Event,
    field: 'selectedTypePersonEdit' | 'selectedTypeRegisterEdit' | 'selectedTypeClientEdit' | 'selectedTypeSaleEdit'
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
