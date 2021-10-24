import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { TIPO_GENERO, TIPO_ESCOLARIDADE } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-educadores-create',
  templateUrl: './educadores-create.component.html',
})
export class EducadoresCreateComponent implements OnInit {


  angForm: FormGroup;
  showloading: boolean = false;
  errorMessage: string = undefined;
  generos: Array<string> = Object.keys(TIPO_GENERO).filter(key => isNaN(+key));
  escolaridades: Array<string> = Object.keys(TIPO_ESCOLARIDADE).filter(key => isNaN(+key));

  constructor(private fb: FormBuilder,
              private router: Router,
              private usersService: UsersService,
              ) {

    this.angForm = this.fb.group({
      tipo: [3, [Validators.required] ],
      nome: ['', [Validators.required, Validators.minLength(10)] ],
      email: ['', [ Validators.required, Validators.email]],
      cpf: ['', [Validators.required] ],
      rg: ['',  [Validators.required]],
      whatsapp: ['',  [Validators.required]],
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

  ngOnInit(): void {}

  removeEmptyValues(obj: {}) {
    const objValues = Object.values(obj)
    const objKeys = Object.keys(obj)

    const finalObj = objValues.reduce((acc: {}, current, idx) => {
      if(!!current) {
        return {
          [objKeys[idx]]: current,
          ...acc,
        }
      }
      return acc
    }, {})
    return finalObj;
  }

  Salvar(): void {
    if (this.angForm.valid) {
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

      if(this.angForm.value.uf !== '') {
        let ufUppercase = this.angForm.value.uf.toUpperCase();
        this.angForm.patchValue({'uf': ufUppercase});
      }


      const body = this.removeEmptyValues(this.angForm.value);

      this.showloading = true
        this.usersService.createUser(body).subscribe(result => {
          this.showloading = false
          if(result == null) {
            this.router.navigate(['/admin/mentorados']);
          }
        }, e => this.showloading = false);
    } else {
      Object.keys(this.angForm.controls).forEach(field => {
        const control = this.angForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }


}
