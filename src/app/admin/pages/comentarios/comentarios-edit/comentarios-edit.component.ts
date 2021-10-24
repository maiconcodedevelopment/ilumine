import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ComentariosService } from 'src/app/services/comentarios.service';
import { ComentarioAdminItemModel } from '../models/comentario-admin-item.model';

@Component({
  selector: 'app-comentarios-edit',
  templateUrl: './comentarios-edit.component.html',
})
export class ComentariosEditComponent implements OnInit {

  angForm: FormGroup;
  showloading: boolean = false;
  errorMessage: string = undefined;

  breadcrumb: string;
  textoOriginal: string;

  constructor(private fb: FormBuilder,
              private router: Router,
              private comentariosService: ComentariosService,
              private activatedRoute: ActivatedRoute,
              ) {
    this.angForm = this.fb.group({
      idConteudo: [{value: ''}, [Validators.required] ],
      idComentario: ['', [Validators.required] ],
      texto: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = parseInt(this.activatedRoute.snapshot.params.id, 10);
    this.comentariosService.getItemAdmin(id).subscribe((result: ComentarioAdminItemModel) => {
      this.angForm.controls.idConteudo.setValue(result.idConteudo);
      this.angForm.controls.idComentario.setValue(result.id);
      this.textoOriginal = result.texto;
      this.breadcrumb = result.breadcrumb;
    });
  }

  Salvar(): void {
    if (this.angForm.valid) {
      this.comentariosService.responderComentario(this.angForm.value).subscribe(result => {
        this.showloading = !this.showloading;
        if (result == null) {
          this.router.navigate(['/admin/comentarios']);
        }
      }, e => this.showloading = false);
    }
  }

}
