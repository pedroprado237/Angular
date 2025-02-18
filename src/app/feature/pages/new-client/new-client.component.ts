import { Component } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { Router } from '@angular/router';
interface stringValue {
  value: string;
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

  showAlert: boolean = false;
  alertMessage: string = '';
  alertStyle: string = '';

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

  displayAlert(alertStyle: string, alertMessage: string) {
    this.alertStyle = alertStyle;
    this.showAlert = true;
    this.alertMessage = alertMessage;
    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
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
        this.displayAlert('alert-danger', 'Falha ao buscar CEP.');
        console.error('Erro ao buscar CEP.', error);
      });
  }

  checkRequiredFields() {
    if (
      !this.name ||
      !this.cpf ||
      !this.cep ||
      !this.neighborhood ||
      !this.number
    ) {
      this.displayAlert(
        'alert-warning',
        'Campos obrigatórios não preenchidos!'
      );
      return false;
    }
    return true;
  }

  handleNewClient() {
    if (!this.checkRequiredFields()) {
      return;
    }
    const fieldsRoute = {
      nome: null,
      fantasia: null,
      tipo_pessoa: null,
      tipo_cadastro: null,
      cadastro_grupo_id: null,
      cadastro_tipo_id: null,
      cadastro_profissao_id: null,
      cpf_cnpj: null,
      rg_ie: null,
      rg_ie_uf: null,
      ie_diferido: null,
      dt_nascimento: null,
      vlr_limite_credito: null,
      obs_venda: null,
      fone: null,
      fax: null,
      celular: null,
      site: null,
      email: null,
      sexo: null,
      estado_civil: null,
      naturalidade_cidade: null,
      naturalidade_uf: null,
      nome_pai: null,
      nome_mae: null,
      qtd_dependentes: null,
      dados_prof_nome_empresa: null,
      dados_prof_cnpj: null,
      dados_prof_fone: null,
      dados_prof_data_admissao: null,
      dados_prof_ocupacao: null,
      dados_prof_cargo: null,
      dados_prof_vlr_renda_mensal: null,
      dados_prof_vlr_outras_rendas: null,
      dados_prof_endereco: null,
      dados_prof_endereco_numero: null,
      dados_prof_endereco_bairro: null,
      dados_prof_endereco_cep: null,
      dados_prof_endereco_municipio_codigo_ibge: null,
      dados_banc_num_banco: null,
      dados_banc_nome_banco: null,
      dados_banc_agencia: null,
      dados_banc_num_conta: null,
      dados_banc_tipo_conta: null,
      dados_banc_data_conta: null,
      dados_banc_fone_ag: null,
      dados_banc_obs: null,
      obs_geral: null,
      tipo_regime_apuracao: null,
      nome_conjuge: null,
      inscricao_municipal: null,
      dt_casamento: null,
      id_print_wayy: null,
      emp_id: 1,
      chk_emp_disponivel: true,
      chk_alterar_nome: false,
      desconto_auto_aplicar: false,
      desconto_auto_aliq: null,
      obs_nfe: null,
      consumidor_final: false,
      tipo_preco_venda: null,
      cadastro_empresa_id: null,
      cadastro_empresa_guid: null,
      ativo: null,
      dt_ultima_alteracao: null,
      usuario_ultima_alteracao_id: null,
      usuario_ultima_alteracao_nome: null,
      dt_inclusao: null,
      usuario_inclusao_id: null,
      guid: null,
    };
    const standardAddress = {
      descricao: null,
      ativo: true,
      endereco: null,
      endereco_numero: null,
      endereco_bairro: null,
      endereco_cep: null,
      endereco_municipio_codigo_ibge: null,
      principal: false,
      cobranca: false,
      ie_produtor_rural: null,
    };

    const registerData = {
      ...fieldsRoute,
      nome: this.name,
      ativo: Boolean(this.ativeStatus),
      fantasia: this.shortName,
      cpf_cnpj: this.cpf,
      rg_ie: this.rg,
      tipo_pessoa: this.person,
      tipo_cadastro: this.register,
      cadastro_tipo_id: Number(this.typeClient),
      fone: this.fone,
      chk_alterar_nome: Boolean(this.alterName),
      desconto_auto_aplicar: this.automaticDescAplic,
      cadastro_endereco_padrao: {
        ...standardAddress,
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
      .register(registerData)
      .then(() => {
        this.displayAlert('alert-success', 'Cliente adicionado com sucesso!');
        setTimeout(() => {
          this.router.navigate(['/clients']);
        }, 3000);
      })
      .catch((error) => {
        this.displayAlert('alert-danger', 'Falha ao adicionar cliente.');
        console.error('Erro ao editar cliente:', error);
      });
  }
}
