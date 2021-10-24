import { TrilhasService } from './../../../../services/trilhas.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trilhas-create',
  templateUrl: './trilhas-create.component.html',
})
export class TrilhasCreateComponent implements OnInit {

  angForm: FormGroup;
  showloading: boolean;
  errorMessage: string = undefined;

  tipos = [{id: 2, nome: 'Jovem'}, {id: 3, nome: 'Educador / Mentor'}];

  constructor(private fb: FormBuilder,
              private router: Router,
              private trilhasService: TrilhasService) {

    this.angForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)] ],
      descricao: [''],
      destinatario: [''],
      ordem: [''],
      duracao: ['']
    });
  }

  ngOnInit(): void {
  }

  Salvar(): void {
    if (this.angForm.valid) {
      this.showloading = true;
      this.trilhasService.createItem(this.angForm.value).subscribe(result => {
        this.showloading = false;
        if (result == null) {
          this.router.navigate(['/admin/trilhas']);
        }
      }, e => this.showloading = false);
    }
  }
}
