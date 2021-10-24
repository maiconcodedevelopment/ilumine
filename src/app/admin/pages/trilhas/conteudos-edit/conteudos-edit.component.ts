import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConteudoModel } from 'src/app/models/conteudo.model';
import { ConteudosService } from 'src/app/services/conteudos.service';

@Component({
  selector: 'app-conteudos-edit',
  templateUrl: './conteudos-edit.component.html',
})
export class ConteudosEditComponent implements OnInit {

  angForm: FormGroup;
  showloading: boolean;
  errorMessage: string = undefined;
  tipos = [{id: 1, nome: 'Texto'}, {id: 2, nome: 'Vídeo'}];
  idTrilha: number;
  idConteudo: number;
  anexos: any[] = [];

  constructor(private fb: FormBuilder,
              private router: Router,
              private conteudosService: ConteudosService,
              private activatedRoute: ActivatedRoute) {

    this.angForm = this.fb.group({
      id: [''],
      titulo: ['', [Validators.required, Validators.minLength(5)] ],
      idModulo: [null, [Validators.required] ],
      tipo: ['', Validators.required],
      ordem: [''],
      texto: [''],
      url: ['']
    });
  }

  ngOnInit(): void {
    this.idTrilha = parseInt(this.activatedRoute.snapshot.params.id, 10);
    this.idConteudo = parseInt(this.activatedRoute.snapshot.params.idConteudo, 10);
    this.conteudosService.getItem(this.idConteudo).subscribe((result: ConteudoModel) => {
      this.angForm.controls.id.setValue(result.id);
      this.angForm.controls.titulo.setValue(result.titulo);
      this.angForm.controls.tipo.setValue(result.tipo),
      this.angForm.controls.texto.setValue(result.texto);
      this.angForm.controls.url.setValue(result.url);
      this.angForm.controls.ordem.setValue(result.ordem);
      this.angForm.controls.idModulo.setValue(result.idModulo);
    });
    this.conteudosService.getAnexos(this.idConteudo).subscribe(result => this.anexos = result);
  }

  Salvar(): void {
    if (this.angForm.valid) {
      this.showloading = true;
      const model = {
        id: this.angForm.value.id,
        idModulo: this.angForm.value.idModulo,
        ordem: this.angForm.value.ordem,
        titulo: this.angForm.value.titulo,
        texto: this.angForm.value.tipo === 1 ? this.angForm.value.texto : '',
        url: this.angForm.value.tipo === 2 ? this.angForm.value.url : '',
        tipo: parseInt(this.angForm.value.tipo, 10)
      };
      this.conteudosService.editItem(model).subscribe(result => {
        this.showloading = false;
        if (result == null) {
          this.router.navigate(['/admin/trilhas', this.idTrilha, 'modulos', this.angForm.value.idModulo]);
        }
      }, e => this.showloading = false);
    }
  }
}
