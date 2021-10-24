import { Component, OnInit } from '@angular/core';
import { PostModel } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  posts: PostModel[] = [];
  postDestaque: PostModel = undefined;
  itemsPerPage = 6;
  offset = 0;
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.loadItens();
    this.postService.getList(1, 0, true).subscribe((result: PostModel[]) => this.postDestaque = result[0]);
  }

  loadMore(): void {
    this.offset += this.itemsPerPage;
    this.loadItens();
  }

  loadItens(): void {
    this.postService.getList(this.itemsPerPage, this.offset, false).subscribe((result: PostModel[]) => this.posts = this.posts.concat(result));
  }
}

