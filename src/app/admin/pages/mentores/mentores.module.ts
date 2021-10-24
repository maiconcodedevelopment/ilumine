import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MentoresRoutingModule, MENTORES_ROUTE_COMPONENETS } from './mentores-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxMaskModule } from 'ngx-mask';



@NgModule({
  declarations: [MENTORES_ROUTE_COMPONENETS],
  imports: [
    CommonModule,
    MentoresRoutingModule,
    SharedModule,
  ]
})
export class MentoresModule { }
