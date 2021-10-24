import { Component, Input, OnInit } from '@angular/core';
import { ComentarioModel } from 'src/app/models/comentario.model';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
})
export class ComentarioComponent implements OnInit {

  @Input() comentarios: ComentarioModel;

  constructor() { }

  ngOnInit(): void {
  }

}
