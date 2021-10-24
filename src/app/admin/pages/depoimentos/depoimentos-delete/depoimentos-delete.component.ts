import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepoimentoModel } from 'src/app/models/depoimento.model';
import { DepoimentosService } from 'src/app/services/depoimentos.service';

@Component({
  selector: 'app-depoimentos-delete',
  templateUrl: './depoimentos-delete.component.html'
})
export class DepoimentosDeleteComponent implements OnInit {
  data: DepoimentoModel;
  showloading: boolean;
  errorMessage: string = undefined;
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private depoimentosService: DepoimentosService) { }

  ngOnInit(): void {
    const id = parseInt(this.activatedRoute.snapshot.params.id, 10);
    this.depoimentosService.getItem(id).subscribe((result: DepoimentoModel) => this.data = result);
  }

  Excluir(): void {
    this.showloading = !this.showloading

    this.depoimentosService.deleteItem(this.data.id).subscribe(result => {
      this.showloading = !this.showloading
      if(result == null) {
        this.router.navigate(['/admin/depoimentos']);
      } else {
        this.errorMessage = result.error
      }
    })
  }

}
