import { Component, OnInit } from '@angular/core';
import { PostModel } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {

  postList: Array<PostModel>;
  itemsperPage = 20;
  offset = 0;

  constructor(private blogService: PostService) { }

  ngOnInit(): void {
    this.loadItens();
  }

  loadItens(){
    this.blogService.getList(this.itemsperPage, 0).subscribe(response => {
      this.postList = response;
    })
  };

}
