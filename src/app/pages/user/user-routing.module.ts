import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MinhaContaComponent } from './minha-conta/minha-conta.component';
import { MinhaJornadaComponent } from './minha-jornada/minha-jornada.component';
import { TrilhasComponent } from './trilhas/trilhas.component';
import { MentoriasComponent } from './mentorias/mentorias.component';
import { TesteMapaComponent } from './teste-mapa/teste-mapa.component';
import { TrilhaDetalhesComponent } from './trilha-detalhes/trilha-detalhes.component';
import { ModuloComponent } from './modulo/modulo.component';
import { MentoriasEducadorComponent } from './mentorias-educador/mentorias-educador.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'minha-conta',
        component: MinhaContaComponent,
      },
      {
        path: 'minha-jornada',
        component: MinhaJornadaComponent,
      },
      {
        path: 'meu-teste-mapa',
        component: TesteMapaComponent,
      },
      {
        path: 'trilhas',
        component: TrilhasComponent,
      },
      {
        path: 'trilha/:id',
        component: TrilhaDetalhesComponent,
      },
      {
        path: 'modulo/:id',
        component: ModuloComponent,
      },
      {
        path: 'modulo/:id/conteudo/:idConteudo',
        component: ModuloComponent,
      },
      {
        path: 'mentorias',
        component: MentoriasComponent,
      },
      {
        path: 'mentor',
        component: MentoriasEducadorComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }



export const USER_ROUTE_COMPONENETS = [
  HomeComponent,
  MinhaContaComponent,
  MinhaJornadaComponent,
  TrilhasComponent,
  TrilhaDetalhesComponent,
  MentoriasComponent,
  TesteMapaComponent,
  ModuloComponent,
  MentoriasEducadorComponent
];
