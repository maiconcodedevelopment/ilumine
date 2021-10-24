import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostModel } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-blog-item',
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.scss']
})
export class BlogItemComponent implements OnInit {

  posts: PostModel[] = [];
  data: PostModel;
  itemsPerPage = 4;
  offset = 0;

  constructor(private postsService: PostService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id = parseInt(this.activatedRoute.snapshot.params.id, 10);
    this.postsService.getItem(id).subscribe((result: PostModel) => this.data = result);
    this.loadItens();
  }

  loadItens(): void {
    this.postsService.getList(this.itemsPerPage, this.offset).subscribe((result: PostModel[]) => this.posts = this.posts.concat(result));
  }
}
