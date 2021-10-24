import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EducadoresRoutingModule, EDUCADORES_ROUTE_COMPONENETS } from './educadores-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxMaskModule } from 'ngx-mask';



@NgModule({
  declarations: [EDUCADORES_ROUTE_COMPONENETS,],
  imports: [
    CommonModule,
    EducadoresRoutingModule,
    SharedModule,
  ]
})
export class EducadoresModule { }
