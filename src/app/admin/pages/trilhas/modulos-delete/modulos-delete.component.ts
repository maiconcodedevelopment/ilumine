import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModuloModel } from 'src/app/models/modulo.model';
import { TrilhaListModel } from 'src/app/models/trilha-list.model';
import { ModulosService } from 'src/app/services/modulos.service';
import { TrilhasService } from 'src/app/services/trilhas.service';

@Component({
  selector: 'app-modulos-delete',
  templateUrl: './modulos-delete.component.html',
})
export class ModulosDeleteComponent implements OnInit {

  modulo: ModuloModel;
  trilha: TrilhaListModel;
  showloading: boolean;
  errorMessage: string = undefined;
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private modulosService: ModulosService,
              private trilhasService: TrilhasService) { }

  ngOnInit(): void {
    const idTrilha = parseInt(this.activatedRoute.snapshot.params.id, 10);
    const idModulo = parseInt(this.activatedRoute.snapshot.params.idModulo, 10);
    this.trilhasService.getItem(idTrilha).subscribe((result: TrilhaListModel) => this.trilha = result);
    this.modulosService.getItem(idModulo).subscribe((result: ModuloModel) => this.modulo = result);
  }

  Excluir(): void {
    this.showloading = !this.showloading;
    this.modulosService.deleteItem(this.modulo.id).subscribe(result => {
      this.showloading = !this.showloading;
      if (result == null) {
        this.router.navigate(['/admin/trilhas', this.trilha.id]);
      }
    }, e => this.showloading = false);
  }
}
