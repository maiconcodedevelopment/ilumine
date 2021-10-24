import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AnnonymousRoutingModule,
  ANNONYMOUS_ROUTE_COMPONENETS
} from './annonymous-routing.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrMaskerModule } from 'br-mask';
import { SwiperModule } from 'swiper/angular';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [ANNONYMOUS_ROUTE_COMPONENETS],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AnnonymousRoutingModule,
    SwiperModule,
    BrMaskerModule,
    ComponentsModule,
    NgxMaskModule.forRoot(),
  ]
})
export class AnnonymousModule { }
