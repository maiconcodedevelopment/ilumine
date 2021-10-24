import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepoimentoModel } from 'src/app/models/depoimento.model';
import { DepoimentosService } from 'src/app/services/depoimentos.service';

@Component({
  selector: 'app-depoimentos-edit',
  templateUrl: './depoimentos-edit.component.html'
})
export class DepoimentosEditComponent implements OnInit {

  angForm: FormGroup;
  showloading: boolean;
  errorMessage: string = undefined;

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private depoimentosService: DepoimentosService) {
    this.angForm = this.fb.group({
      id: ['', [Validators.required] ],
      nome: ['', [Validators.required] ],
      resenha: ['', [Validators.required] ],
      citacao: ['', [Validators.required ]],
      prioridade: [0,],
    });
  }

  ngOnInit(): void {
    const id = parseInt(this.activatedRoute.snapshot.params.id, 10);
    this.depoimentosService.getItem(id).subscribe((result: DepoimentoModel) => {
      this.angForm.controls.id.setValue(result.id);
      this.angForm.controls.nome.setValue(result.nome);
      this.angForm.controls.resenha.setValue(result.resenha);
      this.angForm.controls.citacao.setValue(result.citacao);
      this.angForm.controls.prioridade.setValue(result.prioridade);
    });
    this
  }

  togglePrioridade(e): void {
    e.target.checked ? this.angForm.patchValue({prioridade: 1}) : this.angForm.patchValue({prioridade: 0})
  }

  Salvar(): void {
    if (this.angForm.valid) {
      this.showloading = !this.showloading
        this.depoimentosService.editItem(this.angForm.value).subscribe(result => {
          this.showloading = !this.showloading
          if(result == null) {
            this.router.navigate(['/admin/depoimentos']);
          }
        }, e => this.showloading = false);
    }
  }

}
