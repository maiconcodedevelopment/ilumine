import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ComentariosRoutingModule,
  COMENTARIOS_ROUTE_COMPONENETS
} from './comentarios-routing.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [COMENTARIOS_ROUTE_COMPONENETS],
  imports: [
    CommonModule,
    ComentariosRoutingModule,
    SharedModule,
  ]
})
export class ComentariosModule { }
