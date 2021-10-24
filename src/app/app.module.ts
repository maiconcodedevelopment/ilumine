import { ComponentsModule } from './components/components.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SwiperModule } from 'swiper/angular';
import { Constants } from './services/constants';
import { PostService } from './services/posts.service';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { BrMaskerModule } from 'br-mask';
import { UserComponent } from './pages/user/user.component';
import { ComentariosService } from './services/comentarios.service';
import { JwtModule } from '@auth0/angular-jwt';
import { MentoresService } from './services/mentores.service';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

export function tokenGetter(): string {
  const user = JSON.parse(localStorage.getItem('currentUser') || '');
  if (!user) {
    return '';
  }
  return user.token;
}
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    SwiperModule,
    HttpClientModule,
    InfiniteScrollModule,
    NgxMaskModule.forRoot(),
    BrMaskerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
      },
    }),
    ToastrModule.forRoot({
      preventDuplicates: true,
      positionClass: 'toast-top-left',
    }),
    ComponentsModule,
  ],
  providers: [
    PostService,
    ComentariosService,
    MentoresService,
    Constants
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
