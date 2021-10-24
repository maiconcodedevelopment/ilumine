import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserProfile, TIPO_GENERO, TIPO_ESCOLARIDADE } from 'src/app/models/user.model';
import { ComentariosService } from 'src/app/services/comentarios.service';
import { UsersService } from 'src/app/services/users.service';
import { ComentarioAdminItemModel } from '../models/comentario-admin-item.model';

@Component({
  selector: 'app-comentarios-delete',
  templateUrl: './comentarios-delete.component.html',
})
export class ComentariosDeleteComponent implements OnInit {

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
      breadcrumb: [''],
      data: [''],
    });
  }

  ngOnInit(): void {
    const id = parseInt(this.activatedRoute.snapshot.params.id, 10);
    this.comentariosService.getItemAdmin(id).subscribe((result: ComentarioAdminItemModel) => {
      this.angForm.controls.idConteudo.setValue(result.idConteudo);
      this.angForm.controls.idComentario.setValue(result.id);
      this.angForm.controls.data.setValue(result.data);
      this.angForm.controls.texto.setValue(result.texto);
      this.angForm.controls.breadcrumb.setValue(result.breadcrumb);
    });
  }

  Excluir(): void {
    this.showloading = !this.showloading;

    this.comentariosService.delete(this.angForm.value.idComentario).subscribe(result => {
      this.showloading = !this.showloading;
      if (result == null) {
        this.router.navigate(['/admin/comentarios']);
      } else {
        this.errorMessage = result.error;
      }
    });
  }

}
