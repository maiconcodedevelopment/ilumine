import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MentoresComponent } from './mentores.component';
import { MentoresCreateComponent } from './mentores-create/mentores-create.component';
import { MentoresEditComponent } from './mentores-edit/mentores-edit.component';
import { MentoresListComponent } from './mentores-list/mentores-list.component';
import { MentoresDeleteComponent } from './mentores-delete/mentores-delete.component';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Mentores',
    },
    component: MentoresComponent,
    children: [
      {
        path: 'novo',
        component: MentoresCreateComponent,
        data: { breadcrumb: 'Novo' },
      },
      {
        path: ':id',
        component: MentoresEditComponent,
        data: {
          breadcrumb: (id: number) => {
            return `${id}`;
          },
        }
      },
      {
        path: 'excluir/:id',
        component: MentoresDeleteComponent,
        data: {
          breadcrumb: (id: string) => {
            return `Excluir ${id.substr(id.indexOf('/') + 1)}`;
          },
        }
      },
      {
        path: '',
        component: MentoresListComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MentoresRoutingModule { }

export const MENTORES_ROUTE_COMPONENETS = [
  MentoresComponent,
  MentoresCreateComponent,
  MentoresEditComponent,
  MentoresListComponent,
  MentoresDeleteComponent
];
