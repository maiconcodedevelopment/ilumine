import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConteudosService } from 'src/app/services/conteudos.service';

@Component({
  selector: 'app-conteudos-create',
  templateUrl: './conteudos-create.component.html',
})
export class ConteudosCreateComponent implements OnInit {

  angForm: FormGroup;
  showloading: boolean;
  errorMessage: string = undefined;
  tipos = [{id: 1, nome: 'Texto'}, {id: 2, nome: 'Vídeo'}];
  idTrilha: number;

  constructor(private fb: FormBuilder,
              private router: Router,
              private conteudosService: ConteudosService,
              private activatedRoute: ActivatedRoute) {

    this.angForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)] ],
      idModulo: [null, [Validators.required] ],
      tipo: ['2', Validators.required],
      ordem: [''],
      texto: [''],
      url: ['']
    });
  }

  ngOnInit(): void {
    const idModulo = parseInt(this.activatedRoute.snapshot.params.idModulo, 10);
    this.idTrilha = parseInt(this.activatedRoute.snapshot.params.id, 10);
    this.angForm.controls.idModulo.setValue(idModulo);
  }

  Salvar(): void {
    if (this.angForm.valid) {
      this.showloading = true;
      const model = {
        idModulo: this.angForm.value.idModulo,
        ordem: this.angForm.value.ordem,
        titulo: this.angForm.value.titulo,
        texto: this.angForm.value.tipo === '1' ? this.angForm.value.texto : '',
        url: this.angForm.value.tipo === '2' ? this.angForm.value.url : '',
        tipo: parseInt(this.angForm.value.tipo, 10)
      };
      this.conteudosService.createItem(model).subscribe(result => {
        this.showloading = false;
        if (result == null) {
          this.router.navigate(['/admin/trilhas', this.idTrilha, 'modulos', this.angForm.value.idModulo]);
        }
      }, e => this.showloading = false);
    }
  }
}
