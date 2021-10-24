import { TrilhasService } from './../../../../services/trilhas.service';
import { TrilhaListModel } from './../../../../models/trilha-list.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trilhas-list',
  templateUrl: './trilhas-list.component.html',
})
export class TrilhasListComponent implements OnInit {

  data: TrilhaListModel[] = [];
  itemsPerPage = 20;
  offset = 0;
  search = '';
  constructor(private trilhasService: TrilhasService) { }

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
    this.trilhasService.getList(this.itemsPerPage, this.offset).subscribe((result: TrilhaListModel[]) => this.data = this.data.concat(result));
  }

}
