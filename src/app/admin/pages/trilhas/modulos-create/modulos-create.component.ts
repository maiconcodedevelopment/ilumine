import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModulosService } from 'src/app/services/modulos.service';

@Component({
  selector: 'app-modulos-create',
  templateUrl: './modulos-create.component.html',
})
export class ModulosCreateComponent implements OnInit {

  angForm: FormGroup;
  showloading: boolean;
  errorMessage: string = undefined;

  constructor(private fb: FormBuilder,
              private router: Router,
              private modulosService: ModulosService,
              private activatedRoute: ActivatedRoute) {

    this.angForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)] ],
      texto: [''],
      idTrilha: [null, [Validators.required] ],
      ordem: ['']
    });
  }

  ngOnInit(): void {
    const idTrilha = parseInt(this.activatedRoute.snapshot.params.id, 10);
    this.angForm.controls.idTrilha.setValue(idTrilha);
  }

  Salvar(): void {
    if (this.angForm.valid) {
      this.showloading = true;
      this.modulosService.createItem(this.angForm.value).subscribe(result => {
        this.showloading = false;
        if (result == null) {
          this.router.navigate(['/admin/trilhas', this.angForm.value.idTrilha]);
        }
      }, e => this.showloading = false);
    }
  }
}
