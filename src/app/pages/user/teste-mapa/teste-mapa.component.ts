import { TesteMapaService } from './../../../services/teste-mapa.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teste-mapa',
  templateUrl: './teste-mapa.component.html',
})
export class TesteMapaComponent implements OnInit {

  testeFeito: boolean;

  constructor(private testeMapa: TesteMapaService) { }

  ngOnInit(): void {
    this.testeMapa.getTeste().subscribe( response => {
      if(response) this.testeFeito = true;
    }, error => {
      if(error.status === 404) this.testeFeito = false;
    })
  }

}
