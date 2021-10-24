import { Component, OnInit } from '@angular/core';
import { DepoimentosService } from 'src/app/services/depoimentos.service';

import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay
} from 'swiper/core';

SwiperCore.use([Navigation, Pagination, Autoplay]);

@Component({
  selector: 'app-depoimentos',
  templateUrl: './depoimentos.component.html',
})
export class DepoimentosComponent implements OnInit {

  depoimentos: any= [];

  constructor(private postService: DepoimentosService) { }

  ngOnInit(): void {
    this.postService.getList().subscribe(data => {
      this.depoimentos = data;
    });
  }

}
