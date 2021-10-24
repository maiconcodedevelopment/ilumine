import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  TrilhasRoutingModule,
  TRILHAS_ROUTE_COMPONENETS
} from './trilhas-routing.module';


@NgModule({
  declarations: [TRILHAS_ROUTE_COMPONENETS],
  imports: [
    CommonModule,
    SharedModule,
    TrilhasRoutingModule,
  ]
})
export class TrilhasModule { }
