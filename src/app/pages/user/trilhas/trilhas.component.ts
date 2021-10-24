import { TrilhasService } from './../../../services/trilhas.service';
import { Component, OnInit } from '@angular/core';
import { TesteMapaService } from 'src/app/services/teste-mapa.service';
import { TrilhaListModel } from 'src/app/models/trilha-list.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-trilhas',
  templateUrl: './trilhas.component.html',
})
export class TrilhasComponent implements OnInit {

  trilhas: TrilhaListModel[];
  testeFeito: boolean;


  constructor(private authService: AuthService,
              private trilhasService: TrilhasService,
              private testeMapa: TesteMapaService) { }


  ngOnInit(): void {
    this.trilhasService.getList().subscribe( response => this.trilhas = response);
    const roles = this.authService.currentUser.roles;
    if (roles.indexOf('Administrador') === -1 && roles.indexOf('Mentor') === -1) {
      this.testeMapa.getTeste().subscribe( response => this.testeFeito = response);
    } else {
      this.testeFeito = true;
    }
  }

}
