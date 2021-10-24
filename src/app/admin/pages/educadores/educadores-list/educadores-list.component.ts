import { Component, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-educadores-list',
  templateUrl: './educadores-list.component.html',
})
export class EducadoresListComponent implements OnInit {

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
    this.userService.getList(this.itemsPerPage, this.offset, 3).subscribe((result: UserProfile[]) => this.data = this.data.concat(result));
  }

  relatorioEducadores(): void {
    if (!this.showloading) {
      this.showloading = true;
      this.userService.getRelatorio('educadores').subscribe(file => {
        const blob: any = new Blob([file], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=utf-8' });
        fileSaver.saveAs(blob, 'relatorio-educadores.xlsx');
        this.showloading = false;
      });
    }
  }

}
