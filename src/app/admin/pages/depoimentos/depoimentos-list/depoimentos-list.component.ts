import { Component, OnInit } from '@angular/core';
import { DepoimentosService } from 'src/app/services/depoimentos.service';
import { DepoimentoModel } from '../../../../models/depoimento.model';

@Component({
  selector: 'app-depoimentos-list',
  templateUrl: './depoimentos-list.component.html'
})
export class DepoimnetosListComponent implements OnInit {

  data: DepoimentoModel[] = [];
  search = '';
  itemsPerPage = 20;
  offset = 0;
  constructor(private depoimentosService: DepoimentosService) { }

  ngOnInit(): void {
    this.loadItens();
  }

  filter(data): any[] {
    return data.filter((item: DepoimentoModel) => this.search === '' || item.citacao.toLowerCase().indexOf(this.search.toLowerCase()) !== -1);
  }

  loadMore(): void {
    if (this.data.length % this.itemsPerPage === 0) {
      this.offset += this.itemsPerPage;
      this.loadItens();
    }
  }

  loadItens(): void {
    this.depoimentosService.getList(this.itemsPerPage, this.offset).subscribe((result: DepoimentoModel[]) => this.data = this.data.concat(result));
  }

}
