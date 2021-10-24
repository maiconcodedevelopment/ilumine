import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { PostModel } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-blog-delete',
  templateUrl: './blog-delete.component.html',
  styleUrls: ['./blog-delete.component.scss']
})
export class BlogDeleteComponent implements OnInit {

  postId: Number;
  postForm: FormGroup;
  post: PostModel;
  previewUrl: string | ArrayBuffer;
  config: AngularEditorConfig = {
    editable: false,
    minHeight:'400px',
    sanitize: true,
    enableToolbar: false,
    showToolbar: false,
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private blogService: PostService,
    private activatedRoute: ActivatedRoute,
  ) {this.activatedRoute.params.subscribe(params => this.postId = params.id); }

  ngOnInit(): void {
    this.getPost(this.postId);
  }

  getPost(id){
    this.blogService.getItem(id).subscribe(resp => {
      this.post = resp;
      this.previewUrl = resp.imagem;
      this.createForm(this.post);
    });
  }

  createForm(post: PostModel){
    this.postForm = this.fb.group({
      titulo: [{value: post.titulo, disabled: true}, [Validators.required, Validators.maxLength(100)] ],
      resumo: [{value: post.resumo, disabled: true}, [Validators.required, Validators.maxLength(1000)] ],
      texto: [{value: post.texto, disabled: true}, [Validators.required] ],
      destaque: [{value: Number(post.destaque), disabled: true}, [Validators.required] ],
    });
  }

  salvar(id){
    this.blogService.deleteItem(id).subscribe(resp => {
      this.router.navigate(['/admin/blog']);
    });
  }

}
