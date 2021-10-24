import { AnnonymousComponent } from './annonymous.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogItemComponent } from './blog-item/blog-item.component';
import { BlogComponent } from './blog/blog.component';
import { ComoParticiparComponent } from './como-participar/como-participar.component';
import { FacaParteComponent } from './faca-parte/faca-parte.component';
import { FaleConoscoComponent } from './fale-conosco/fale-conosco.component';
import { HomeComponent } from './home/home.component';
import { InstitucionalComponent } from './institucional/institucional.component';
import { LoginComponent } from './login/login.component';
import { ProcessoSeletivoComponent } from './processo-seletivo/processo-seletivo.component';
import { LembrarSenhaComponent } from './lembrar-senha/lembrar-senha.component';
import { RecuperarSenhaComponent } from './recuperar-senha/recuperar-senha.component';

const routes: Routes = [
  { path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  { path: 'o-instituto',
    pathMatch: 'full',
    component: InstitucionalComponent,
  },
  {
    path: 'blog',
    component: BlogComponent,
  },
  {
    path: 'blog/:id',
    component: BlogItemComponent,
  },
  { path: 'como-participar',
    pathMatch: 'full',
    component: ComoParticiparComponent,
  },
  { path: 'como-contribuir',
    pathMatch: 'full',
    component: FacaParteComponent,
  },
  { path: 'fale-conosco',
    pathMatch: 'full',
    component: FaleConoscoComponent,
  },
  { path: 'processo-seletivo',
    pathMatch: 'full',
    component: ProcessoSeletivoComponent,
  },
  { path: 'lembrar-senha',
    pathMatch: 'full',
    component: LembrarSenhaComponent,
  },
  { path: 'recuperar-senha',
    pathMatch: 'full',
    component: RecuperarSenhaComponent,
  },
  { path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnonymousRoutingModule { }


export const ANNONYMOUS_ROUTE_COMPONENETS = [
  AnnonymousComponent,
  HomeComponent,
  InstitucionalComponent,
  BlogComponent,
  BlogItemComponent,
  LembrarSenhaComponent,
  RecuperarSenhaComponent,
  ComoParticiparComponent,
  FacaParteComponent,
  FaleConoscoComponent,
  ProcessoSeletivoComponent,
  LoginComponent
];
