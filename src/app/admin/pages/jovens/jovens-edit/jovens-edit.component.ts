import { UsersService } from 'src/app/services/users.service';
import { TIPO_ESCOLARIDADE, TIPO_GENERO, UserProfile } from './../../../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-jovens-edit',
  templateUrl: './jovens-edit.component.html',
})
export class JovensEditComponent implements OnInit {

  angForm: FormGroup;
  showloading: boolean = false;
  errorMessage: string = undefined;
  generos: Array<string> = Object.keys(TIPO_GENERO).filter(key => isNaN(+key));
  escolaridades: Array<string> = Object.keys(TIPO_ESCOLARIDADE).filter(key => isNaN(+key));

  constructor(private fb: FormBuilder,
              private router: Router,
              private usersService: UsersService,
              private activatedRoute: ActivatedRoute,
              ) {

    this.angForm = this.fb.group({
      id: [{value: '', disabled: true}, [Validators.required] ],
      nome: ['', [Validators.required, Validators.minLength(10)] ],
      email: ['', [ Validators.required, Validators.email]],
      cpf: ['', [Validators.required] ],
      rg: ['',  [Validators.required]],
      whatsApp: ['',  [Validators.required]],
      dataNascimento: [''],
      genero: [null],
      cidade: [''],
      uf: ['', [Validators.minLength(2), Validators.maxLength(2)] ],
      escolaridade: [null],
      instituicao: [''],
      instagram: [''],
      facebook: [''],
      twitter: [''],
      linkedin: [''],
      foto: [''],
    });
  }

  ngOnInit(): void {
    const id = parseInt(this.activatedRoute.snapshot.params.id, 10);
    this.usersService.getById(id).subscribe((result: UserProfile) => {

      this.angForm.controls.id.setValue(result.id);
      this.angForm.controls.nome.setValue(result.nome);
      this.angForm.controls.email.setValue(result.email);
      this.angForm.controls.cpf.setValue(result.cpf);
      this.angForm.controls.rg.setValue(result.rg);
      this.angForm.controls.whatsApp.setValue(result.whatsApp);
      if (result.dataNascimento) {
        this.angForm.controls.dataNascimento.setValue(result.dataNascimento.substring(0, result.dataNascimento.indexOf('T')));
      }
      this.angForm.controls.genero.setValue(result.genero);
      this.angForm.controls.cidade.setValue(result.cidade);
      this.angForm.controls.uf.setValue(result.uf);
      this.angForm.controls.escolaridade.setValue(result.escolaridade);
      this.angForm.controls.instituicao.setValue(result.instituicao);
      this.angForm.controls.twitter.setValue(result.twitter);
      this.angForm.controls.instagram.setValue(result.instagram);
      this.angForm.controls.facebook.setValue(result.facebook);
      this.angForm.controls.linkedin.setValue(result.linkedin);
      this.angForm.controls.foto.setValue(result.foto);
    });
  }

  convertDate(date) {
    if(date) {
      return moment(date).format('DD/MM/yyyy');
    } else {
      return ''
    }
  }

  Salvar(): void {
    if (this.angForm.valid) {
      this.showloading = !this.showloading

      if(this.angForm.value.genero !== null) {
        let generoId : number = + this.angForm.value.genero;
        this.angForm.patchValue({'genero': generoId});
      }

      if(this.angForm.value.escolaridade !== null) {
        let escolaridadeId : number = + this.angForm.value.escolaridade;
        this.angForm.patchValue({'escolaridade': escolaridadeId});
      }

      if(this.angForm.value.dataNascimento !== '') {
        let convertedDate = moment(this.angForm.value.dataNascimento).utc().format();
        this.angForm.patchValue({'dataNascimento': convertedDate});
      }

      if(this.angForm.value.uf !== null && this.angForm.value.uf !== '') {
        let ufUppercase = this.angForm.value.uf.toUpperCase();
        this.angForm.patchValue({'uf': ufUppercase});
      }

        this.usersService.editUser(this.angForm.value).subscribe(result => {
          this.showloading = !this.showloading
          if(result == null) {
            this.router.navigate(['/admin/mentorados']);
          }
        }, e => this.showloading = false);
    }
  }

}
