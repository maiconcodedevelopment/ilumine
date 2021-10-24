import { AuthService } from 'src/app/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { TesteMapaService } from 'src/app/services/teste-mapa.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  testeFeito = undefined;
  iniciouTrilha = false;
  user: any;
  constructor(private authService: AuthService,
              private userService: UsersService,
              private testeService: TesteMapaService) { }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.userService.getProfile().subscribe( (response: any) => this.user = response );
    this.testeService.getTeste().subscribe(result => this.testeFeito = result);
  }

}
