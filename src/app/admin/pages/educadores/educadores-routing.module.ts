import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EducadoresComponent } from './educadores.component';
import { EducadoresCreateComponent } from './educadores-create/educadores-create.component';
import { EducadoresEditComponent } from './educadores-edit/educadores-edit.component';
import { EducadoresListComponent } from './educadores-list/educadores-list.component';
import { EducadoresDeleteComponent } from './educadores-delete/educadores-delete.component';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Educadores',
    },
    component: EducadoresComponent,
    children: [
      {
        path: 'novo',
        component: EducadoresCreateComponent,
        data: { breadcrumb: 'Novo' },
      },
      {
        path: ':id',
        component: EducadoresEditComponent,
        data: {
          breadcrumb: (id: number) => {
            return `${id}`;
          },
        }
      },
      {
        path: 'excluir/:id',
        component: EducadoresDeleteComponent,
        data: {
          breadcrumb: (id: string) => {
            return `Excluir ${id.substr(id.indexOf('/') + 1)}`;
          },
        }
      },
      {
        path: '',
        component: EducadoresListComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EducadoresRoutingModule { }

export const EDUCADORES_ROUTE_COMPONENETS = [
  EducadoresComponent,
  EducadoresCreateComponent,
  EducadoresEditComponent,
  EducadoresListComponent,
  EducadoresDeleteComponent
];
