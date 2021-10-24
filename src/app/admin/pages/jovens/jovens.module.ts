import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  JovensRoutingModule,
  JOVENS_ROUTE_COMPONENETS
} from './jovens-routing.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [JOVENS_ROUTE_COMPONENETS],
  imports: [
    CommonModule,
    JovensRoutingModule,
    SharedModule,
  ]
})
export class JovensModule { }
