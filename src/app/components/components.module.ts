import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { DepoimentosComponent } from './depoimentos/depoimentos.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { SwiperModule } from 'swiper/angular';
import { ModuloCardComponent } from './modulo-card/modulo-card.component';
import { TrilhaCardComponent } from './trilha-card/trilha-card.component';
import { VideoComponent } from './video/video.component';
import { TextoComponent } from './texto/texto.component';
import { ComentarioComponent } from './comentario/comentario.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BlogPostComponent,
    DepoimentosComponent,
    MenuLateralComponent,
    ModuloCardComponent,
    TrilhaCardComponent,
    VideoComponent,
    TextoComponent,
    ComentarioComponent,
  ],
  imports: [
    CommonModule,
    SwiperModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    BlogPostComponent,
    DepoimentosComponent,
    MenuLateralComponent,
    ModuloCardComponent,
    TrilhaCardComponent,
    VideoComponent,
    TextoComponent,
    ComentarioComponent,
  ]
})
export class ComponentsModule { }
