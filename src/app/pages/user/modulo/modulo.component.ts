import { ModuloModel } from './../../../models/modulo.model';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ModulosService } from 'src/app/services/modulos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConteudoModel } from 'src/app/models/conteudo.model';
import { ConteudosService } from 'src/app/services/conteudos.service';
import { ComentarioModel } from 'src/app/models/comentario.model';
import { ComentariosService } from 'src/app/services/comentarios.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modulo',
  templateUrl: './modulo.component.html',
  styleUrls: ['./modulo.component.scss']
})
export class ModuloComponent implements OnInit {
  isFinished = false;
  currentStep: number;
  comentariosOpen: boolean;
  anexosOpen: boolean;
  modulo: ModuloModel;
  conteudos: ConteudoModel[];
  comentarios: ComentarioModel[];
  novoComentario = '';

  constructor(
    private modulosService: ModulosService,
    private activatedRoute: ActivatedRoute,
    private conteudosService: ConteudosService,
    private comentariosService: ComentariosService,
    private change: ChangeDetectorRef,
    private toastr: ToastrService,
    private router: Router
  ) { }


  ngOnInit(): void {
    const id = parseInt(this.activatedRoute.snapshot.params.id, 0);
    this.modulosService.getItem(id).subscribe( response => this.modulo = response);
    this.conteudosService.getList(id).subscribe(response => {
      this.conteudos = response;
      if (this.activatedRoute.snapshot.params.idConteudo) {
        const idConteudo = parseInt(this.activatedRoute.snapshot.params.idConteudo, 0);
        const index = this.conteudos.findIndex(i => i.id === idConteudo);
        this.currentStep = index;
      } else {
        const index = this.conteudos.findIndex(i => !i.concluido);
        this.currentStep = index !== -1 ? index : 0;
      }
      this.comentariosOpen = false;
      this.comentarios = undefined;
    });
  }

  navigateConteudo(conteudo: ConteudoModel): void {
    if (conteudo.concluido || this.nextIndexAvailable(conteudo)) {
      const index = this.conteudos.findIndex(i => i.id === conteudo.id);
      this.currentStep = index;
    }
  }

  nextStep(): void {
    const idConteudo = this.conteudos[this.currentStep].id;
    this.conteudosService.assistirConteudo(idConteudo).subscribe(() => {
      this.conteudos[this.currentStep].concluido = true;
      this.comentariosOpen = false;
      this.anexosOpen = false;
      this.comentarios = undefined;
      this.novoComentario = '';
      if (this.currentStep < this.conteudos.length - 1) {
        this.currentStep++;
        this.change.detectChanges();
      } else {
        this.router.navigate(['/user/trilha', this.modulo.idTrilha]);
      }
    });
  }

  nextIndexAvailable(conteudo): boolean {
    const nextConteudo = this.conteudos.find(i => !i.concluido);
    return conteudo.id === nextConteudo.id;
  }

  enviarComentario(): void {
    if (this.novoComentario === '') {
      this.toastr.error('Digite o comentário desejado.');
    } else {
      const model = {
        idConteudo: this.conteudos[this.currentStep].id,
        texto: this.novoComentario
      };
      this.comentariosService.newItem(model).subscribe(() => {
        this.toastr.success('Comentário publicado com sucesso');
        this.novoComentario = '';
        this.conteudos[this.currentStep].qtdComentarios ++;
        this.loadComentarios(true);
      });
    }
  }

  loadComentarios(force = false): void {
    if (this.conteudos[this.currentStep].qtdComentarios > 0) {
      this.comentariosOpen = force ? true : !this.comentariosOpen;
      if ((this.comentariosOpen && !this.comentarios) || force) {
        this.comentariosService.getList(this.conteudos[this.currentStep].id).subscribe(result => this.comentarios = result);
      }
    }
  }
}
