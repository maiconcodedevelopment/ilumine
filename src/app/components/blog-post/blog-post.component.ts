import { Component, Input, OnInit } from '@angular/core';
import { PostModel } from 'src/app/models/post.model';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
})
export class BlogPostComponent implements OnInit {

  @Input() post: PostModel;
  @Input() destaque = false;
  constructor() { }

  ngOnInit(): void {
  }

}
