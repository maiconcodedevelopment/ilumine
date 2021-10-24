import { UserProfile } from '../../../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { ComentarioAdminListModel } from '../models/comentario-admin-list.model';
import { ComentariosService } from 'src/app/services/comentarios.service';

@Component({
  selector: 'app-comentarios-list',
  templateUrl: './comentarios-list.component.html',
})
export class ComentariosListComponent implements OnInit {

  data: ComentarioAdminListModel[] = [];
  itemsPerPage = 20;
  offset = 0;
  search = '';

  constructor(private comentariosService: ComentariosService) { }

  ngOnInit(): void {
    this.loadItens();
  }

  loadMore(): void {
    if (this.data.length % this.itemsPerPage === 0) {
      this.offset += this.itemsPerPage;
      this.loadItens();
    }
  }

  loadItens(): void {
    this.comentariosService.getListAdmin(this.itemsPerPage, this.offset).subscribe((result: ComentarioAdminListModel[]) => this.data = this.data.concat(result));
  }

}
