import { UserProfile } from './../../../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-jovens-list',
  templateUrl: './jovens-list.component.html',
})
export class JovensListComponent implements OnInit {

  data: UserProfile[] = [];
  itemsPerPage = 20;
  offset = 0;
  search = '';
  showloading = false;

  constructor(private userService: UsersService) { }

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
    this.userService.getList(this.itemsPerPage, this.offset, 2).subscribe((result: UserProfile[]) => this.data = this.data.concat(result));
  }

  relatorioMentorados(): void {
    if (!this.showloading) {
      this.showloading = true;
      this.userService.getRelatorio('mentorados').subscribe(file => {
        const blob: any = new Blob([file], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=utf-8' });
        fileSaver.saveAs(blob, 'relatorio-jovens.xlsx');
        this.showloading = false;
      });
    }
  }

}
