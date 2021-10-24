import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-processo-seletivo',
  templateUrl: './processo-seletivo.component.html',
  styleUrls: ['./processo-seletivo.component.scss']
})
export class ProcessoSeletivoComponent implements OnInit {

  showForm: boolean = true;
  openSelectEscolaridade = false;
  openSelectGenero = false;
  escolaridade: string = '';
  genero: string = '';

  opcoesEscolaridade = [
    'Fundamental Completo',
    'Médio Incompleto',
    'Médio Completo',
    'Superior Incompleto',
    'Superior Completo'
  ];

  opcoesGenero = [
    'Masculino',
    'Feminino',
    'Homem transgênero',
    'Mulher Transgênero',
    'Homem Transexual',
    'Mulher Transexual',
    'Cisgênero',
    'Não sei responder',
    'Prefiro não responder',
    'Outros',
  ];

  processoSeletivoForm: FormGroup
  constructor(private fb: FormBuilder, private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
    this.processoSeletivoForm = this.fb.group({
      email: ['', [Validators.required, Validators.email] ],
      nomeCompleto: ['', Validators.required],
      telefone: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      escolaridade: ['', Validators.required],
      curso: [''],
      genero: ['', Validators.required],
      movimentoSocial: [''],
      movimentoSocialDetalhes:[{value: null, disabled: true}],
      urlRedesSociais1: [''],
      urlRedesSociais2: [''],
      urlRedesSociais3: [''],
      urlRedesSociais4: [''],
      influenciadores: [''],
      influenciadoresDetalhes:[{value: null, disabled: true}],
      radio: [''],
      radioDetalhes:[{value: null, disabled: true}],
      tv: [''],
      tvDetalhes:[{value: null, disabled: true}],
      jornal: [''],
      jornalDetalhes:[{value: null, disabled: true}],
      revistas: [''],
      revistasDetalhes:[{value: null, disabled: true}],
      outros: [''],
      outrosDetalhes:[{value: null, disabled: true}],
      pessoasRedesSociais: [''],
      urlVideo: ['', Validators.required],
      urlCarta: ['', Validators.required],
    })
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  handleClickSelect() {
    this.openSelectEscolaridade = !this.openSelectEscolaridade;
  }

  getSelectedEscolaridade(escolaridade) {
    console.log(escolaridade)
    this.escolaridade = escolaridade;
    this.processoSeletivoForm.patchValue({ 'escolaridade': escolaridade });
  }

  getSelectedGenero(genero) {
    console.log(genero);
    this.genero = genero;
    this.processoSeletivoForm.patchValue({ 'genero': genero });
  }

  goToAnchor(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId)
  }

  sendForm() {
    console.log(this.processoSeletivoForm.value)

  }

  toggleInputDisabled(input) {
   if(this.processoSeletivoForm.get(input).disabled) {
    this.processoSeletivoForm.get(input).enable();
   } else {
    this.processoSeletivoForm.get(input).disable();
   }

  }
}
