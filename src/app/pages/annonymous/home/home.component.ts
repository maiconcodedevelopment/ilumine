import { Component, OnInit } from '@angular/core';
import { PostModel } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/posts.service';
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay
} from 'swiper/core';

SwiperCore.use([Navigation, Pagination, Autoplay]);
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: PostModel[] = [];
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getList(4, 0).subscribe((result: PostModel[]) => this.posts = result);
  }



}
