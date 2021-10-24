import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import {
  DepoimentosRoutingModule,
  DEPOIMENTOS_ROUTE_COMPONENETS,
} from './depoimentos-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [DEPOIMENTOS_ROUTE_COMPONENETS],
  imports: [
    SharedModule,
    DepoimentosRoutingModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class DepoimentosModule {}
