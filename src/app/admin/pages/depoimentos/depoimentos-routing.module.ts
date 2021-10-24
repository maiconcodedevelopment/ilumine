import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepoimentoComponent } from './depoimentos.component';
import { DepoimnetosListComponent } from './depoimentos-list/depoimentos-list.component';
import { DepoimentosEditComponent } from './depoimentos-edit/depoimentos-edit.component';
import { DepoimentosDeleteComponent } from './depoimentos-delete/depoimentos-delete.component';
import { DepoimentosCreateComponent } from './depoimentos-create/depoimentos-create.component';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Depoimentos',
    },
    component: DepoimentoComponent,
    children: [
      {
        path: 'novo',
        component: DepoimentosCreateComponent,
        data: { breadcrumb: 'Novo' },
      },
      {
        path: ':id',
        component: DepoimentosEditComponent,
        data: {
          breadcrumb: (id: number) => {
            return `${id}`;
          },
        }
      },
      {
        path: 'excluir/:id',
        component: DepoimentosDeleteComponent,
        data: {
          breadcrumb: (id: string) => {
            return `Excluir ${id.substr(id.indexOf('/') + 1)}`;
          },
        }
      },
      {
        path: '',
        component: DepoimnetosListComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepoimentosRoutingModule {}
export const DEPOIMENTOS_ROUTE_COMPONENETS = [
  DepoimentoComponent,
  DepoimnetosListComponent,
  DepoimentosEditComponent,
  DepoimentosCreateComponent,
  DepoimentosDeleteComponent
];
