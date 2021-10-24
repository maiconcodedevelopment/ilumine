import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JovensCreateComponent } from './jovens-create/jovens-create.component';
import { JovensDeleteComponent } from './jovens-delete/jovens-delete.component';
import { JovensEditComponent } from './jovens-edit/jovens-edit.component';
import { JovensListComponent } from './jovens-list/jovens-list.component';
import { JovensComponent } from './jovens.component';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Mentorados',
    },
    component: JovensComponent,
    children: [
      {
        path: 'novo',
        component: JovensCreateComponent,
        data: { breadcrumb: 'Novo' },
      },
      {
        path: ':id',
        component: JovensEditComponent,
        data: {
          breadcrumb: (id: number) => {
            return `${id}`;
          },
        }
      },
      {
        path: 'excluir/:id',
        component: JovensDeleteComponent,
        data: {
          breadcrumb: (id: string) => {
            return `Excluir ${id.substr(id.indexOf('/') + 1)}`;
          },
        }
      },
      {
        path: '',
        component: JovensListComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JovensRoutingModule { }

export const JOVENS_ROUTE_COMPONENETS = [
  JovensComponent,
  JovensListComponent,
  JovensCreateComponent,
  JovensEditComponent,
  JovensDeleteComponent
];
