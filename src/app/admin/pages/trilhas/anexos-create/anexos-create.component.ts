import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConteudosService } from 'src/app/services/conteudos.service';

@Component({
  selector: 'app-anexos-create',
  templateUrl: './anexos-create.component.html',
})
export class AnexosCreateComponent implements OnInit {

  angForm: FormGroup;
  showloading: boolean;
  errorMessage: string = undefined;
  idConteudo: number;
  idTrilha: number;
  idModulo: number;
  anexo: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private conteudosService: ConteudosService,
              private activatedRoute: ActivatedRoute) {

    this.angForm = this.fb.group({
      nome: ['', [Validators.required] ],
      idConteudo: [null, [Validators.required] ]
    });
  }

  ngOnInit(): void {
    this.idConteudo = parseInt(this.activatedRoute.snapshot.params.idConteudo, 10);
    this.idTrilha = parseInt(this.activatedRoute.snapshot.params.id, 10);
    this.idModulo = parseInt(this.activatedRoute.snapshot.params.idModulo, 10);
    this.angForm.controls.idConteudo.setValue(this.idConteudo);
  }

  Salvar(): void {
    if (this.angForm.valid) {
      this.showloading = true;
      this.conteudosService.createAnexo(this.idConteudo, this.angForm.value, this.anexo).subscribe(result => {
        this.showloading = false;
        if (result == null) {
          this.router.navigate(['/admin/trilhas', this.idTrilha, 'modulos', this.idModulo, 'conteudos', this.idConteudo]);
        }
      }, e => this.showloading = false);
    }
  }
}
