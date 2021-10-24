import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule, BLOG_ROUTE_COMPONENETS } from './blog-routing.module';
import { AngularEditorModule } from '@kolkov/angular-editor';


@NgModule({
  declarations: [BLOG_ROUTE_COMPONENETS],
  imports: [
    CommonModule,
    BlogRoutingModule,
    ReactiveFormsModule,
    AngularEditorModule,
  ]
})
export class BlogModule { }
