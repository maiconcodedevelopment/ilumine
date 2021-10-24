import { TrilhasService } from './../../../../services/trilhas.service';
import { TrilhaListModel } from './../../../../models/trilha-list.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-trilhas-delete',
  templateUrl: './trilhas-delete.component.html',
})
export class TrilhasDeleteComponent implements OnInit {

  data: TrilhaListModel;
  showloading: boolean;
  errorMessage: string = undefined;
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private trilhasService: TrilhasService) { }

  ngOnInit(): void {
    const id = parseInt(this.activatedRoute.snapshot.params.id, 10);
    this.trilhasService.getItem(id).subscribe((result: TrilhaListModel) => this.data = result);
  }

  Excluir(): void {
    this.showloading = !this.showloading;
    this.trilhasService.deleteItem(this.data.id).subscribe(result => {
      this.showloading = !this.showloading;
      if (result == null) {
        this.router.navigate(['/admin/trilhas']);
      }
    }, e => this.showloading = false);
  }
}
