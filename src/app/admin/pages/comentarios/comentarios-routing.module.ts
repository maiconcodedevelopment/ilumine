import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComentariosDeleteComponent } from './comentarios-delete/comentarios-delete.component';
import { ComentariosEditComponent } from './comentarios-edit/comentarios-edit.component';
import { ComentariosListComponent } from './comentarios-list/comentarios-list.component';
import { ComentariosComponent } from './comentarios.component';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Comentários',
    },
    component: ComentariosComponent,
    children: [
      {
        path: ':id',
        component: ComentariosEditComponent,
        data: {
          breadcrumb: (id: number) => {
            return `${id}`;
          },
        }
      },
      {
        path: 'excluir/:id',
        component: ComentariosDeleteComponent,
        data: {
          breadcrumb: (id: string) => {
            return `Excluir ${id.substr(id.indexOf('/') + 1)}`;
          },
        }
      },
      {
        path: '',
        component: ComentariosListComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComentariosRoutingModule { }

export const COMENTARIOS_ROUTE_COMPONENETS = [
  ComentariosComponent,
  ComentariosListComponent,
  ComentariosEditComponent,
  ComentariosDeleteComponent
];
