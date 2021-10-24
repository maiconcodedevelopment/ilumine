import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FaleConoscoService } from 'src/app/services/fale-conosco.service';

@Component({
  selector: 'app-fale-conosco',
  templateUrl: './fale-conosco.component.html',
  styleUrls: ['./fale-conosco.component.scss'],
})
export class FaleConoscoComponent implements OnInit {
  showError: boolean = false;
  showSuccess: boolean = false;

  get nome() {
    return this.contatoForm.get('nome');
  }

  get email() {
    return this.contatoForm.get('email');
  }

  get telefone() {
    return this.contatoForm.get('telefone');
  }

  get assunto() {
    return this.contatoForm.get('assunto');
  }

  get mensagem() {
    return this.contatoForm.get('mensagem');
  }

  contatoForm = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(4)]],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ],
    ],
    telefone: ['', [Validators.required]],
    assunto: ['', [Validators.required, Validators.minLength(4)]],
    mensagem: ['', [Validators.required, Validators.minLength(4)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private faleconosco: FaleConoscoService
  ) {}

  public submit() {
    this.showError = false;
    this.showSuccess = false;

    if (this.contatoForm.valid) {
      const model = {
        nome: this.contatoForm.value.nome,
        email: this.contatoForm.value.email,
        telefone: this.contatoForm.value.telefone,
        assunto: this.contatoForm.value.assunto,
        mensagem: this.contatoForm.value.mensagem,
      };
      this.faleconosco.enviarContato(model).subscribe(() => {
        this.showSuccess = true;
      });
    } else {
      this.showError = true;
      Object.keys(this.contatoForm.controls).forEach(field => {
        const control = this.contatoForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  ngOnInit(): void {}
}
