import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConteudosService } from 'src/app/services/conteudos.service';

@Component({
  selector: 'app-anexos-delete',
  templateUrl: './anexos-delete.component.html',
})
export class AnexosDeleteComponent implements OnInit {
  showloading: boolean;
  errorMessage: string = undefined;
  idAnexo: number;
  idConteudo: number;
  idTrilha: number;
  idModulo: number;
  anexo: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private conteudosService: ConteudosService,
              private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.idConteudo = parseInt(this.activatedRoute.snapshot.params.idConteudo, 10);
    this.idTrilha = parseInt(this.activatedRoute.snapshot.params.id, 10);
    this.idModulo = parseInt(this.activatedRoute.snapshot.params.idModulo, 10);
    this.idAnexo = parseInt(this.activatedRoute.snapshot.params.idAnexo, 10);
    this.conteudosService.getAnexo(this.idAnexo).subscribe(result => this.anexo = result);
  }

  Excluir(): void {
    this.showloading = true;
    this.conteudosService.deleteAnexo(this.idAnexo).subscribe(result => {
      this.showloading = false;
      if (result == null) {
        this.router.navigate(['/admin/trilhas', this.idTrilha, 'modulos', this.idModulo, 'conteudos', this.idConteudo]);
      }
    }, e => this.showloading = false);
  }
}
