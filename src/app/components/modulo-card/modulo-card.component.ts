import { Component, Input, OnInit } from '@angular/core';
import { ModuloModel } from 'src/app/models/modulo.model';

@Component({
  selector: 'app-modulo-card',
  templateUrl: './modulo-card.component.html',
})
export class ModuloCardComponent implements OnInit {

  @Input() color: number;
  progress: number;
  @Input() hasButton: boolean;
  @Input() enabled: boolean;
  @Input() modulo: ModuloModel;

  constructor() { }

  ngOnInit(): void {
    if (this.modulo.totalConteudos > 0) {
      if (this.modulo.totalConcluidos > this.modulo.totalConteudos) {
        this.progress = 100;
      } else {
        this.progress = (this.modulo.totalConcluidos / this.modulo.totalConteudos) * 100;
      }
    } else {
      this.progress = 0;
    }
  }

}
