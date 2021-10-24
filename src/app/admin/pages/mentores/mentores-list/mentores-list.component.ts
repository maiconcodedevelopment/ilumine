import { Component, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/models/user.model';
import { MentoresService } from 'src/app/services/mentores.service';
import { UsersService } from 'src/app/services/users.service';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-mentores-list',
  templateUrl: './mentores-list.component.html',
})
export class MentoresListComponent implements OnInit {

  data: UserProfile[] = [];
  itemsPerPage = 20;
  offset = 0;
  search = '';
  showloading = false;

  constructor(private mentoresService: MentoresService, private userService: UsersService) { }

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
    this.mentoresService.getListAdmin(this.itemsPerPage, this.offset)
      .subscribe((result: UserProfile[]) => this.data = this.data.concat(result));
  }

  relatorioMentores(): void {
    if (!this.showloading) {
      this.showloading = true;
      this.userService.getRelatorio('mentores').subscribe(file => {
        const blob: any = new Blob([file], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=utf-8' });
        fileSaver.saveAs(blob, 'relatorio-mentores.xlsx');
        this.showloading = false;
      });
    }
  }
}
