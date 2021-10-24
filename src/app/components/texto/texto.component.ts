import { Component, Input, OnInit } from '@angular/core';
import { ConteudoModel } from 'src/app/models/conteudo.model';

@Component({
  selector: 'app-texto',
  templateUrl: './texto.component.html',
})
export class TextoComponent implements OnInit {

  @Input() conteudo: ConteudoModel;

  constructor() { }

  ngOnInit(): void {
  }

}
