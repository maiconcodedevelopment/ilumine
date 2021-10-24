import { Component, Input, OnInit } from '@angular/core';
import { TrilhaListModel } from 'src/app/models/trilha-list.model';
import { TrilhasService } from 'src/app/services/trilhas.service';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-trilha-card',
  templateUrl: './trilha-card.component.html',
})
export class TrilhaCardComponent implements OnInit {

  @Input() color: string;
  @Input() trilha: TrilhaListModel;
  progress: number;
  showloading = false;
  constructor(private trilhasService: TrilhasService) { }

  ngOnInit(): void {
    if (this.trilha.totalConteudos > 0) {
      if (this.trilha.totalConcluidos > this.trilha.totalConteudos) {
        this.progress = 100;
      } else {
        this.progress = (this.trilha.totalConcluidos / this.trilha.totalConteudos) * 100;
      }
    } else {
      this.progress = 0;
    }
  }

  emitirCertificado(): void {
    if (!this.showloading) {
      this.showloading = true;
      this.trilhasService.getRelatorio(this.trilha.id).subscribe(file => {
        const blob: any = new Blob([file], { type: 'application/pdf; charset=utf-8' });
        fileSaver.saveAs(blob, 'certificado.pdf');
        this.showloading = false;
      });
    }
  }

}
