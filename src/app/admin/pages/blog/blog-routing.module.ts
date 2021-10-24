import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogCreateComponent } from './blog-create/blog-create.component';
import { BlogDeleteComponent } from './blog-delete/blog-delete.component';
import { BlogEditComponent } from './blog-edit/blog-edit.component';
import { BlogListComponent } from './blog-list/blog-list.component';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Blog',
    },
    children: [
      {
        path: '',
        component: BlogListComponent,
        data: { breadcrumb: 'Blog' },
      },
      {
        path: 'novo',
        component: BlogCreateComponent,
        data: { breadcrumb: 'Novo' },
      },
      {
        path: ':id',
        component: BlogEditComponent,
        data: {
          breadcrumb: (id: number) => {
            return `${id}`;
          },
        }
      },
      {
        path: 'excluir/:id',
        component: BlogDeleteComponent,
        data: {
          breadcrumb: (id: string) => {
            return `Excluir ${id.substr(id.indexOf('/') + 1)}`;
          },
        }
      },
    ]
  }
];

export const BLOG_ROUTE_COMPONENETS = [
  BlogListComponent,
  BlogCreateComponent,
  BlogEditComponent,
  BlogDeleteComponent
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
