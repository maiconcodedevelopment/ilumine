import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModuloModel } from 'src/app/models/modulo.model';
import { TrilhaListModel } from 'src/app/models/trilha-list.model';
import { ModulosService } from 'src/app/services/modulos.service';
import { TrilhasService } from 'src/app/services/trilhas.service';

@Component({
  selector: 'app-trilha-detalhes',
  templateUrl: './trilha-detalhes.component.html',
  styleUrls: ['./trilha-detalhes.component.scss']
})
export class TrilhaDetalhesComponent implements OnInit {

  trilha: TrilhaListModel;
  modulos: ModuloModel[];

  constructor(
    private trilhasService: TrilhasService,
    private activatedRoute: ActivatedRoute,
    private modulosService: ModulosService
  ) { }


  ngOnInit(): void {
    const id = parseInt(this.activatedRoute.snapshot.params.id, 0);
    this.trilhasService.getItem(id).subscribe(response => this.trilha = response);
    this.modulosService.getList(id).subscribe(response => this.modulos = response);
  }

  isModuloEnabled(modulo: ModuloModel): boolean {
    const nextModulo = this.modulos.find(i => i.totalConcluidos !== i.totalConteudos);
    if (!nextModulo) {
      return true;
    } else {
      return modulo.id === nextModulo.id || modulo.totalConcluidos === modulo.totalConteudos;
    }
  }

}
