import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './pages/home/home.component';
import { BreadcrumbModule } from 'xng-breadcrumb';

const routes: Routes = [
  { path: '', component: AdminComponent, data: { breadcrumb: 'Home' }, children: [
    { path: '', component: HomeComponent },
    { path: 'depoimentos', loadChildren: () => import('./pages/depoimentos/depoimentos.module').then(m => m.DepoimentosModule) },
    { path: 'trilhas', loadChildren: () => import('./pages/trilhas/trilhas.module').then(m => m.TrilhasModule) },
    { path: 'comentarios', loadChildren: () => import('./pages/comentarios/comentarios.module').then(m => m.ComentariosModule) },
    { path: 'mentores', loadChildren: () => import('./pages/mentores/mentores.module').then(m => m.MentoresModule) },
    { path: 'mentorados', loadChildren: () => import('./pages/jovens/jovens.module').then(m => m.JovensModule) },
    { path: 'educadores', loadChildren: () => import('./pages/educadores/educadores.module').then(m => m.EducadoresModule) },
    { path: 'blog', loadChildren: () => import('./pages/blog/blog.module').then(m => m.BlogModule) },
  ] }
];

@NgModule({
  declarations: [
    AdminComponent,
    HomeComponent,
  ],
    imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    BreadcrumbModule,
  ]
})
export class AdminModule { }
