import { ModuloModel } from 'src/app/models/modulo.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModulosService } from 'src/app/services/modulos.service';
import { ConteudoModel } from 'src/app/models/conteudo.model';
import { ConteudosService } from 'src/app/services/conteudos.service';

@Component({
  selector: 'app-modulos-edit',
  templateUrl: './modulos-edit.component.html',
})
export class ModulosEditComponent implements OnInit {
  angForm: FormGroup;
  showloading: boolean;
  errorMessage: string = undefined;
  conteudos: ConteudoModel[] = [];

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private modulosService: ModulosService,
              private conteudosService: ConteudosService) {
    this.angForm = this.fb.group({
      id: ['', [Validators.required] ],
      titulo: ['', [Validators.required] ],
      texto: [''],
      ordem: [''],
      idTrilha: [null, [Validators.required] ],
    });
  }

  ngOnInit(): void {
    const idModulo = parseInt(this.activatedRoute.snapshot.params.idModulo, 10);
    this.modulosService.getItem(idModulo).subscribe((result: ModuloModel) => {
      this.angForm.controls.id.setValue(result.id);
      this.angForm.controls.titulo.setValue(result.titulo);
      this.angForm.controls.texto.setValue(result.texto);
      this.angForm.controls.ordem.setValue(result.ordem);
      this.angForm.controls.idTrilha.setValue(result.idTrilha);
    });
    this.conteudosService.getList(idModulo, 100, 0).subscribe(result => this.conteudos = result);
  }

  Salvar(): void {
    if (this.angForm.valid) {
      this.showloading = !this.showloading;
      this.modulosService.editItem(this.angForm.value).subscribe(result => {
        this.showloading = !this.showloading;
        if (result == null) {
          this.router.navigate(['/admin/trilhas', this.angForm.value.idTrilha]);
        }
      }, e => this.showloading = false);
    }
  }
}
