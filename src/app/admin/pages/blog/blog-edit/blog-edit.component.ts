import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { PostModel } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.scss']
})
export class BlogEditComponent implements OnInit {

  postId: Number;
  postForm: FormGroup;
  post: PostModel;
  showloading: boolean = false;
  postModel = new PostModel();
  fotoDestaque: any;
  previewUrl: string | ArrayBuffer;
  // Configuração Editor
  config: AngularEditorConfig = {
    editable: true,
    minHeight:'400px',
    sanitize: true,
    spellcheck: true,
    toolbarHiddenButtons: [
      [ 'insertImage',
      'insertVideo',
      'insertHorizontalRule'
      ]
    ]
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private blogService: PostService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.params.subscribe(params => this.postId = params.id);
  }

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
      titulo: [post.titulo, [Validators.required, Validators.maxLength(100)] ],
      resumo: [post.resumo, [Validators.required, Validators.maxLength(1000)] ],
      texto: [post.texto, [Validators.required] ],
      destaque: [Number(post.destaque), [Validators.required] ],
    });
  }


  setFotoDestaque(event){
    this.fotoDestaque = event.target.files[0];
    this.preview();
  }

  preview(): void {
    const reader = new FileReader();
    reader.readAsDataURL(this.fotoDestaque);
    reader.onload = (event) => {
      this.previewUrl = reader.result;
    };
  }


  convertForm(){
    this.showloading = true;
    this.postModel.id = this.post.id;
    this.postModel.titulo = this.postForm.controls.titulo.value;
    this.postModel.resumo = this.postForm.controls.resumo.value;
    this.postModel.destaque = Boolean(this.postForm.controls.destaque.value);
    this.postModel.texto = this.postForm.controls.texto.value;
}

  salvar(){
    if (this.postForm.valid){
      this.convertForm();
      this.blogService.editItem(this.postModel, this.fotoDestaque).subscribe(result => this.router.navigate(['/admin/blog']));
    } else{
      console.log('Form Incomplete');
    }
  }

}
