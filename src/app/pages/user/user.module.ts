import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

import {
  UserRoutingModule,
  USER_ROUTE_COMPONENETS
} from './user-routing.module';

import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [USER_ROUTE_COMPONENETS],
  imports: [
    CommonModule,
    UserRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ]
})
export class UserModule { }

