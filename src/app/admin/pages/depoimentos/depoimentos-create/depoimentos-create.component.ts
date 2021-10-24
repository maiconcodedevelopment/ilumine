import { DepoimentosService } from './../../../../services/depoimentos.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-depoimentos-create',
  templateUrl: './depoimentos-create.component.html'
})
export class DepoimentosCreateComponent implements OnInit {

  angForm: FormGroup;
  showloading: boolean;
  errorMessage: string = undefined;

  constructor(private fb: FormBuilder,
              private router: Router,
              private depoimentosService: DepoimentosService) {

    this.angForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(50)] ],
      resenha: ['', [ Validators.required, Validators.maxLength(100)]],
      citacao: ['', [Validators.required, Validators.minLength(30)] ],
      prioridade: [0],
    });
  }

  ngOnInit(): void {
  }

  Salvar(): void {
    if (this.angForm.valid) {
      this.showloading = true
        this.depoimentosService.createItem(this.angForm.value).subscribe(result => {
          this.showloading = false
          if(result == null) {
            this.router.navigate(['/admin/depoimentos']);
          }
        }, e => this.showloading = false);
    }
  }

  togglePrioridade(e) : void {
    e.target.checked ? this.angForm.patchValue({prioridade: 1}) : this.angForm.patchValue({prioridade: 0})
  }
}
