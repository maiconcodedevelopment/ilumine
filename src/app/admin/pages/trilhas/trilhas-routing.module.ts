import { TrilhasListComponent } from './trilhas-list/trilhas-list.component';
import { TrilhasDeleteComponent } from './trilhas-delete/trilhas-delete.component';
import { TrilhasCreateComponent } from './trilhas-create/trilhas-create.component';
import { TrilhasEditComponent } from './trilhas-edit/trilhas-edit.component';
import { TrilhasComponent } from './trilhas.component';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ModulosCreateComponent } from './modulos-create/modulos-create.component';
import { ModulosEditComponent } from './modulos-edit/modulos-edit.component';
import { ModulosDeleteComponent } from './modulos-delete/modulos-delete.component';
import { ConteudosCreateComponent } from './conteudos-create/conteudos-create.component';
import { ConteudosDeleteComponent } from './conteudos-delete/conteudos-delete.component';
import { ConteudosEditComponent } from './conteudos-edit/conteudos-edit.component';
import { AnexosCreateComponent } from './anexos-create/anexos-create.component';
import { AnexosDeleteComponent } from './anexos-delete/anexos-delete.component';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Trilhas',
    },
    component: TrilhasComponent,
    children: [
      {
        path: 'novo',
        component: TrilhasCreateComponent,
        data: { breadcrumb: 'Novo' },
      },
      {
        path: ':id',
        component: TrilhasEditComponent,
        data: {
          breadcrumb: (id: number) => {
            return `${id}`;
          },
        }
      },
      {
        path: ':id/modulos/novo',
        component: ModulosCreateComponent,
        data: {
          breadcrumb: (id: number) => {
            return `Novo Módulo`;
          },
        }
      },
      {
        path: ':id/modulos/:idModulo/conteudos/novo',
        component: ConteudosCreateComponent,
        data: {
          breadcrumb: (id: number) => {
            return `Novo Conteúdo`;
          },
        }
      },
      {
        path: ':id/modulos/:idModulo/conteudos/:idConteudo/excluir',
        component: ConteudosDeleteComponent,
        data: {
          breadcrumb: (id: number) => {
            return `Excluir Conteúdo`;
          },
        }
      },
      {
        path: ':id/modulos/:idModulo/conteudos/:idConteudo/anexos/novo',
        component: AnexosCreateComponent,
        data: {
          breadcrumb: (id: number) => {
            return `Novo Anexo`;
          },
        }
      },
      {
        path: ':id/modulos/:idModulo/conteudos/:idConteudo/anexos/:idAnexo/excluir',
        component: AnexosDeleteComponent,
        data: {
          breadcrumb: (id: number) => {
            return `Excluir Anexo`;
          },
        }
      },
      {
        path: ':id/modulos/:idModulo/conteudos/:idConteudo',
        component: ConteudosEditComponent,
        data: {
          breadcrumb: (id: number) => {
            return `Editar Conteúdo`;
          },
        }
      },
      {
        path: ':id/modulos/:idModulo',
        component: ModulosEditComponent,
        data: {
          breadcrumb: (id: number) => {
            return `Editar módulo`;
          },
        }
      },
      {
        path: ':id/modulos/:idModulo/excluir',
        component: ModulosDeleteComponent,
        data: {
          breadcrumb: (id: number) => {
            return `Excluir Módulo`;
          },
        }
      },
      {
        path: 'excluir/:id',
        component: TrilhasDeleteComponent,
        data: {
          breadcrumb: (id: string) => {
            return `Excluir ${id.substr(id.indexOf('/') + 1)}`;
          },
        }
      },
      {
        path: '',
        component: TrilhasListComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrilhasRoutingModule { }

export const TRILHAS_ROUTE_COMPONENETS = [
  TrilhasComponent,
  TrilhasListComponent,
  TrilhasCreateComponent,
  TrilhasEditComponent,
  TrilhasDeleteComponent,
  ModulosCreateComponent,
  ModulosEditComponent,
  ModulosDeleteComponent,
  ConteudosCreateComponent,
  ConteudosDeleteComponent,
  ConteudosEditComponent,
  AnexosCreateComponent,
  AnexosDeleteComponent
];

