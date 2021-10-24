import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConteudoModel } from 'src/app/models/conteudo.model';
import { ConteudosService } from 'src/app/services/conteudos.service';

@Component({
  selector: 'app-conteudos-delete',
  templateUrl: './conteudos-delete.component.html',
})
export class ConteudosDeleteComponent implements OnInit {

  angForm: FormGroup;
  showloading: boolean;
  errorMessage: string = undefined;
  tipos = [{id: 1, nome: 'Texto'}, {id: 2, nome: 'Vídeo'}];
  idTrilha: number;
  idModulo: number;
  conteudo: ConteudoModel;

  constructor(private router: Router,
              private conteudosService: ConteudosService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const idConteudo = parseInt(this.activatedRoute.snapshot.params.idConteudo, 10);
    this.idModulo = parseInt(this.activatedRoute.snapshot.params.idModulo, 10);
    this.idTrilha = parseInt(this.activatedRoute.snapshot.params.id, 10);
    this.conteudosService.getItem(idConteudo).subscribe(result => this.conteudo = result);
  }

  Excluir(): void {
    this.showloading = !this.showloading;
    this.conteudosService.deleteItem(this.conteudo.id).subscribe(result => {
      this.showloading = !this.showloading;
      if (result == null) {
        this.router.navigate(['/admin/trilhas', this.idTrilha, 'modulos', this.idModulo]);
      }
    }, e => this.showloading = false);
  }
}
