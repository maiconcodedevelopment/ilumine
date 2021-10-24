import { TrilhasService } from './../../../../services/trilhas.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModuloModel } from 'src/app/models/modulo.model';
import { ModulosService } from 'src/app/services/modulos.service';
import { TrilhaListModel } from 'src/app/models/trilha-list.model';

@Component({
  selector: 'app-trilhas-edit',
  templateUrl: './trilhas-edit.component.html',
})
export class TrilhasEditComponent implements OnInit {

  angForm: FormGroup;
  showloading: boolean;
  errorMessage: string = undefined;
  modulos: ModuloModel[] = [];

  tipos = [{id: 2, nome: 'Jovem'}, {id: 3, nome: 'Educador / Mentor'}];

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private modulosService: ModulosService,
              private trilhasService: TrilhasService) {
    this.angForm = this.fb.group({
      id: ['', [Validators.required] ],
      titulo: ['', [Validators.required] ],
      descricao: [''],
      destinatario: ['', ],
      duracao: ['0'],
      ordem: ['']
    });
  }

  ngOnInit(): void {
    const id = parseInt(this.activatedRoute.snapshot.params.id, 10);
    this.modulosService.getList(id, 100, 0).subscribe(result => this.modulos = result);
    this.trilhasService.getItem(id).subscribe((result: TrilhaListModel) => {
      this.angForm.controls.id.setValue(result.id);
      this.angForm.controls.titulo.setValue(result.titulo);
      this.angForm.controls.descricao.setValue(result.descricao);
      this.angForm.controls.destinatario.setValue(result.destinatario);
      this.angForm.controls.duracao.setValue(result.duracao);
      this.angForm.controls.ordem.setValue(result.ordem);
    });
  }

  Salvar(): void {
    if (this.angForm.valid) {
      this.showloading = !this.showloading;
      this.trilhasService.editItem(this.angForm.value).subscribe(result => {
        this.showloading = !this.showloading;
        if (result == null) {
          this.router.navigate(['/admin/trilhas']);
        }
      }, e => this.showloading = false);
    }
  }
}
